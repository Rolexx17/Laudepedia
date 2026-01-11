import React, { useState } from 'react';
import '../css/Log_Regis.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // 1. First, check if the email exists at all
    const emailExists = storedUsers.some(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!emailExists) {
      setError("This email is not registered. Please create an account first.");
      return;
    }

    // 2. If email exists, check if the password matches
    const user = storedUsers.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && 
             u.password === credentials.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = '/home'; 
    } else {
      // 3. If email exists but password is wrong
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100vw',
      background: 'linear-gradient(135deg, #ffffff 0%, #f9f6f1 100%)' 
    }}>
      <div className="auth-container">
        <h1 className="brand">Laudepedia</h1>
        <p className="subtitle">Effortless, Like Coming Home.</p>
        
        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            width: '100%',
            textAlign: 'center',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="you@example.com" 
              value={credentials.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="••••••••" 
              value={credentials.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-gold w-100 mt-2">
            Login
          </button>
        </form>
        
        <p className="switch-link">
          Don’t have an account? <a href="/">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;