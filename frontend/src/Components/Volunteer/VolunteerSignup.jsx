import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Heart } from "lucide-react";
import api from "../../Utilities/axios";

const VolunteerSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send signup request
      const res = await api.post(`/volunteers`, {
        name,
        email,
        password,
      });

      // Save the returned volunteer info in localStorage
      //localStorage.setItem("volunteer", JSON.stringify(res.data));

      // Navigate to dashboard or home page
      //navigate(`/volunteers/${res.data._id}`); // or "/" if you prefer
      alert(
        import.meta.env.DEV
          ? "Account created! You can log in now."
          : "Your signup request has been sent for review. We will notify you by email."
      );

      navigate("/");
    } catch (error) {
      console.error("Error creating User", error);
    } finally {
      setLoading(false);
    }

    console.log("Signup with:", { name, email, password });
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

      <form onSubmit={handleSignup} className="space-y-4">
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

        {/* Email */}
        <div className="text-black">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Signup in..." : "Signup as Volunteer"}
        </button>

        <div className="flex justify-between text-sm text-pink-500 mt-2">
          <NavLink to={"/usersLogin"}>Login as User</NavLink>
          <NavLink to={"/adminLogin"}>Login as Admin</NavLink>
        </div>
      </form>
    </div>
  );
};

export default VolunteerSignup;
