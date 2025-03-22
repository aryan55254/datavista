// src/components/Dashboard.jsx
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import DataUpload from './DataUpload'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext)
  const [analysisResult, setAnalysisResult] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-3xl w-full mx-auto"
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
      <DataUpload setAnalysisResult={setAnalysisResult} />
      {analysisResult && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl mb-2">Analysis Result:</h2>
          <p>Rows: {analysisResult.numRows}</p>
          <p>Columns: {analysisResult.numColumns}</p>
        </div>
      )}
    </motion.div>
  )
}

export default Dashboard
