// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null })

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('datavistaAuth'))
    if (storedAuth) setAuth(storedAuth)
  }, [])

  const login = async (email, password) => {
    const res = await axios.post('https://backend-sandy-two-21.vercel.app/api/auth/login', { email, password })
    setAuth({ token: res.data.token, user: res.data.user })
    localStorage.setItem('datavistaAuth', JSON.stringify({ token: res.data.token, user: res.data.user }))
  }

  const register = async (username, email, password) => {
    await axios.post('https://backend-sandy-two-21.vercel.app/api/auth/register', { username, email, password })
  }

  const logout = () => {
    setAuth({ token: null, user: null })
    localStorage.removeItem('datavistaAuth')
  }

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
