// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-white shadow flex justify-between">
        <Link to="/" className="text-blue-500 font-bold">Web Scraper</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
