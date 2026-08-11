import React, { useState, useEffect } from "react";
import api from "../Utilities/axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBulletinMsg = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    title: "",
    msg: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const volunteer = localStorage.getItem("volunteer");
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");

    let storedRole = null;

    if (volunteer) storedRole = JSON.parse(volunteer);
    else if (user) storedRole = JSON.parse(user);
    else if (admin) storedRole = JSON.parse(admin);

    if (storedRole) {
      setRole(storedRole);
      setFormData((prev) => ({
        ...prev,
        name: storedRole.name,
        type: storedRole.type || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, type, title, msg } = formData;

    if (!title || !msg) {
      toast.warn("⚠️ Title and message are required!");
      setLoading(false);
      return;
    }

    try {
      await api.post(`/bulletinMsg`, {
        name,
        type,
        title,
        msg,
      });
      toast.success("✅ Bulletin message created successfully!");
      setFormData({
        name: role ? role.name : "",
        type: role ? role.type : "",
        title: "",
        msg: "",
      });
      setTimeout(() => navigate(-1), 2000); // go back after 2s
    } catch (error) {
      console.error("Error creating bulletin message", error);
      toast.error("❌ Failed to create bulletin message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 to-blue-100 flex items-center justify-center py-10 px-6">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          ✍️ Create Bulletin Message
        </h2>

        {role && (
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-medium">
              Logged in as: {role.name} ({role.type})
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!role && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
            </div>
          )}

          {!role && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Type:
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Message:
            </label>
            <textarea
              name="msg"
              value={formData.msg}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              rows="4"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-400 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
              disabled={loading}
            >
              {loading ? "⏳ Creating..." : "🚀 Create"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border-2 border-gray-400 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default CreateBulletinMsg;
