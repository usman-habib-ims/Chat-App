// src/services/api.ts
import axios from "axios";

const API_URL = "http://localhost:3000"; // Your NestJS REST API base URL

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Fetch all messages
export const fetchMessages = async () => {
  const res = await api.get("/chat/messages"); // adjust path according to your NestJS route
  return res.data;
};

// Save a new message
export const saveMessage = async (msg) => {
  const res = await api.post("/chat/messages", msg); // adjust path according to your NestJS route
  return res.data;
};
export default api;