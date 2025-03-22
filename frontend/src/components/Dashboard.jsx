// src/components/Dashboard.jsx
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import WebsiteAnalyzer from './WebsiteAnalyzer'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-5xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Welcome, {auth.user?.username}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <WebsiteAnalyzer />
    </motion.div>
  )
}

export default Dashboard
