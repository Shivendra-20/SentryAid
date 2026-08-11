import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router";
import { Heart } from "lucide-react";
import api from "../../Utilities/axios";

const VolunteerLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("📡 Attempting to login with:", { name, password }); // log before sending

    try {
      const res = await api.post(`/volunteers/login`, { name, password });

      console.log("✅ Backend response:", res.data); // log the response

      if (res.data.request === "pending") {
        alert("Your signup request is under review.");
        return;
      }

      // Save to localStorage
      localStorage.setItem("volunteer", JSON.stringify(res.data));

      // Show success message
      toast.success("Login successful! 🎉");

      // Navigate to volunteer dashboard
      navigate(`/volunteers/${res.data._id}`);
    } catch (err) {
      console.error("❌ Login error:", err); // log full error for debugging

      if (err.response) {
        toast.error(err.response.data.message); // server returned error
      } else {
        toast.error("Something went wrong. Please try again."); // network or CORS issue
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center mt-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-100">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          SentryAid Signup
        </h2>
        <p className="text-sm text-black text-center mt-2">
          Join us today! Create your account to get started
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Name */}
        <div className="text-black">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-b focus:outline-none focus:border-pink-500 py-2 px-1  w-full mt-1"
            required
          />
        </div>

        {/* Password */}
        <div className="text-black">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-b focus:outline-none focus:border-pink-500 py-2 px-1  w-full mt-1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-pink-400 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login as Volunteer"}
        </button>
        <div className="flex justify-between text-sm text-pink-500 mt-2">
          <NavLink to={"/usersLogin"}>Login as User</NavLink>
          <NavLink to={"/adminLogin"}>Login as Admin</NavLink>
        </div>
      </form>
    </div>
  );
};

export default VolunteerLogin;
