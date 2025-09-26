// src/services/socket.ts
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3002"; // Your NestJS gateway port

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // force WebSocket
  autoConnect: true,
});
