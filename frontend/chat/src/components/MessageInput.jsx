import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex p-2 border-t border-gray-200 gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;



// import React, { useState } from "react";

// const MessageInput = ({ onSend }) => {
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput("");
//   };

//   return (
//     <div className="flex p-2 border-t border-gray-700 bg-[#1e1e2e] gap-2">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type a message..."
//         className="flex-1 px-3 py-2 bg-gray-800 text-gray-200 rounded-lg
//                    focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//         onKeyDown={(e) => e.key === "Enter" && handleSend()}
//       />
//       <button
//         onClick={handleSend}
//         className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700
//                    text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition"
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// export default MessageInput;




// import React, { useState } from "react";

// const MessageInput = ({ onSend }) => {
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput("");
//   };

//   return (
//     <div className="flex p-3 border-t border-gray-700 bg-gray-900 gap-2">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type a message..."
//         className="flex-1 px-3 py-2 bg-gray-800 text-gray-200 rounded-lg 
//                    focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//         onKeyDown={(e) => e.key === "Enter" && handleSend()}
//       />
//       <button
//         onClick={handleSend}
//         className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700
//                    text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition"
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// export default MessageInput;
