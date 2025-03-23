// src/components/Scraper.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Scraper = () => {
  const [url, setUrl] = useState('');
  const [items, setItems] = useState({ links: false, images: false, videos: false });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);

  const handleCheckboxChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    const selectedItems = Object.keys(items).filter((key) => items[key]);
    if (!url) {
      setError('URL is required');
      return;
    }
    if (selectedItems.length === 0) {
      setError('Select at least one content type to scrape');
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:5000/api/scrape',
        { url, items: selectedItems },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setResult(res.data.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Scrape failed');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Web Scraper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <div className="flex justify-center space-x-6">
          {['links', 'images', 'videos'].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name={type}
                checked={items[type]}
                onChange={handleCheckboxChange}
                className="form-checkbox text-blue-600 cursor-pointer"
              />
              <span className="capitalize">{type}</span>
            </label>
          ))}
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
        >
          Scrape Website
        </button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scraped Results</h3>
          <div className="space-y-6">
            {result.links?.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2">Links:</h4>
                <ul className="list-none space-y-1">
                  {result.links.map((link, i) => (
                    <li key={i} className="text-blue-600 truncate">
                      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.images?.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2">Images:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {result.images.map((img, i) => (
                    <img key={i} src={img} alt={`img-${i}`} className="w-full h-32 object-cover rounded-md shadow-md cursor-pointer" />
                  ))}
                </div>
              </div>
            )}
            {result.videos?.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2">Videos:</h4>
                <ul className="list-none space-y-1">
                  {result.videos.map((vid, i) => (
                    <li key={i} className="text-blue-600 truncate">
                      <a href={vid} target="_blank" rel="noopener noreferrer">{vid}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Scraper;
