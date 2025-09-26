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




// import React from "react";

// const Message = ({ message, currentUser }) => {
//   const isOwnMessage = message.sender === currentUser;

//   return (
//     <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`px-4 py-2 rounded-2xl max-w-[75%] break-words shadow 
//         ${isOwnMessage 
//           ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/30" 
//           : "bg-gray-800 text-gray-200"}`
//         }
//       >
//         <span className="block text-xs opacity-70 mb-1">
//           {message.sender}
//         </span>
//         <span className="text-sm">{message.content}</span>
//       </div>
//     </div>
//   );
// };

// export default Message;


// import React from "react";

// const Message = ({ message, currentUser }) => {
//   const isOwnMessage = message.sender === currentUser;

//   return (
//     <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`px-4 py-2 rounded-2xl max-w-[70%] break-words shadow-md text-sm ${
//           isOwnMessage
//             ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/40"
//             : "bg-gray-800 text-gray-200"
//         }`}
//       >
//         <span className="block text-xs opacity-70 mb-1">{message.sender}</span>
//         <span>{message.content}</span>
//       </div>
//     </div>
//   );
// };

// export default Message;
