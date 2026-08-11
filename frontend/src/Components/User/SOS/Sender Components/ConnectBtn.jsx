const ConnectBtn = ({
  requestConnect,
  disconnectFromReceivers,
  hasInitiatedConnection,
}) => {
  return (
    <button
      onClick={
        hasInitiatedConnection ? disconnectFromReceivers : requestConnect
      }
      className={`btn rounded-xl ${
        hasInitiatedConnection
          ? "bg-red-500 hover:bg-red-600"
          : "bg-pink-400 hover:bg-pink-600"
      } text-white`}
    >
      {hasInitiatedConnection ? "Stop SOS Alert" : "Send SOS Alert"}
    </button>
  );
};

export default ConnectBtn;
