import React from "react";

const SenderConnectionRequest = ({
  connectionRequest,
  currentSenderName,
  accept,
  reject,
  volunteerStatus,
}) => {
  if (!connectionRequest) return null;

  if (!volunteerStatus) {
    return (
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-300 mb-4">
        <p className="text-amber-900 font-medium mb-2">
          SOS request from {currentSenderName}
        </p>
        <p className="text-amber-800 text-sm mb-3">
          You are <strong>Inactive</strong>. Go to Dashboard and tap{" "}
          <strong>Inactive</strong> to switch to <strong>Active</strong>, then
          come back here to Accept.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
      <p className="text-blue-800 font-medium mb-3">
        SOS — Location sharing request
      </p>
      <p className="text-blue-600 text-sm mb-3">
        <strong>{currentSenderName}</strong> needs help and wants to share
        their location with you.
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="btn bg-green-500 text-white hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={reject}
          className="btn bg-red-500 text-white hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default SenderConnectionRequest;
