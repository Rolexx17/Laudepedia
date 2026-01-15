import React, { useState } from 'react';
import { registerUser } from '../js/authService';
import '../css/Log_Regis.css';

/**
 * REGISTER PAGE COMPONENT
 * Halaman pendaftaran pengguna baru yang berinteraksi dengan authService.
 * Mengelola input user, validasi sederhana, dan feedback UI (sukses/error).
 * * * State:
 * - formData: Object - Menyimpan data input form { fullname, email, password }.
 * - error: String - Menyimpan pesan kesalahan jika validasi atau pendaftaran gagal.
 * - success: String - Menyimpan pesan sukses jika akun berhasil dibuat.
 * * * Functions:
 * - handleChange: Function(e) - Mengupdate state formData saat user mengetik dan mereset notifikasi.
 * - handleSubmit: Function(e) - Mengirim data ke registerUser dan memperbarui state berdasarkan hasil (sukses/gagal).
 */

const Register = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerUser(formData);
    if (result.success) {
      setSuccess(result.message);
      setFormData({ fullname: '', email: '', password: '' });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container animate-fade-in">
        <h1 className="brand animate-text-focus">Laudepedia</h1>
        <p className="subtitle">Good Taste is Always Timely.</p>
        
        {error && <div className="error-box animate-shake">{error}</div>}
        {success && <div className="success-box animate-pop">{success}</div>}

        <form onSubmit={handleSubmit} className="animate-slide-up">
          <div className="input-field">
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input type="text" id="fullname" className="form-control" placeholder="Your name" value={formData.fullname} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" id="email" className="form-control" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="Min. 8 characters" 
              value={formData.password} 
              onChange={handleChange} 
              minLength="8" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-gold w-100 mt-2">Register</button>
        </form>
        
        <p className="switch-link">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;