import authService from "@/services/auth.service";
import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "ws://localhost:7000";

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    accessToken: authService.getAccessToken(),
  },
});
