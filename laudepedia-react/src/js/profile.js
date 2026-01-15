/**
 * USE PROFILE CUSTOM HOOK
 * Hook fungsional untuk mengelola logika profil pengguna, saldo, dan manajemen akun.
 * * * States (React Hooks):
 * - user: Object - Menyimpan data user yang sedang login dari 'currentUser'.
 * - balance: Number - Menyimpan saldo user yang diambil berdasarkan email unik.
 * - isEditing: Boolean - Toggle status antara mode tampilan profil atau mode edit form.
 * - showLogoutConfirm: Boolean - Modal state untuk konfirmasi sebelum keluar.
 * - message: Object {type, text} - Menyimpan pesan feedback (error/success) untuk UI.
 * - formData: Object - State penampung input form (fullname, email, password lama & baru).
 * * * Functions:
 * - useEffect: Inisialisasi data saat komponen dimuat, termasuk proteksi rute (redirect ke login jika tidak ada user).
 * - handleChange: Function - Update state formData secara dinamis berdasarkan ID input.
 * - handleUpdateProfile: Function - Validasi password, update array 'users', sinkronisasi 'currentUser', dan migrasi saldo jika email berubah.
 * - handleLogout: Function - Menghapus session 'currentUser' dan mengarahkan pengguna kembali ke halaman login.
 * * * Key Logic:
 * - Password Validation: Minimal 8 karakter untuk password baru dan verifikasi password lama.
 * - Storage Migration: Jika email diubah, data saldo dipindahkan ke kunci (key) email baru dan kunci lama dihapus.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    oldPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    setUser(currentUser);
    setFormData({
      fullname: currentUser.fullname,
      email: currentUser.email,
      oldPassword: '',
      newPassword: ''
    });

    const savedBalance = localStorage.getItem(`balance_${currentUser.email}`);
    setBalance(savedBalance ? parseInt(savedBalance) : 100);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.newPassword && formData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters long!' });
      return;
    }

    if (formData.oldPassword !== user.password) {
      setMessage({ type: 'error', text: 'Old password is incorrect!' });
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUser = {
      ...user,
      fullname: formData.fullname,
      email: formData.email,
      password: formData.newPassword ? formData.newPassword : user.password
    };

    const updatedUsersList = allUsers.map(u => u.email === user.email ? updatedUser : u);
    
    localStorage.setItem('users', JSON.stringify(updatedUsersList));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    if (user.email !== updatedUser.email) {
      const currentBal = localStorage.getItem(`balance_${user.email}`);
      localStorage.setItem(`balance_${updatedUser.email}`, currentBal);
      localStorage.removeItem(`balance_${user.email}`);
    }

    setUser(updatedUser);
    setIsEditing(false);
    setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '' }));
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  return {
    user, balance, isEditing, setIsEditing,
    showLogoutConfirm, setShowLogoutConfirm,
    formData, message, navigate,
    handleChange, handleUpdateProfile, handleLogout
  };
};