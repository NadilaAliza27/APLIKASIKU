# Thrifting — Marketplace Fashion Pre-Loved & Vintage Indonesia

Marketplace fashion pre-loved Indonesia yang menghubungkan pembeli dengan toko thrift fisik dan seller individu. Dirancang dengan identitas startup mandiri bergaya **modern minimalis dengan sentuhan editorial fashion**.

---

## ⚡ Cara Menjalankan Website

1. Buka folder `thrifting` di terminal (PowerShell atau Command Prompt):
   ```bash
   cd thrifting
   ```

2. Jalankan server pengembang lokal:
   ```bash
   npm run dev
   ```

3. Buka alamat browser Anda:
   👉 **`http://localhost:5173`**

4. Untuk build produksi:
   ```bash
   npm run build
   ```
   *(Hasil build akan tersimpan di folder `dist/` dan siap dideploy ke Vercel, Netlify, atau web server lainnya)*

---

## 🎨 Arah Visual & Desain Sistem

- **Filosofi:** Bersih, tenang, premium, berorientasi produk, dengan ruang kosong yang cukup dan sudut komponen sedikit membulat (4–8px), bukan membulat berlebihan.
- **Palet Warna Resmi:**
  - `Warm Ivory (#F8F7F2)`: Latar belakang aplikasi yang nyaman di mata.
  - `Putih (#FFFFFF)`: Permukaan kartu produk, modal, dan sheet.
  - `Deep Forest Green (#293D30)`: Warna aksi utama, tombol utama, navigasi aktif.
  - `Muted Sage (#DCE3D1)`: Latar belakang badge sekunder dan aksen tenang.
  - `Lime Accent (#D4E06D)`: Aksen sorotan terarah (badge live, status penting).
  - `Teks Utama (#252922)`: Kontras tajam dan mudah dibaca.
  - `Teks Sekunder (#777B71)`: Metadata, spesifikasi ukuran, dan label sekunder.
  - `Border Halus (#E7E5DC)`: Garis pemisah yang rapi.
- **Tipografi:**
  - `DM Sans`: Sans-serif modern dan bersih untuk navigasi, tombol, harga, dan metadata.
  - `Playfair Display`: Serif elegan terbatas untuk heading editorial berkarakter.

---

## 🧭 Struktur 4 Navigasi Utama

Aplikasi dirancang sederhana dengan 4 navigasi utama (Header di Desktop, Bottom Nav di Mobile):

1. **Beranda:**
   - **Hero Editorial:** Sapaan berkarakter, pengantar platform, dan tombol langsung ke katalog.
   - **Katalog & Filter Interaktif:** Filter kategori (*Atasan, Outerwear, Celana, Aksesori*), filter kondisi barang (*Seperti Baru, Sangat Baik, Baik, Vintage Berkarakter*), filter sentra pasar/kota, dan pengurutan harga (*Rendah ke Tinggi, Tinggi ke Rendah*).
   - **Thrifting Live Teaser:** Cuplikan sesi live interaktif yang sedang berlangsung.
   - **Penemuan Toko Fisik:** Direktori sentra thrift legendaris (Pasar Senen, Gedebage, Malioboro, Triwindu, Tunjungan).
2. **Live (Thrifting Live):**
   - Subtab "Sedang Live" dan "Akan Datang".
   - Ruang Live Streaming Interaktif (Live Room) dengan simulasi video, pinned produk yang bisa langsung dibeli, obrolan live chat real-time, tombol like, dan daftar produk live.
   - Pengingat sesi live terjadwal.
3. **Pesanan (Pesanan Saya):**
   - Filter status tab: *Semua, Belum Dibayar, Dikemas, Dikirim, Selesai*.
   - Timeline pelacakan kurir, nomor resi demo, dan alamat pengiriman.
   - Aksi interaktif: Bayar pesanan, Konfirmasi terima barang, dan Beri ulasan bintang 1–5 dengan bonus koin loyalty.
4. **Profil:**
   - **Koin Thrifting:** Saldo koin loyalty, penukaran voucher potongan belanja, dan riwayat mutasi koin.
   - **Daftar Favorit:** Produk yang disimpan oleh pengguna dengan aksi hapus dan checkout cepat.
   - **Alamat Tersimpan:** Alamat pengiriman demo terverifikasi.
   - **Peralihan Mode Seller:** Tombol untuk membuka Dashboard Seller.

---

## 🏬 Dashboard Seller Terpadu

