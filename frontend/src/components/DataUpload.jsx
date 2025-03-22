// src/components/DataUpload.jsx
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'

const DataUpload = ({ setAnalysisResult }) => {
  const { auth } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault() // Prevent default form submission
    if (!file) {
      setError('Please select a file first')
      return
    }
    
    setUploading(true)
    setError('')
    
    const formData = new FormData()
    formData.append('datafile', file)
    
    try {
        console.log("Auth Token:", auth.token);

      const res = await axios.post(
        
        'http://localhost:5000/api/data/upload', 
        formData, 
        {
            headers: {
                Authorization: `Bearer ${auth.token}`, // sending token with Bearer prefix
              },
        }
      )
      setAnalysisResult(res.data)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl mb-4">Upload Your Data File (CSV)</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv"
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={uploading || !file}
        >
          {uploading ? 'Uploading...' : 'Upload and Analyze'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </motion.div>
  )
}

export default DataUpload
