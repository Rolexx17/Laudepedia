/**
 * AUTH SERVICE MODULE
 * Modul logika bisnis untuk menangani pendaftaran dan login pengguna.
 * Menggunakan LocalStorage browser sebagai simulasi database backend.
 * * * * Functions:
 * * 1. registerUser(formData)
 * - Fungsi untuk mendaftarkan user baru ke dalam database (LocalStorage).
 * - Parameters: 
 * - formData: Object { email: string, password: string } - Data input dari form registrasi.
 * - Logic Variables:
 * - existingUsers: Array - Mengambil list user lama dari LocalStorage (atau array kosong []).
 * - userExists: Boolean - Mengecek apakah email sudah ada (true/false) menggunakan .some().
 * - updatedUsers: Array - Menggabungkan user lama dengan user baru (Spread Operator).
 * - Return: Object { success: boolean, message: string }.
 * * 2. loginUser(credentials)
 * - Fungsi untuk memverifikasi identitas pengguna saat masuk.
 * - Parameters:
 * - credentials: Object { email: string, password: string } - Data input dari form login.
 * - Logic Variables:
 * - storedUsers: Array - List seluruh user yang terdaftar.
 * - user: Object/Undefined - Hasil pencarian user yang cocok (email & password sama).
 * - emailExists: Boolean - Pengecekan sekunder untuk memberikan pesan error yang spesifik (Email salah vs Password salah).
 * - Side Effect:
 * - Menyimpan data user ke key 'currentUser' di LocalStorage jika login sukses.
 */

export const registerUser = (formData) => {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  
  // Validasi minimal 8 karakter
  if (formData.password.length < 8) {
    return { success: false, message: "Password must be at least 8 characters long!" };
  }

  const userExists = existingUsers.some(user => user.email.toLowerCase() === formData.email.toLowerCase());
  if (userExists) {
    return { success: false, message: "This email is already registered!" };
  }

  const updatedUsers = [...existingUsers, formData];
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return { success: true, message: "Account created successfully!" };
};

export const loginUser = (credentials) => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(u => 
    u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
  );

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true };
  }
  
  const emailExists = storedUsers.some(u => u.email.toLowerCase() === credentials.email.toLowerCase());
  return { 
    success: false, 
    message: emailExists ? "Incorrect password." : "Email not registered." 
  };
};