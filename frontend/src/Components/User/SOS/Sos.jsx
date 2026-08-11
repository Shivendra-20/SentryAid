import React, { useState, useEffect } from "react";
import ConnectBtn from "./Sender Components/ConnectBtn";
import ReceiverInfo from "./Sender Components/ReceiverInfo";
import LocationSharingBtn from "./Sender Components/LocationSharingBtn";
import GroupParticipants from "./Sender Components/GroupParticipants";
import SenderMessageDisplay from "./Sender Components/SenderMessageDisplay";
import SenderMsgInput from "./Sender Components/SenderMsgInput";
import SenderInstruction from "./Sender Components/SenderInstruction";
import socket from "../../../Utilities/socket";

const Sos = () => {
  const [connected, setConnected] = useState(false); // Track if sender is connected to any receivers (when receiver accept the connection)

  const [isSharingLocation, setIsSharingLocation] = useState(false); // Track if sender is sharing location

  const [locationInterval, setLocationInterval] = useState(null);
  const [connectedReceivers, setConnectedReceivers] = useState(new Map()); // this store all the receivers that are connected to the sender
  // Map is a built-in JavaScript object (like Array or Set) that stores key → value pairs.
  // It’s similar to a normal object {}, but has some advantages:
  // ✅ Keys can be any type (not just strings)
  // ✅ Keeps the order of insertion
  // ✅ Provides handy methods (set, get, delete, has)
  // 📖 Example with Map
  //      const receivers = new Map();
  //      receivers.set("user1", { accepted: true, name: "Alice" }); // Add values
  //      receivers.set("user2", { accepted: false, name: "Bob" });
  //      console.log(receivers.get("user1")); // Get values  { accepted: true, name: "Alice" }
  //      console.log(receivers.has("user2")); // Check if key exists

  const [hasInitiatedConnection, setHasInitiatedConnection] = useState(false); // Track if sender has initiated connection
  // Tracks whether the sender has clicked the "Connect to Receivers" button at all.
  // It doesn’t care yet if any receivers accepted.

  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]); // Store chat messages (chat history array)

  const [newMessage, setNewMessage] = useState(""); // Current message input

  const room = "56"; // static room for demo

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name);
      console.log(user.name);
    }
  }, []);

  useEffect(() => {
    if (!name) return; // only run if we actually have a name

    // Join the room
    socket.emit("join_room", room);

    // Send my name to the server
    socket.emit("set_name", name);

    socket.on("connect", () => {
      console.log("Connected with name:", name);
    });
  }, [name]); // 👈 run again when name is updated

  useEffect(() => {
    socket.on("accept_connection", ({ receiverId, receiverName }) => {
      // This listens for the "accept_connection" event from the server.
      // The server must emit it when a receiver accepts a sender's request, e.g.:
      //          socket.to(senderId).emit("accept_connection", {
      //            receiverId: socket.id,
      //            receiverName: someName
      //          });

      console.log(
        `Receiver ${receiverName} (${receiverId}) accepted connection`
      );
      setConnectedReceivers(
        (prev) => new Map(prev).set(receiverId, receiverName)
        // prev = the previous Map stored in state.
        // new Map(prev) = creates a copy of the old Map (important: React state must be immutable, so we don't directly mutate prev).
        // .set(receiverId, receiverName) = adds (or updates) one entry in the new Map.
      );
      setConnected(true);
    });

    socket.on("reject_connection", ({ receiverId, receiverName }) => {
      console.log(
        `Receiver ${receiverName} (${receiverId}) rejected connection`
      );
    });

    // Listen for messages from receivers
    socket.on(
      "receive_message",
      ({ senderId, senderName, message, timestamp }) => {
        console.log(`Received message from ${senderName}: ${message}`);
        setMessages((prev) => [
          //setMessages updates your messages state (chat history array).
          ...prev,
          {
            id: Date.now() + Math.random(), // unique id (Date.now + random)
            senderId, // id of the sender
            senderName, // name of the sender
            message, // message content
            timestamp, // timestamp of the message
            isFromMe: false, // false means the message is from the receiver
          },
        ]);
      }
    );

    // Listen for chat clear event
    socket.on("clear_chat", ({ senderId, senderName }) => {
      console.log(`Clearing chat for sender ${senderName}`);
      setMessages([]); // Clear all messages
    });

    return () => {
      socket.off("accept_connection");
      socket.off("reject_connection");
      socket.off("receive_message");
      socket.off("clear_chat");
      // When the component unmounts(cancel the page), you remove these listeners.
    };
  }, []);

  // Cleanup location interval when component unmounts
  useEffect(() => {
    return () => {
      // return () => { ... }
      // In React, the function you return from useEffect is the cleanup function.
      // Cleanup is called:
      //    Before the effect runs again (when dependencies change).
      //    When the component is removed from the screen (unmounted).
      // So this ensures we don’t leave background timers running after the component goes away → prevents memory leaks.
      if (locationInterval) {
        clearInterval(locationInterval);
      }
    };
  }, [locationInterval]);

  const requestConnect = () => {
    // when Connect to Receivers button is pressed it send request connection to the server
    socket.emit("request_connection", { room });
    setConnectedReceivers(new Map()); // Reset connections
    setConnected(false); // Reset connection state
    setHasInitiatedConnection(true); // Mark that connection has been initiated
  };

  const disconnectFromReceivers = () => {
    // Disconnect from all receivers
    socket.emit("disconnect_from_receivers", { room });
    setConnectedReceivers(new Map()); // Clear all connections
    setConnected(false); // Reset connection state
    setIsSharingLocation(false); // Stop location sharing if active
    if (locationInterval) {
      clearInterval(locationInterval);
      setLocationInterval(null);
    }
    setHasInitiatedConnection(false); // Reset initiated connection state
    setMessages([]); // Clear chat messages
  };

  const startLocationSharing = () => {
    console.log("Starting location sharing...");

    // navigator is a built-in object in your browser that provides information about the browser and the device. It’s part of the Web APIs that browsers expose to JavaScript.
    // For example:
    // navigator.geolocation → gives access to the device’s location (latitude & longitude).
    // navigator.userAgent → gives information about the browser version.
    // navigator.language → gives your browser’s language.
    if ("geolocation" in navigator) {
      setIsSharingLocation(true);
      // The navigator.geolocation API is built into modern browsers.
      // This line checks if the user’s browser supports geolocation.

      // Get initial location
      navigator.geolocation.getCurrentPosition(
        // This asks the browser for the current location.
        (position) => {
          // Sends the first location immediately to the server.
          console.log("Got initial position:", position);
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: Date.now(),
          };
          console.log("Emitting share_location:", { room, location });
          socket.emit("share_location", { room, location }); // send the room and info to the server
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error getting location. Please check permissions.");
          setIsSharingLocation(false);
        }
      );

      // Set up continuous location tracking
      const interval = setInterval(() => {
        // setInterval(() => {...}, 5000)
        // → Runs the code every 5000 milliseconds (5 seconds) until you stop it.

        console.log("Getting updated position...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: Date.now(),
            };
            console.log("Emitting updated location:", location);
            socket.emit("share_location", { room, location });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }, 5000); // Update every 5 seconds

      setLocationInterval(interval);
      // setInterval starts a repeating task, but it keeps running indefinitely until you manually stop it.
      // interval is the ID (e.g., 3, 4, 5, …).
      // To stop it, you must call:
      // clearInterval(interval);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const stopLocationSharing = () => {
    console.log("Stopping location sharing...");
    setIsSharingLocation(false);
    if (locationInterval) {
      clearInterval(locationInterval);
      setLocationInterval(null);
    }
    socket.emit("stop_location_sharing", { room });
  };

  const sendMessage = () => {
    if (newMessage.trim() && connectedReceivers.size > 0) {
      const messageData = {
        message: newMessage.trim(),
        timestamp: Date.now(),
        // Date.now() is a built-in JavaScript function.
        // It returns the current time in milliseconds since January 1, 1970, 00:00:00 UTC (this is called the Unix epoch).
        // console.log(Date.now());
        // Output might be: 1734633729123
        // This is a number, not a Date object.
        // You can convert it into a readable format later if needed.

        senderId: socket.id,
        senderName: name,
      };

      // Add message to local messages
      setMessages((prev) => [
        ...prev,
        {
          ...messageData,
          id: Date.now() + Math.random(),
          isFromMe: true,
        },
      ]);

      // Send message to all connected receivers
      socket.emit("send_message", {
        room,
        message: newMessage.trim(),
        timestamp: Date.now(),
      });

      setNewMessage(""); // Clear input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full bg-pink-50">
      <div className="w-9/10 mx-auto py-12 min-h-screen flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-4 p-3 bg-white border border-pink-400 rounded-lg ">
            <h3 className="text-pink-600 font-semibold mb-2">
              📍 Location Sender
            </h3>
            <p className="text-pink-400 text-sm">
              Share your location with receivers in the room
            </p>
          </div>

          {/* Connect to Receivers Button */}
          <ConnectBtn
            hasInitiatedConnection={hasInitiatedConnection}
            disconnectFromReceivers={disconnectFromReceivers}
            requestConnect={requestConnect}
          ></ConnectBtn>

          {hasInitiatedConnection && !connected && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-lg text-sm text-amber-900">
              SOS sent. Waiting for a volunteer to open <strong>Get SOS Alert</strong>{" "}
              and tap <strong>Accept</strong>. (Use Chrome + Edge, or Incognito, for
              user and volunteer at the same time.)
            </div>
          )}

          {connected && (
            <div className="mt-3 p-3 bg-green-50 border border-green-300 rounded-lg text-sm text-green-800">
              Volunteer connected. Tap <strong>Start Sharing Location</strong> below.
            </div>
          )}

          {/* Connected Receivers Info */}
          <ReceiverInfo connectedReceivers={connectedReceivers}></ReceiverInfo>

          {/* Location Sharing Button */}
          <LocationSharingBtn
            connected={connected}
            isSharingLocation={isSharingLocation}
            connectedReceivers={connectedReceivers}
            startLocationSharing={startLocationSharing}
            stopLocationSharing={stopLocationSharing}
          ></LocationSharingBtn>

          {/* Chat Section */}
          {connected && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                💬 Group Chat with Receivers
              </h3>

              {/* Group Participants Info */}
              <GroupParticipants
                connectedReceivers={connectedReceivers}
                name={name}
              ></GroupParticipants>

              {/* Messages Display */}
              <SenderMessageDisplay
                messages={messages}
                name={name}
              ></SenderMessageDisplay>

              {/* Message Input */}
              <SenderMsgInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                connectedReceivers={connectedReceivers}
                sendMessage={sendMessage}
                handleKeyPress={handleKeyPress}
              ></SenderMsgInput>
            </div>
          )}
        </div>
        {/* Instructions */}
        <SenderInstruction></SenderInstruction>
      </div>
    </div>
  );
};

export default Sos;
