/**
 * CART.js
 * Modul untuk mengelola penyimpanan produk ke dalam keranjang belanja.
 * Menggunakan LocalStorage untuk menjaga data tetap tersimpan meskipun halaman dimuat ulang.
 * * * * Functions:
 * * 1. addToCartLogic(product, quantity)
 * - Fungsi untuk menambah produk baru atau memperbarui jumlah (quantity) produk yang sudah ada.
 * - Parameters:
 * - product: Object - Data lengkap produk (id, name, price, dll).
 * - quantity: Number/String - Jumlah produk yang ingin ditambahkan.
 * * * Variables & Logic:
 * - existingCart: Array - Mengambil data keranjang saat ini dari LocalStorage (atau array kosong []).
 * - existingItemIndex: Number - Mencari posisi produk dalam array berdasarkan ID. Mengembalikan -1 jika tidak ditemukan.
 * - parseInt(quantity): Function - Memastikan input jumlah dikonversi menjadi tipe data Integer sebelum dijumlahkan.
 * * * Data Persistence:
 * - JSON.parse(): Mengubah data string dari storage menjadi array objek JavaScript.
 * - JSON.stringify(): Mengubah array objek menjadi string agar dapat disimpan di LocalStorage.
 */

export const addToCartLogic = (product, quantity) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        existingCart[existingItemIndex].qty += parseInt(quantity);
    } else {
        existingCart.push({ ...product, qty: parseInt(quantity) });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
};