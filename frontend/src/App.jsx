// src/App.jsx
import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import Dashboard from './components/Dashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { auth } = useContext(AuthContext)
  const [isRegister, setIsRegister] = useState(false)

  if (!auth.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <AuthForm isRegister={isRegister} toggleForm={() => setIsRegister(!isRegister)} />
      </div>
    )
  }

  return (
    <Router>
      <nav className="p-4 bg-white shadow flex justify-between">
        <Link to="/" className="text-blue-500 font-bold">
          WebAnalyticsPro
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
