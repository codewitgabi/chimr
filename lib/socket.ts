import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL;

let socket: Socket | null = null;

const initializeSocket = (
  accessToken: string,
  fcmToken: string = ""
): Socket => {
  if (!socket) {
    socket = io(URL, {
      autoConnect: false,
      auth: {
        accessToken,
      },
      query: {
        fcmToken,
      },
    });
  }

  return socket;
};

export default initializeSocket;
