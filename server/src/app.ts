import express, { Express } from "express";
import logger from "morgan";
import connectDb from "./utils/config/db.config";
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/user.routes";
import {
  RequestErrorHandler,
  NotFoundErrorHandler,
} from "./middlewares/errors.handler";
import { createServer } from "http";
import { Server } from "socket.io";
import SocketAuthenticationMiddleware from "./middlewares/socket.middleware";
import type { IActiveUser, IUser, TExtendedSocket } from "./types/socket.types";
import socketService, { ObjectId } from "./services/socket.service";
import mongoose from "mongoose";
import { instrument } from "@socket.io/admin-ui";
import cors from "cors";

const app: Express = express();

const corsOrigin = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5500",
  "http://46.101.100.35:3000",
  "http://192.168.0.193:3001",
  "https://closely-notable-mongoose.ngrok-free.app",
  "https://admin.socket.io",
];

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
  },
  connectionStateRecovery: {
    skipMiddlewares: false,
    maxDisconnectionDuration: 15 * 60 * 1000,
  },
  connectTimeout: 5 * 60 * 1000,
});

instrument(io, {
  auth: false,
  mode: "development",
});

app.use(
  cors({
    origin: corsOrigin,
  })
);
app.use(logger("combined"));
app.set("port", process.env.PORT || 7000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.use(SocketAuthenticationMiddleware);

// Routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

let ACTIVE_USERS: Array<IActiveUser> = [];

io.on("connection", async (socket: TExtendedSocket) => {
  try {
    const user = socket.user as IUser;
    const userId = user._id as ObjectId;
    const userIdStr = String(userId);
    const SOCKET_ID = socket.id;

    // Add user to list of active users

    ACTIVE_USERS.push({
      id: userIdStr,
      user,
      socketId: SOCKET_ID,
    });

    console.log({ ACTIVE_USERS });

    io.emit("active_users", ACTIVE_USERS);

    // Fetch and send contacts with last messages

    const contacts = await socketService.fetchContacts({
      userId,
    });
    socket.emit("fetch_contacts", contacts);

    // Handle new message

    socket.on(
      "send_message",
      async ({
        receiverId,
        message,
      }: {
        receiverId: string;
        message: string;
      }) => {
        try {
          // Find receiver's socket if they're active

          const receiverUser = ACTIVE_USERS.find(
            (user) => user.id === receiverId
          );

          // Store message in database

          const savedMessage = await socketService.storeMessage({
            senderId: userId,
            receiverId: new mongoose.Types.ObjectId(receiverId),
            message,
          });

          if (receiverUser) {
            io.to(receiverUser.socketId).emit("new_message", {
              ...savedMessage,
            });
          }

          // Confirm to sender that message was sent

          socket.emit("message_sent", savedMessage);

          // Update contacts for both users to show latest message

          const updatedContactForSender = await socketService.getUpdatedContact(
            userIdStr,
            receiverId
          );

          socket.emit("update_contact", updatedContactForSender);

          // Check if receiver is online and update contact

          if (receiverUser) {
            const updatedContactForReceiver =
              await socketService.getUpdatedContact(receiverId, userIdStr);
            io.to(receiverUser.socketId).emit(
              "update_contact",
              updatedContactForReceiver
            );
          }
        } catch (error) {
          socket.emit("socket_error", {
            error: `Failed to send message: ${error}"`,
          });
        }
      }
    );

    // Handle request for message history between two users

    socket.on(
      "get_chat_history",
      async ({
        contactId,
        page = 1,
        limit = 20,
      }: {
        contactId: string;
        page: number;
        limit: number;
      }) => {
        try {
          const messages = await socketService.getMessageHistory({
            userId: userIdStr,
            contactId,
            page,
            limit,
          });

          socket.emit("chat_history", {
            contactId,
            ...messages,
            page,
            limit,
          });
        } catch (error) {
          console.error(error);

          socket.emit("socket_error", {
            error: "Failed to fetch chat history",
          });
        }
      }
    );

    // Handle mark as read event

    socket.on(
      "mark_messages_as_read",
      async ({ contactId }: { contactId: string }) => {
        try {
          const result = await socketService.markMessagesAsRead({
            userId: userIdStr,
            contactId,
          });

          socket.emit("messages_marked_as_read", result);
        } catch (error) {
          socket.emit("socket_error", {
            error: `Failed to mark messages as read: ${error}`,
          });
        }
      }
    );

    // handle socket disconnection

    socket.on("disconnect", () => {
      ACTIVE_USERS = ACTIVE_USERS.filter((user) => user.socketId !== socket.id);

      io.emit("active_users", ACTIVE_USERS);

      console.log({ ACTIVE_USERS });
    });
  } catch (error) {
    socket.emit("socket_error", {
      error: `Socket connection error: ${error}`,
    });
  }
});

// Middlewares

app.use("*", NotFoundErrorHandler);
app.use(RequestErrorHandler);

// Start server using IIFE

(() => {
  connectDb()
    .then(() => {
      console.log("Database connection successful");

      server.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
      });
    })
    .catch((e) => {
      console.log(`An error occurred connecting to database: ${e}`);
    });
})();
