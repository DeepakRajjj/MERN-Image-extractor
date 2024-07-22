import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Update login status based on token presence
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/search" className="nav-button">Search</Link>
          {isLoggedIn ? (
            <>
              <Link to="/list" className="nav-button">List Page</Link>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/register" className="nav-button">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<ProtectedRoute element={<SearchPage />} />} />
          <Route path="/list" element={<ProtectedRoute element={<ListPage />} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/list" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/list" /> : <RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
