// src/components/Dashboard.jsx
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Scraper from "./Scraper";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate("/auth"); // Redirect to login if not authenticated
    }
  }, [auth.token, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // Generate background particles (adjusted for better visibility)
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5, // increased size for better visibility
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.3, // increased opacity for better visibility
            }}
            animate={{ x: 30, y: -30 }}
            initial={{ x: 0, y: 0 }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1), transparent 30%), radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1), transparent 30%)",
        }}
      />

      {/* Dashboard Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white bg-opacity-90 shadow-sm backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-t-2 border-l-2 border-white"
              />
            </div>
            <h1 className="text-xl font-semibold">ScrapeSift</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 cursor-pointer bg-red-500 text-white  rounded-md shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </nav>

        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome to ScrapeSift, {auth.user?.username || "User"}!
            </h2>
            <Scraper />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
