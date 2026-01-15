/**
 * cartService.js
 * Modul untuk menangani kalkulasi logistik dan persistensi data transaksi pengguna.
 * * * * Functions:
 * * 1. calculateShipping(courier)
 * - Fungsi untuk mengambil biaya pengiriman berdasarkan penyedia kurir.
 * - Parameters:
 * - courier: String - Kunci kurir (misal: 'jne', 'jnt').
 * - Variables:
 * - rates: Object - Mapping pasangan key-value yang menyimpan tarif statis.
 * - Return: Number - Nilai biaya pengiriman. Mengembalikan 0 jika kurir tidak ditemukan.
 * * 2. saveTransactionToHistory(email, transactionData)
 * - Fungsi untuk mencatat data pembelian ke dalam penyimpanan permanen.
 * - Parameters:
 * - email: String - Identifier unik user untuk menentukan folder history yang tepat.
 * - transactionData: Object - Detail transaksi (produk, total, tanggal, dll).
 * - Variables:
 * - historyKey: String - Kunci dinamis LocalStorage (format: history_user@mail.com).
 * - existingHistory: Array - Data transaksi lama yang sudah tersimpan.
 * - updatedHistory: Array - Riwayat baru (Data baru diletakkan di awal/Unshift).
 * * 3. updateUserBalance(email, newBalance)
 * - Fungsi untuk memperbarui saldo akun pengguna.
 * - Parameters:
 * - email: String - Identifier unik user.
 * - newBalance: Number - Nilai saldo terbaru setelah dikurangi total belanja.
 */




/**
 * Menghitung biaya pengiriman berdasarkan kurir
 */
export const calculateShipping = (courier) => {
  const rates = {
    jne: 15000,
    jnt: 18000,
    sicepat: 20000,
    instant: 50000
  };
  return rates[courier] || 0;
};

/**
 * Menyimpan transaksi baru ke riwayat pengguna
 */
export const saveTransactionToHistory = (email, transactionData) => {
  const historyKey = `history_${email}`;
  const existingHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
  const updatedHistory = [transactionData, ...existingHistory];
  localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
};

/**
 * Mengupdate saldo pengguna di localStorage
 */
export const updateUserBalance = (email, newBalance) => {
  localStorage.setItem(`balance_${email}`, newBalance);
};