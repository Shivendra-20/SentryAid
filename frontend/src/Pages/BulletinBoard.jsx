import React, { useState, useEffect } from "react";
import api from "../Utilities/axios";
import { useNavigate } from "react-router";

const BulletinBoard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch bulletin messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/bulletinMsg`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching bulletin messages", error);
        alert("Failed to fetch bulletin messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex  justify-center items-center h-screen bg-gradient-to-br from-pink-50 to-blue-50">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-10 px-6 bg-pink-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-8">
          <h2 className="sm:text-4xl mb-8 text-3xl font-extrabold text-pink-600 drop-shadow">
            📢 Bulletin Board
          </h2>
          <button
            onClick={() => navigate("/createBulletinMsg")}
            className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
          >
            ➕ Create Blog
          </button>
        </div>

        {/* Messages */}
        {messages.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No bulletin messages available.
          </p>
        ) : (
          <div className="flex flex-col sm:gap-8 gap-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="p-6 rounded-2xl shadow-md bg-white/70 backdrop-blur-md border border-pink-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {msg.title}
                  </h3>
                  <span className="px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-600 font-medium">
                    {msg.type}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{msg.msg}</p>
                <p className="text-xs text-gray-500 italic">
                  ✍️ {msg.name} •{" "}
                  {new Date(msg.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulletinBoard;
