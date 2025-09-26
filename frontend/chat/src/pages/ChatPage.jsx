// import React, { useEffect, useState } from "react";
// import { socket } from "../services/socket";
// import { fetchMessages } from "../services/api";

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [username] = useState("User" + Math.floor(Math.random() * 100));

//   // Load old messages from DB
//   useEffect(() => {
//     const loadMessages = async () => {
//       const data = await fetchMessages();
//       setMessages(data);
//     };
//     loadMessages();
//   }, []);

//   // Listen for new messages
//   useEffect(() => {
//     socket.on("reply", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("reply");
//     };
//   }, []);

//   // Send a new message
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     socket.emit("newMessage", {
//       sender: username,
//       content: input,
//     });

//     setInput(""); // clear input box
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen flex flex-col">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">💬 Chat App</h2>

//       <div className="flex-1 mb-4 p-4 border border-gray-300 rounded-lg bg-white overflow-y-auto shadow-md space-y-3">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-md ${
//               msg.sender === username ? "bg-blue-100 self-end" : "bg-gray-100"
//             }`}
//           >
//             <span className="font-semibold text-gray-700">{msg.sender}:</span>{" "}
//             <span className="text-gray-800">{msg.content}</span>
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-3">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;



import React, { useEffect, useState, useRef } from "react";
import { socket } from "../services/socket";
import { fetchMessages } from "../services/api";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username] = useState("User" + Math.floor(Math.random() * 100));

  const messagesEndRef = useRef(null);

  // Load old messages
  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };
    loadMessages();
  }, []);

  // Listen for new messages
  useEffect(() => {
    socket.on("reply", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("reply");
    };
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send new message
  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("newMessage", {
      sender: username,
      content: input,
    });

    setInput(""); // clear input
  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
        ⚡ Live Chat App
      </h2>

      {/* Messages */}
      <div className="flex-1 mb-4 p-4 border border-gray-700 rounded-xl bg-gray-800 overflow-y-auto shadow-lg space-y-3">
        {messages.map((msg, index) => {
          const isOwnMessage = msg.sender === username;
          return (
            <div
              key={index}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] break-words shadow-md text-sm ${
                  isOwnMessage
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/40"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <span className="block text-xs opacity-70 mb-1">
                  {msg.sender}
                </span>
                <span>{msg.content}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg 
                     text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700
                     text-white px-5 py-3 rounded-lg font-semibold shadow-md transition text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
