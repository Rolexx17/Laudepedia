import { useState } from 'react';

/**
 * TECH LOGIC HOOK (Custom Hook)
 * Hook khusus untuk mengelola logika bisnis pada halaman kategori Teknologi.
 * Menangani pemfilteran kategori, pencarian produk, dan pengurutan harga.
 * * * State:
 * - searchTerm: String - Menyimpan kata kunci pencarian dari input user.
 * - sortType: String - Menyimpan tipe pengurutan ('default', 'low', 'high').
 * * * Functions / Logic:
 * - techProducts: Filter - Mengambil hanya produk dengan kategori 'tech' dari data master.
 * - filteredSearch: Filter - Menyaring produk berdasarkan nama yang sesuai dengan searchTerm.
 * - getSortedProducts: Function(data) - Mengurutkan array produk berdasarkan harga (Termurah/Termahal).
 * - displayProducts: Array - Hasil akhir produk yang sudah difilter dan diurutkan untuk ditampilkan.
 * - trendingTech & recommendations: Array - Pemotongan (slicing) data untuk section promosi khusus.
 */

export const useTechLogic = (products) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default');

  const techProducts = products.filter(item => item.category === 'tech');

  const filteredSearch = techProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortedProducts = (data) => {
    let sortedData = [...data];
    if (sortType === 'low') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high') {
      sortedData.sort((a, b) => b.price - a.price);
    }
    return sortedData;
  };

  const displayProducts = getSortedProducts(filteredSearch);
  const trendingTech = techProducts.slice(0, 6);
  const recommendations = techProducts.slice(6, 14);

  return {
    searchTerm,
    setSearchTerm,
    sortType,
    setSortType,
    displayProducts,
    trendingTech,
    recommendations
  };
};