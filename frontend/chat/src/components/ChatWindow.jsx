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



// import React, { useState, useEffect, useRef } from "react";
// import { socket } from "../services/socket";
// import { fetchMessages, saveMessage } from "../services/api";
// import Message from "./Message";
// import MessageInput from "./MessageInput";

// const ChatWindow = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [username] = useState("User" + Math.floor(Math.random() * 100));

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const loadMessages = async () => {
//       const data = await fetchMessages();
//       setMessages(data);
//     };
//     loadMessages();
//   }, []);

//   useEffect(() => {
//     socket.on("reply", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socket.off("reply");
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isOpen]);

//   const handleSend = async (content) => {
//     if (!content.trim()) return;
//     const msg = { sender: username, content };
//     socket.emit("newMessage", msg);
//     await saveMessage(msg);
//     setMessages((prev) => [...prev, msg]);
//   };

//   return (
//     <div className="fixed bottom-5 right-5">
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 
//                    text-white px-5 py-3 rounded-full shadow-lg font-semibold transition"
//       >
//         {isOpen ? "Close Chat ✖" : "Chat 💬"}
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="w-80 h-96 bg-[#1e1e2e] border border-gray-700 rounded-xl shadow-2xl 
//                         flex flex-col mt-3 overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 
//                           font-bold flex justify-between items-center shadow">
//             <span className="tracking-wide">⚡ Live Chat</span>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-white font-bold hover:text-gray-300"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#12121b]">
//             {messages.map((msg, index) => (
//               <Message key={index} message={msg} currentUser={username} />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <MessageInput onSend={handleSend} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;



// import React, { useState, useEffect, useRef } from "react";
// import { socket } from "../services/socket";
// import { fetchMessages, saveMessage } from "../services/api";
// import Message from "./Message";
// import MessageInput from "./MessageInput";

// const ChatWindow = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [username] = useState("User" + Math.floor(Math.random() * 100));

//   const messagesEndRef = useRef(null);

//   // Load old messages
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

//     return () => socket.off("reply");
//   }, []);

//   // Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isOpen]);

//   // Send message
//   const handleSend = async (content) => {
//     if (!content.trim()) return;

//     const msg = { sender: username, content };

//     socket.emit("newMessage", msg);
//     await saveMessage(msg);

//     setMessages((prev) => [...prev, msg]);
//   };

//   return (
//     <div className="fixed bottom-5 right-5">
//       {/* Floating Chat Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 
//                    text-white px-5 py-3 rounded-full shadow-lg transition flex items-center gap-2"
//       >
//         {isOpen ? "Close ✕" : "💬 Chat"}
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl 
//                         flex flex-col mt-3 overflow-hidden animate-fadeIn">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 font-bold 
//                           flex justify-between items-center shadow-md">
//             <span className="tracking-wide">⚡ Live Chat</span>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-white font-bold hover:text-gray-200 transition"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-950">
//             {messages.map((msg, index) => (
//               <Message key={index} message={msg} currentUser={username} />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <MessageInput onSend={handleSend} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;
