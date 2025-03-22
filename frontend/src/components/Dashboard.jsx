// src/components/Dashboard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import Scraper from './Scraper'

const Dashboard = () => {
  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl mb-6">Web Scraper Dashboard</h1>
      <Scraper />
    </motion.div>
  )
}

export default Dashboard
