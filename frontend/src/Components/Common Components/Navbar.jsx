import React from "react";
import { NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if volunteer, admin, or user is logged in
  const volunteerData = localStorage.getItem("volunteer");
  const adminData = localStorage.getItem("admin");
  const userData = localStorage.getItem("user");

  const handleVolunteerLogout = () => {
    localStorage.removeItem("volunteer");
    navigate("/"); // Redirect to home page
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("admin");
    navigate("/"); // Redirect to home page
  };

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="sticky top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm border-b border-pink-400 z-50">
      <NavLink to={"/"}>
        <motion.div className="flex items-center justify-center mr-3 heartbeat">
          <img className="w-38" src="../logo.png" alt="" />
        </motion.div>
      </NavLink>

      <div className="flex gap-4">
        {volunteerData && (
          <button
            onClick={handleVolunteerLogout}
            className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition duration-300"
          >
            Logout
          </button>
        )}

        {adminData && (
          <button
            onClick={handleAdminLogout}
            className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition duration-300"
          >
            Logout
          </button>
        )}

        {userData && (
          <button
            onClick={handleUserLogout}
            className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
