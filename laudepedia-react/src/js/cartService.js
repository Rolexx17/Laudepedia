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