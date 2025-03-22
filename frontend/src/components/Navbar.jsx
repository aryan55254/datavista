// src/components/History.jsx
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'

const History = () => {
  const { auth } = useContext(AuthContext)
  const [analyses, setAnalyses] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/data/history', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        setAnalyses(res.data.analyses)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not fetch history')
      }
    }
    fetchHistory()
  }, [auth.token])

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl mb-4">Analysis History</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {analyses.length === 0 ? (
        <p>No past analyses found.</p>
      ) : (
        <ul className="space-y-4">
          {analyses.map((analysis) => (
            <li key={analysis._id} className="p-4 bg-white rounded shadow">
              <p className="font-bold">File: {analysis.filename}</p>
              <p>Created: {new Date(analysis.createdAt).toLocaleString()}</p>
              <p>
                Rows: {analysis.result?.numRows}, Columns:{' '}
                {analysis.result?.numColumns}
              </p>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default History
