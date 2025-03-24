// src/App.jsx
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/Landing";
import Dashboard from "./components/Dashboard";
import AuthForm from "./components/AuthForm"; // Login/Register Page
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? children : <Navigate to="/auth" replace />;
};

const App = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // Auto-redirect to dashboard if logged in
    if (auth.token) {
      window.location.pathname = "/dashboard";
    }
  }, [auth.token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
