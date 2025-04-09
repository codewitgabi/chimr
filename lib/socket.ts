import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL;

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
