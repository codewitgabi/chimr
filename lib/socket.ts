import { io, Socket } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "ws://localhost:7000";

let socket: Socket | null = null;

const initializeSocket = (accessToken: string): Socket => {
  if (!socket) {
    socket = io(URL, {
      autoConnect: false,
      auth: {
        accessToken,
      },
    });
  }

  return socket;
};


export default initializeSocket;
