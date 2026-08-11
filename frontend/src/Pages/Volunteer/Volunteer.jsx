import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import VolunteerLogin from "../../Components/Volunteer/VolunteerLogin";
import VolunteerSignup from "../../Components/Volunteer/VolunteerSignup";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Volunteer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Get volunteer, user, or admin from localStorage once on mount
  useEffect(() => {
    const volunteerStr = localStorage.getItem("volunteer");
    const userStr = localStorage.getItem("user");
    const adminStr = localStorage.getItem("admin");

    if (volunteerStr) {
      setRole(JSON.parse(volunteerStr));
    } else if (userStr) {
      setRole(JSON.parse(userStr));
    } else if (adminStr) {
      setRole(JSON.parse(adminStr));
    }
  }, []);

  // Check if someone is logged in
  const isLoggedIn = !!role;

  const handleDashboardNavigate = () => {
    if (!role) return;

    switch (role.type) {
      case "volunteer":
        navigate(`/volunteers/${role._id}`);
        break;
      case "user":
        navigate(`/users/${role._id}`);
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-rose-100">
      {/* Background shapes (animations) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-6 h-6 bg-white/40 rounded-full backdrop-blur-sm border border-white/30 shadow-lg"
          animate={{
            x: [0, 100, 200, 100, 0],
            y: [0, -50, -100, -150, -200],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "80%", left: "10%" }}
        />
        <motion.div
          className="absolute w-8 h-8 bg-pink-200/50 rounded-full backdrop-blur-sm border border-pink-300/40 shadow-lg"
          animate={{
            x: [0, -80, -160, -80, 0],
            y: [0, 60, 120, 180, 240],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ top: "20%", right: "15%" }}
        />
        <motion.div
          className="absolute w-10 h-10 bg-rose-200/45 rounded-full backdrop-blur-sm border border-rose-300/35 shadow-lg"
          animate={{
            x: [0, 120, 240, 120, 0],
            y: [0, -80, -160, -240, -320],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ bottom: "10%", left: "70%" }}
        />

        <motion.div
          className="absolute w-5 h-5 bg-purple-200/40 rounded-full backdrop-blur-sm border border-purple-300/30 shadow-md"
          animate={{
            x: [0, -70, -140, -70, 0],
            y: [0, 30, 60, 90, 120],
          }}
          transition={{
            duration: 16,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ top: "40%", left: "5%" }}
        />
        <motion.div
          className="absolute w-7 h-7 bg-pink-300/45 rounded-full backdrop-blur-sm border border-pink-400/35 shadow-md"
          animate={{
            x: [0, 90, 180, 90, 0],
            y: [0, -40, -80, -120, -160],
          }}
          transition={{
            duration: 19,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ bottom: "60%", right: "8%" }}
        />
        <motion.div
          className="absolute w-4 h-4 bg-rose-300/50 rounded-full backdrop-blur-sm border border-rose-400/40 shadow-md"
          animate={{
            x: [0, 110, 220, 110, 0],
            y: [0, 70, 140, 210, 280],
          }}
          transition={{
            duration: 21,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ top: "10%", left: "40%" }}
        />

        <motion.div
          className="absolute w-14 h-14 bg-gradient-to-br from-pink-300/40 to-rose-300/40 rounded-full backdrop-blur-md border border-white/25 shadow-xl"
          animate={{
            x: [0, -60, -120, -60, 0],
            y: [0, 40, 80, 120, 160],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ top: "60%", right: "25%" }}
        />
        <motion.div
          className="absolute w-12 h-12 bg-gradient-to-tl from-purple-200/45 to-pink-200/45 rounded-full backdrop-blur-md border border-white/25 shadow-xl"
          animate={{
            x: [0, 90, 180, 90, 0],
            y: [0, -70, -140, -210, -280],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ bottom: "30%", left: "5%" }}
        />

        <motion.div
          className="absolute w-16 h-16 bg-gradient-to-r from-rose-300/35 to-pink-300/35 rounded-full backdrop-blur-md border border-white/20 shadow-xl"
          animate={{
            x: [0, 50, 100, 50, 0],
            y: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 24,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ bottom: "5%", right: "60%" }}
        />
        <motion.div
          className="absolute w-11 h-11 bg-gradient-to-bl from-pink-400/40 to-purple-300/40 rounded-full backdrop-blur-md border border-white/25 shadow-lg"
          animate={{
            x: [0, -85, -170, -85, 0],
            y: [0, 55, 110, 165, 220],
          }}
          transition={{
            duration: 23,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ top: "35%", right: "45%" }}
        />

        <motion.div
          className="absolute w-20 h-20 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full backdrop-blur-lg border border-white/20 shadow-2xl"
          animate={{
            x: [0, -100, -200, -100, 0],
            y: [0, 50, 100, 150, 200],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ top: "15%", right: "5%" }}
        />
        <motion.div
          className="absolute w-18 h-18 bg-gradient-to-bl from-rose-300/35 to-pink-300/35 rounded-full backdrop-blur-lg border border-white/20 shadow-2xl"
          animate={{
            x: [0, 80, 160, 80, 0],
            y: [0, -60, -120, -180, -240],
          }}
          transition={{
            duration: 28,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ bottom: "20%", right: "40%" }}
        />

        <motion.div
          className="absolute w-22 h-22 bg-gradient-to-t from-purple-200/25 to-rose-200/25 rounded-full backdrop-blur-lg border border-white/15 shadow-2xl"
          animate={{
            x: [0, 120, 240, 120, 0],
            y: [0, 80, 160, 240, 320],
          }}
          transition={{
            duration: 32,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ top: "5%", left: "20%" }}
        />
        <motion.div
          className="absolute w-17 h-17 bg-gradient-to-br from-pink-300/30 to-purple-200/30 rounded-full backdrop-blur-lg border border-white/20 shadow-xl"
          animate={{
            x: [0, -95, -190, -95, 0],
            y: [0, -45, -90, -135, -180],
          }}
          transition={{
            duration: 26,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ bottom: "40%", left: "80%" }}
        />

        {/* Existing large background shapes */}
        <motion.div
          className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-4 w-96 h-96 bg-gradient-to-l from-pink-300/20 to-purple-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-t from-rose-200/25 to-pink-200/25 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* ... keep the rest of the animated shapes (I didn’t remove them) ... */}
      </div>
      <div className=" w-full max-w-md p-8 z-2 bg-white/5 backdrop-blur-xl  rounded-xl shadow-2xl  text-white border border-white/20">
        {!isLoggedIn ? (
          <>
            {/* Toggle Buttons */}
            <div className="flex justify-around mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-2 font-semibold ${
                  isLogin
                    ? "border-b-2 border-pink-600 text-pink-400"
                    : "text-gray-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-2 font-semibold ${
                  !isLogin
                    ? "border-b-2 border-pink-600 text-pink-400"
                    : "text-gray-500"
                }`}
              >
                Signup
              </button>
            </div>

            {/* Show Login or Signup Component */}
            {isLogin ? <VolunteerLogin /> : <VolunteerSignup />}
          </>
        ) : (
          <div className="text-center">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex justify-center mt-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-100">
                  <Shield className="w-8 h-8 text-pink-500" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                SentryAid
              </h2>
            </div>
            <div className="text-pink-400 font-semibold text-xl mb-4">
              You are already logged in as {role.name} ({role.type})
            </div>
            <button
              onClick={handleDashboardNavigate}
              className="bg-pink-400 text-white mt-6 px-6 py-2 rounded-lg hover:bg-pink-500 transition duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteer;