Pengguna dapat berganti peran menjadi penjual thrift melalui tombol **"Mode Seller"**:
- **Ringkasan Metrik Toko:** Pendapatan kotor, produk aktif, pesanan perlu dikirim, rating toko.
- **Kelola Produk:** Tambah produk baru dengan foto, kategori, kondisi, harga, ukuran P x L, dan lokasi toko fisik (langsung terhubung ke katalog beranda).
- **Pesanan Masuk & Pengiriman:** Seller dapat memproses pesanan dengan status "Dikemas" dan menekan tombol **"Kirim Barang"** untuk menghasilkan nomor resi otomatis (misal: `TRF83921048ID`), mengubah status pesanan pembeli menjadi **"Dikirim"**.
- **Informasi Kios Fisik:** Alamat blok toko fisik untuk pembeli yang ingin datang langsung.

---

## 🔄 Alur Demo Terpadu (State Loop)

Sistem menggunakan `localStorage` untuk mensimulasikan alur marketplace secara menyeluruh:
1. **Pembeli memilih produk** di Beranda atau Live Room -> Buka Checkout Modal.
2. **Pilih kurir & metode pembayaran**, aktifkan diskon Koin Thrifting -> Klik "Buat Pesanan".
3. Masuk ke tab **Pesanan** (status: *Belum Dibayar*) -> Klik "Bayar Pesanan" (status berubah jadi *Dikemas*).
4. Buka **Mode Seller** -> Cek "Pesanan Masuk" -> Klik "Kirim Barang" (resi terbit, status jadi *Dikirim*).
5. Kembali ke Profil/Pesanan Pembeli -> Klik "Konfirmasi Terima Barang" (status jadi *Selesai*, saldo koin bertambah **+5.000 Koin**).
6. Klik **"Beri Ulasan"** -> Berikan bintang dan review (dapat bonus tambahan **+2.500 Koin**).
7. Saldo koin dapat ditukarkan voucher di Profil atau digunakan sebagai potongan di checkout berikutnya!

---

## 🛠️ Arsitektur Kode

```
thrifting/
├── index.html                   # HTML entry point dengan meta tag, judul, dan favicon
├── vite.config.js               # Konfigurasi bundler Vite + React
├── package.json                 # Dependensi (React 18/19, Lucide React icons, Vite)
├── src/
│   ├── main.jsx                 # Entry point React
│   ├── App.jsx                  # Master Coordinator (State loop, Modals, Navigasi)
│   ├── data/
│   │   ├── products.js          # Dataset awal produk terkurasi
│   │   ├── liveSessions.js      # Dataset sesi live streaming & chat
│   │   ├── orders.js            # Dataset pesanan multi-status & timeline
│   │   └── coins.js             # Dataset koin loyalty & voucher
│   ├── components/
│   │   ├── Header.jsx           # Navigasi desktop, search bar, mode switcher
│   │   ├── MobileBottomNav.jsx  # Navigasi bawah mobile
│   │   ├── Hero.jsx             # Sapaan editorial & pengantar
│   │   ├── ProductCard.jsx      # Kartu produk proporsional & tag kondisi
│   │   ├── ProductDetailModal.jsx # Modal spesifikasi ukuran & alamat kios
│   │   ├── CheckoutModal.jsx    # Checkout flow, kurir, koin discount
│   │   ├── LiveView.jsx         # Halaman Thrifting Live & jadwal
│   │   ├── LiveRoomModal.jsx    # Simulasi interaktif live streaming room
│   │   ├── OrdersView.jsx       # Halaman Pesanan Saya & filter status
│   │   ├── OrderDetailModal.jsx # Detail invoice & timeline pelacakan
│   │   ├── ReviewModal.jsx      # Dialog ulasan & pemberian koin reward
│   │   ├── ProfileView.jsx      # Profil pengguna, koin loyalty & favorit
│   │   ├── SellerDashboard.jsx  # Manajemen produk, kios & pesanan seller
│   │   ├── ChatModal.jsx        # Percakapan simulasi dengan seller
│   │   ├── PhysicalStoreSection.jsx # Direktori sentra pasar fisik Indonesia
│   │   ├── EmptyState.jsx       # Tampilan ramah bila pencarian nihil
│   │   ├── NotificationToast.jsx# Toast notifikasi aktivitas
│   │   └── Footer.jsx           # Footer editorial bersih
│   └── styles/
│       ├── global.css           # Desain tokens, font DM Sans, palet warna
│       └── app.css              # Seluruh style responsif desktop & mobile
```
