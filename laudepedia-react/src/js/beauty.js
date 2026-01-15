/**
 * PRODUCT UTILS & ANIMATION ENGINE
 * Kumpulan fungsi pembantu untuk memproses data produk dan mengatur visual antarmuka.
 * * * * * Functions:
 * * 1. getProcessedBeauty(products, searchTerm, sortType)
 * - Fungsi untuk menyaring dan mengurutkan daftar produk berdasarkan input pengguna.
 * - Parameters:
 * - products: Array of Objects - Daftar mentah produk dari database/state.
 * - searchTerm: String - Kata kunci pencarian dari input user.
 * - sortType: String - Kategori pengurutan ('low' untuk termurah, 'high' untuk termahal).
 * - Variables:
 * - filtered: Array - Penampung sementara hasil filter sebelum diurutkan.
 * - Logic:
 * - .filter(): Mencocokkan nama produk dengan searchTerm (case-insensitive).
 * - .sort(): Mengatur ulang urutan array berdasarkan properti 'priceNum'.
 * - Return: Array - Daftar produk yang sudah bersih dan terurut.
 * * * 2. animationSettings(index)
 * - Fungsi untuk menghasilkan efek "Staggered Animation" (animasi beruntun).
 * - Parameters:
 * - index: Number - Urutan elemen dalam list (biasanya dari fungsi .map()).
 * - Variables & Logic:
 * - transitionDelay: String - Mengalikan index dengan 80ms untuk menciptakan jeda unik tiap kartu.
 * - Return: Object - Properti CSS inline yang akan diterapkan pada elemen JSX.
 */

export const getProcessedBeauty = (products, searchTerm, sortType) => {
  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortType === 'low') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (sortType === 'high') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  }
  return filtered;
};

export const animationSettings = (index) => ({
  transitionDelay: `${index * 80}ms`,
});