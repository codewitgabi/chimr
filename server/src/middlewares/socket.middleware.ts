/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @docs
 * - https://socket.io/docs/v4/middlewares/
 */

import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/api.errors";
import { ExtendedError } from "socket.io";
import User from "../models/user.model";
import { TExtendedSocket } from "../types/socket.types";

const SocketAuthenticationMiddleware = (
  socket: TExtendedSocket,
  next: (err?: ExtendedError | undefined) => void
): void => {
  if (
    (socket.handshake.auth && socket.handshake.auth.accessToken) ||
    (socket.handshake.headers && socket.handshake.headers.authorization)
  ) {
    // * socket.handshake.auth => For web
    // * socket.handshake.headers => For postman testing

    /**
     * Handles authentication for socket.io connections
     */

    const accessToken =
      socket.handshake?.auth?.accessToken ||
      socket.handshake?.headers?.authorization;

    jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
      async function (err: any, decoded: any) {
        if (err) {
          next(err);
          return;
        }

        if (decoded === undefined) {
          next(new UnauthorizedError("Invalid access token"));
          return;
        }

        const { _id } = decoded;

        // Get user with given _id

        const user = await User.findById(_id);

        if (!user) {
          next(new UnauthorizedError("Invalid credentials"));
          return;
        }

        socket.user = user;
        next();
      }
    );
  } else {
    next(new UnauthorizedError("Authorization headers were not provided"));
  }
};

export default SocketAuthenticationMiddleware;
