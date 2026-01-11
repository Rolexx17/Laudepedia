import React, { useState } from 'react';
import '../css/Log_Regis.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  // State for showing errors inside the box
  const [error, setError] = useState('');
  // State for showing success messages
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // 2. STOPS REGISTRATION: Check if email already exists
    const userExists = existingUsers.some(user => user.email.toLowerCase() === formData.email.toLowerCase());

    if (userExists) {
      setError("This email is already registered!");
      return; // Exit the function so no data is saved
    }

    // 3. If email is unique, save the user
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setSuccess("Account created successfully!");
    
    // Clear form after 2 seconds or keep it
    setFormData({ fullname: '', email: '', password: '' });
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
        <p className="subtitle">Good Taste is Always Timely.</p>
        
        {/* Inline Error Message */}
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

        {/* Inline Success Message */}
        {success && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            width: '100%',
            textAlign: 'center',
            border: '1px solid #c3e6cb'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input 
              type="text" 
              id="fullname" 
              className="form-control" 
              placeholder="Your name" 
              value={formData.fullname}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="you@example.com" 
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-gold w-100 mt-2">
            Register
          </button>
        </form>
        
        <p className="switch-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;