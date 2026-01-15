// FashionLogic.js
/**
 * FASHION LOGIC MODULE
 * Modul fungsional untuk mengolah data produk fashion dan mengatur perilaku visual.
 * * * * Functions:
 * * 1. filterAndSortProducts(products, searchTerm, sortType)
 * - Fungsi untuk menyaring daftar produk berdasarkan teks dan mengurutkan berdasarkan harga.
 * - Parameters:
 * - products: Array of Objects - Kumpulan data produk (name, priceNum, dll).
 * - searchTerm: String - Input teks dari user untuk pencarian nama produk.
 * - sortType: String - Mode pengurutan ('low' untuk harga terendah, 'high' untuk harga tertinggi).
 * - Logic Variables:
 * - filtered: Array - Hasil antara setelah proses filtering selesai.
 * - Methods Used: 
 * - .filter(): Membuat array baru dengan elemen yang lolos uji kata kunci.
 * - .sort(): Mengatur posisi elemen dalam array berdasarkan komparasi angka priceNum.
 * * 2. getStaggerDelay(index)
 * - Fungsi untuk menghitung jeda waktu animasi agar elemen muncul secara berurutan.
 * - Parameters:
 * - index: Number - Posisi elemen dalam iterasi (biasanya didapat dari .map()).
 * - Return: Object - Mengembalikan inline style object untuk properti 'animationDelay'.
 */

export const filterAndSortProducts = (products, searchTerm, sortType) => {
  let filtered = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortType === 'low') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (sortType === 'high') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  }

  return filtered;
};

// Variabel delay untuk animasi staggered
export const getStaggerDelay = (index) => ({
  animationDelay: `${index * 0.1}s`
});