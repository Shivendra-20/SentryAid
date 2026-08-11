import React from "react";

const SenderInstruction = () => {
  return (
    <div className="p-4 border border-pink-400 rounded-lg">
      <h4 className="font-semibold text-gray-800 mb-2">Quick Guide:</h4>
      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
        <li>
          🚨 Tap <span className="font-medium">"Send SOS Alert"</span> to
          request help
        </li>
        <li>👥 Volunteers can accept or reject your request</li>
        <li>📍 Only accepted volunteers see your live location</li>
        <li>🔴 Tap "Stop SOS Alert" anytime to disconnect</li>
        <li>💬 Chat with connected volunteers in real-time</li>
      </ol>
    </div>
  );
};

export default SenderInstruction;
