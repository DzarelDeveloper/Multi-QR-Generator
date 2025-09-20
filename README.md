# Multi QR - Generator & Reader QR Code

Aplikasi web untuk membuat dan membaca QR code dengan berbagai fitur.

## ✨ Fitur

### Generator QR Code
- **Multi Format**
  - URL/Link Website
  - Teks Biasa
  - Konfigurasi WiFi
  - Kontak (vCard)
  - Email
  - Nomor Telepon

- **Kustomisasi**
  - Ukuran QR Code: 256x256 pixel
  - Koreksi Error Level: High (30%)
  - Format Output: PNG

- **Hasil**
  - Preview langsung
  - Unduh sebagai gambar PNG
  - Buat QR baru dengan mudah

### Reader QR Code
- **Multi Input**
  - Kamera (depan/belakang)
  - Upload file gambar
  - Drag & drop file (desktop)

- **Fitur Kamera**
  - Deteksi kamera belakang ( Hp )
  - Preview real-time
  - Frame rate: 10 FPS

- **Smart Detection**
  - Link: buka otomatis di tab baru
  - WiFi: salin konfigurasi
  - Telepon: buka di WhatsApp
  - Email: buka aplikasi email
  - Teks: salin ke clipboard

## 🚀 Teknologi
- HTML5
- Tailwind CSS
- JavaScript (Vanilla)
- QRCode.js
- HTML5-QRCode

## 💻 Penggunaan

### Membuat QR Code
1. Pilih tab "Generator"
2. Pilih tipe QR code
3. Isi informasi yang diperlukan
4. Klik "Generate QR"
5. Preview QR code akan muncul
6. Klik "Download" untuk menyimpan
7. Klik "Buat QR Baru" untuk reset

### Membaca QR Code
1. Pilih tab "Reader"
2. Pilih metode input:
   - Klik "Buka Kamera" untuk scan langsung
   - Upload file gambar
   - Drag & drop file (desktop)
3. Hasil scan akan muncul otomatis
4. Klik tombol aksi sesuai jenis QR
5. Klik "Salin" untuk copy hasil

## 📱 Responsive Design
- Antarmuka responsif untuk desktop dan mobile
- Optimasi khusus untuk tiap platform
- Drag & drop hanya di desktop
- Tombol upload khusus mobile

## 🎨 UI/UX
- Dark mode
- Animasi halus
- Loading state
- Feedback visual
- Error handling
- Tombol aksi kontekstual

Aplikasi web untuk membuat dan membaca QR Code dengan berbagai jenis data. Dirancang dengan pendekatan mobile-first dan tema dark-mode untuk penggunaan yang nyaman di berbagai perangkat.

## ✨ Fitur Utama

### 1. Generator QR Code Multi-Tipe
- Mendukung berbagai jenis QR Code:
  - 🔗 URL
  - 📝 Teks
  - 📶 WiFi
  - 👤 Kontak
  - 📧 Email
  - 📞 Telepon
- Input field dinamis sesuai jenis QR yang dipilih
- Preview QR Code secara real-time
- Tombol download hasil generate

### 2. Reader QR Code
- 📸 Scan menggunakan kamera perangkat
- 🖼️ Upload gambar QR Code
- 📋 Salin hasil scan ke clipboard
- Tampilan hasil dalam format yang mudah dibaca

### 3. Fitur UI/UX
- 🌙 Tema dark-mode eksklusif
- 📱 Desain mobile-first yang responsif
- ✨ Animasi halus pada interaksi
- 💫 Transisi smooth antar komponen
- 🎯 Input field yang intuitif

## 🚀 Cara Penggunaan

### Generator QR Code
1. Pilih jenis QR Code dari dropdown
2. Isi informasi sesuai jenis yang dipilih:
   - **URL**: Masukkan alamat website
   - **Teks**: Ketik teks bebas
   - **WiFi**: Isi SSID, password, dan tipe keamanan
   - **Kontak**: Lengkapi data kontak (nama, telepon, email, alamat)
   - **Email**: Masukkan alamat email, subjek, dan isi pesan
   - **Telepon**: Input nomor telepon
3. Klik "Generate QR Code"
4. Download hasil dengan klik tombol "Download"

### Reader QR Code
1. Pilih tab "Reader"
2. Gunakan salah satu metode:
   - Klik "Buka Kamera" untuk scan langsung
   - Klik "Upload Gambar QR" untuk scan dari file
3. Hasil scan akan muncul otomatis
4. Gunakan tombol "Salin" untuk copy hasil ke clipboard

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur dasar aplikasi
- **Tailwind CSS** - Framework CSS untuk styling
- **JavaScript** - Logika aplikasi dan interaktivitas
- **QRCode.js** - Generasi QR Code
- **html5-qrcode** - Pembacaan QR Code
- **LocalStorage** - Penyimpanan riwayat lokal

## 📁 Struktur Folder

```
multi-qr/
├── index.html      # File utama aplikasi
├── style.css       # Custom styling & animasi
├── script.js       # Logika JavaScript
└── README.md       # Dokumentasi
```

## 💡 Tips Penggunaan

1. **Offline Mode**
   - Aplikasi berfungsi penuh tanpa internet
   - Semua proses dilakukan di browser lokal
   - Hasil generate & scan tersimpan di perangkat

2. **Dark Theme**
   - Dirancang khusus untuk mode gelap
   - Kontras warna optimal untuk mata
   - Cocok untuk penggunaan malam hari

3. **Mobile-First**
   - Optimal di smartphone & tablet
   - Tetap responsif di desktop
   - Kontrol touch-friendly

4. **Input Dinamis**
   - Field menyesuaikan jenis QR
   - Validasi input otomatis
   - Placeholder informatif

## 📝 Catatan Penting

- Izinkan akses kamera untuk fitur scan langsung
- Pastikan gambar QR yang di-upload jelas
- Hasil generate bisa langsung didownload
- Riwayat tersimpan di browser (optional)

## 🔒 Privasi & Keamanan

- 100% offline-first
- Tidak ada data yang dikirim ke server
- Proses sepenuhnya di perangkat lokal
- Tidak memerlukan internet untuk fungsi utama

---

Dibuat dengan ❤️ oleh Dzarel
