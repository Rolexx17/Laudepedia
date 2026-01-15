/**
 * LUCKY WHEEL LOGIC MODULE
 * Modul untuk menangani mekanik putaran roda dan penentuan pemenang berdasarkan derajat akhir.
 * * * * Functions:
 * * 1. calculateNewRotation(currentRotation)
 * - Fungsi untuk menghitung akumulasi rotasi agar roda berputar beberapa kali sebelum berhenti.
 * - Parameters: 
 * - currentRotation: Number - Posisi derajat terakhir roda sebelum diputar kembali.
 * - Logic Variables:
 * - extraRotation: Number - Penambahan sudut (Minimal 8 putaran penuh/2880° + derajat acak 0-359°).
 * - Return: Number - Total derajat baru yang harus dicapai oleh animasi CSS.
 * * 2. getWinningPrize(finalRotation, options)
 * - Fungsi untuk memetakan sudut pemberhentian roda ke item hadiah yang sesuai.
 * - Parameters:
 * - finalRotation: Number - Total derajat kumulatif setelah roda berhenti.
 * - options: Array - Daftar hadiah yang tersedia di setiap segmen roda.
 * - Logic Variables:
 * - finalAngle: Number - Sisa bagi (Modulus 360) untuk mendapatkan posisi sudut dalam satu lingkaran.
 * - index: Number - Kalkulasi posisi array (Dihitung berlawanan arah karena putaran roda positif).
 * - Return: Mixed (String/Object) - Item hadiah dari array 'options' berdasarkan indeks yang ditemukan.
 */


/**
 * Menghitung rotasi baru (minimal 8 putaran + random)
 */
export const calculateNewRotation = (currentRotation) => {
  const extraRotation = (360 * 8) + Math.floor(Math.random() * 360);
  return currentRotation + extraRotation;
};

/**
 * Menentukan hadiah berdasarkan sudut akhir
 */
export const getWinningPrize = (finalRotation, options) => {
  const finalAngle = finalRotation % 360;
  // Karena roda berputar positif, indeks dihitung berlawanan arah
  const index = Math.floor(((360 - finalAngle) % 360) / 18);
  return options[index];
};