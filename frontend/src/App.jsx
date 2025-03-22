// src/App.jsx
import React, { useContext, useState } from 'react'
import AuthForm from './components/AuthForm'
import Dashboard from './components/Dashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { auth } = useContext(AuthContext)
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      {!auth.token ? (
        <AuthForm isRegister={isRegister} toggleForm={() => setIsRegister(!isRegister)} />
      ) : (
        <Dashboard />
      )}
    </div>
  )
}

export default App
