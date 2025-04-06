import { io } from "socket.io-client";

console.log(process.env.NODE_ENV);

const URL =
  process.env.NODE_ENV === "production" ? undefined : "ws://localhost:7000";

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2YxMjZkYWMwYjhmYTc3NWRjNjY2ZGQiLCJ1c2VybmFtZSI6ImNvZGV3aXRnYWJpIiwiaWF0IjoxNzQzOTQ1MDc4LCJleHAiOjE3NDQ1NDk4Nzh9.6v4V0erXjNw3jDKCjkbsi1EqCkLEJyeV6DukKruGxPk",
  },
});
