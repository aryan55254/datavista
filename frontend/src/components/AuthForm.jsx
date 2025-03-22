// src/components/AuthForm.jsx
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'

const AuthForm = ({ isRegister, toggleForm }) => {
  const { login, register } = useContext(AuthContext)
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState(null)

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (isRegister) {
        await register(formData.username, formData.email, formData.password)
        alert('Registered successfully! Please log in.')
        toggleForm()
      } else {
        await login(formData.email, formData.password)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl mb-4">{isRegister ? 'Register' : 'Login'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={toggleForm} className="text-blue-500 underline">
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </motion.div>
  )
}

export default AuthForm
