import React from "react";

const ReceiverInstructions = () => {
  return (
    <div className="p-4  border border-pink-400 rounded-lg">
      <h4 className="font-semibold text-gray-800 mb-2">Quick Guide:</h4>
      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
        <li>📨 Receive SOS alerts from users in real-time</li>
        <li>✅ Accept or ❌ reject each request individually</li>
        <li>📍 Track accepted users on the map </li>
        <li>💬 Use chat to coordinate with users and volunteers</li>
        <li>⚡ See all messages instantly in the group chat</li>
      </ol>
    </div>
  );
};

export default ReceiverInstructions;
