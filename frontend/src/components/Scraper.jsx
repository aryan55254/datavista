// src/components/Scraper.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

const Scraper = () => {
  const [url, setUrl] = useState('')
  const [items, setItems] = useState({ links: false, images: false, videos: false })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCheckboxChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.checked })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    const selectedItems = Object.keys(items).filter((key) => items[key])
    if (!url) {
      setError('URL is required')
      return
    }
    if (selectedItems.length === 0) {
      setError('Select at least one content type to scrape')
      return
    }
    try {
      const res = await axios.post('http://localhost:5000/api/scrape', { url, items: selectedItems })
      setResult(res.data.data)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Scrape failed')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl mb-4">Web Scraper</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />
        <div className="mb-4">
          <label className="mr-4">
            <input type="checkbox" name="links" checked={items.links} onChange={handleCheckboxChange} /> Links
          </label>
          <label className="mr-4">
            <input type="checkbox" name="images" checked={items.images} onChange={handleCheckboxChange} /> Images
          </label>
          <label className="mr-4">
            <input type="checkbox" name="videos" checked={items.videos} onChange={handleCheckboxChange} /> Videos
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
          Scrape Website
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {result && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Results:</h3>
          {result.links && result.links.length > 0 && (
            <div>
              <h4 className="font-semibold">Links:</h4>
              <ul className="list-disc ml-4">
                {result.links.map((link, i) => (
                  <li key={i}><a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{link}</a></li>
                ))}
              </ul>
            </div>
          )}
          {result.images && result.images.length > 0 && (
            <div>
              <h4 className="font-semibold">Images:</h4>
              <div className="flex flex-wrap">
                {result.images.map((img, i) => (
                  <img key={i} src={img} alt={`img-${i}`} className="w-24 h-24 object-cover m-1" />
                ))}
              </div>
            </div>
          )}
          {result.videos && result.videos.length > 0 && (
            <div>
              <h4 className="font-semibold">Videos:</h4>
              <ul className="list-disc ml-4">
                {result.videos.map((vid, i) => (
                  <li key={i}><a href={vid} target="_blank" rel="noopener noreferrer" className="text-blue-500">{vid}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default Scraper
