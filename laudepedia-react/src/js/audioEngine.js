// AudioEngine.js
/**
 * AUDIO ENGINE MODULE
 * Modul untuk menghasilkan efek suara sintetis tanpa menggunakan file audio eksternal.
 * Menggunakan Web Audio API untuk sintesis suara secara real-time.
 * * * * Functions:
 * * 1. playTickSound()
 * - Fungsi untuk menghasilkan suara 'klik' atau 'tick' singkat (low-frequency pulse).
 * * * Variables & Web Audio Components:
 * - audioCtx: AudioContext - Objek utama untuk mengelola grafik audio (Main Engine).
 * - oscillator: OscillatorNode - Sumber suara yang menghasilkan gelombang periodik.
 * - gainNode: GainNode - Kontrol volume/amplitudo suara (Volume Controller).
 * * * * Logic & Parameters:
 * - oscillator.type: String - Jenis gelombang ('sine' menghasilkan suara yang lembut/murni).
 * - frequency: Number - Menentukan tinggi rendahnya nada (Diatur dari 150Hz turun ke 0.01Hz).
 * - exponentialRampToValueAtTime: Method - Membuat transisi nilai secara eksponensial (Efek fade-out/peluruhan).
 * - audioCtx.destination: Output - Menghubungkan node audio ke speaker perangkat pengguna.
 */
export const playTickSound = () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine'; 
  oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
};