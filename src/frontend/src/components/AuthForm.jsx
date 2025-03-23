import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthForm = ({ isRegister, toggleForm }) => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(isRegister);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await register(formData.username, formData.email, formData.password);
        alert('Registered successfully! Please log in.');
        setIsSignUp(false);
      } else {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div 
        className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl flex flex-col items-center text-center space-y-6 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 1 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg mb-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full border-t-4 border-l-4 border-white"
          />
        </motion.div>
        
        <h2 className="text-3xl font-semibold text-gray-800 relative z-10">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        {error && <p className="text-red-500 text-sm relative z-10">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full space-y-4 relative z-10">
          {isSignUp && (
            <div className="flex flex-col items-start w-full">
              <label className="text-gray-600 text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div className="flex flex-col items-start w-full">
            <label className="text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-3 cursor-pointer rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="text-gray-600 text-sm relative z-10">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 cursor-pointer font-medium hover:underline">
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
