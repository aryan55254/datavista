// src/components/WebsiteAnalyzer.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze-website', { url });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Analysis failed');
    }
  };

  return (
    <motion.div 
      className="p-6 bg-white rounded shadow my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl mb-4">Analyze a Website</h2>
      <form onSubmit={handleAnalyze}>
        <input
          type="text"
          placeholder="Enter website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Analyze Website
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Results:</h3>
          <p><strong>Title:</strong> {result.title}</p>
          <p><strong>Meta Description:</strong> {result.metaDescription}</p>
          <p><strong>First H1 Text:</strong> {result.h1Text}</p>
          <p><strong>Headings Count:</strong></p>
          <ul>
            <li>H1: {result.headingsCount.h1}</li>
            <li>H2: {result.headingsCount.h2}</li>
            <li>H3: {result.headingsCount.h3}</li>
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default WebsiteAnalyzer;
