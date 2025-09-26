import React, { useState, useEffect, useRef } from "react";
import { socket } from "../services/socket";
import { fetchMessages, saveMessage } from "../services/api";
import Message from "./Message"; // Import Message component
import MessageInput from "./MessageInput"; // Import MessageInput component

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [username] = useState("User" + Math.floor(Math.random() * 100));

  const messagesEndRef = useRef(null);

  // Load old messages from API
  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };
    loadMessages();
  }, []);

  // Listen for new messages via socket
  useEffect(() => {
    socket.on("reply", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("reply");
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Handle sending message
  const handleSend = async (content) => {
    if (!content.trim()) return;

    const msg = { sender: username, content };
    
    // Emit via socket
    socket.emit("newMessage", msg);

    // Save to backend
    await saveMessage(msg);

    // Optimistically add message to local state
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition"
      >
        {isOpen ? "Close Chat" : "Chat 💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col mt-3 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-2 font-bold flex justify-between items-center">
            Chat
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <Message key={index} message={msg} currentUser={username} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <MessageInput onSend={handleSend} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
