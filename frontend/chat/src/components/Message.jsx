import React from "react";

const Message = ({ message, currentUser }) => {
  const isOwnMessage = message.sender === currentUser;

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-2 rounded-lg max-w-[75%] break-words ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <span className="font-semibold">{message.sender}:</span>{" "}
        <span>{message.content}</span>
      </div>
    </div>
  );
};

export default Message;

