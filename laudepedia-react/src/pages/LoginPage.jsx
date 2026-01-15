import React, { useState } from 'react';
import { loginUser } from '../js/authService';
import '../css/Log_Regis.css';

/**
 * LOGIN PAGE COMPONENT
 * Halaman antarmuka untuk autentikasi pengguna agar dapat masuk ke sistem.
 * * * State (React Hooks):
 * - credentials: Object - Menyimpan data input form { email: string, password: string }.
 * - error: String - Menyimpan pesan feedback jika login gagal (validasi visual).
 * * * Functions (Event Handlers):
 * - handleChange: Function(e) - Mengambil value dari input field dan memperbarui state credentials secara real-time.
 * - handleLogin: Function(e) - Menangani submit form, memanggil service autentikasi, dan mengarahkan navigasi.
 * * * Variables & Logic:
 * - result: Object - Variabel lokal penampung respon dari `loginUser` ({ success: boolean, message: string }).
 * - window.location.href: String API - Digunakan untuk navigasi paksa ke halaman '/home' saat sukses.
 */

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginUser(credentials);
    if (result.success) {
      window.location.href = '/home'; 
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container animate-fade-in">
        <h1 className="brand animate-text-focus">Laudepedia</h1>
        <p className="subtitle">Effortless, Like Coming Home.</p>
        
        {error && <div className="error-box animate-shake">{error}</div>}

        <form onSubmit={handleLogin} className="animate-slide-up">
          <div className="input-field">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" id="email" className="form-control" placeholder="you@example.com" value={credentials.email} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" placeholder="••••••••" value={credentials.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-gold w-100 mt-2">Login</button>
        </form>
        
        <p className="switch-link">Don’t have an account? <a href="/">Register</a></p>
      </div>
    </div>
  );
};

export default Login;