// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null })
  
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('datavistaAuth'))
    if (storedAuth?.token) {
      fetchUser(storedAuth.token)
    }
  }, [])

  const fetchUser = async (token) => {
    try {
      const res = await axios.get('https://api.scrapesift.aryanmishra.site/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAuth({ token, user: res.data.user })
    } catch (error) {
      console.error('Failed to fetch user', error)
      logout()
    }
  }

  const login = async (email, password) => {
    const res = await axios.post('https://api.scrapesift.aryanmishra.site/api/auth/login', { email, password })
    setAuth({ token: res.data.token, user: res.data.user })
    localStorage.setItem('datavistaAuth', JSON.stringify({ token: res.data.token, user: res.data.user }))
  }

  const register = async (username, email, password) => {
    await axios.post('https://api.scrapesift.aryanmishra.site/api/auth/register', { username, email, password })
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
