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