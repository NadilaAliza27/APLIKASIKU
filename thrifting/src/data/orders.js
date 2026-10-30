// Dataset Demo Pesanan Pengguna Thrifting
export const initialOrders = [
  {
    id: 'TRF-202610-001',
    date: '20 Okt 2026, 14:30 WIB',
    shop: 'Arsip Lawas',
    shopLocation: 'Pasar Senen, Jakarta Pusat',
    status: 'unpaid', // 'unpaid' | 'packing' | 'shipped' | 'completed' | 'cancelled'
    statusLabel: 'Belum Dibayar',
    product: {
      id: 1,
      name: 'Vintage Carhartt Detroit Jacket 90s',
      category: 'Outerwear',
      price: 340000,
      size: 'L (P 68 cm x L 58 cm)',
      condition: 'Sangat Baik (9/10)',
      image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=400&q=80'
    },
    shippingMethod: 'JNE Reguler (2-3 Hari)',
    shippingCost: 18000,
    totalAmount: 358000,
    paymentMethod: 'QRIS (Gopay/OVO/Dana/BCA)',
    shippingAddress: {
      recipient: 'Raditya Pratama',
      phone: '0812-3456-7890',
      address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, 12190'
    },
    trackingNumber: null,
    timeline: [
      { time: '20 Okt 2026, 14:30 WIB', text: 'Pesanan dibuat. Menunggu konfirmasi pembayaran demo.' }
    ]
  },
  {
    id: 'TRF-202610-002',
    date: '19 Okt 2026, 10:15 WIB',
    shop: 'Lemari Kedua',
    shopLocation: 'Gedebage, Bandung',
    status: 'packing',
    statusLabel: 'Sedang Dikemas',
    product: {
      id: 2,
      name: 'Kemeja Stripe Cuban Collar Vintage',
      category: 'Atasan',
      price: 85000,
      size: 'M to L (P 70 cm x L 54 cm)',
      condition: 'Sangat Baik (9.5/10)',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&q=80'
    },
    shippingMethod: 'SiCepat BEST (1 Hari)',
    shippingCost: 15000,
    totalAmount: 100000,
    paymentMethod: 'Transfer Bank BCA',
    shippingAddress: {
      recipient: 'Raditya Pratama',
      phone: '0812-3456-7890',
      address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, 12190'
    },
    trackingNumber: null,
    timeline: [
      { time: '19 Okt 2026, 10:15 WIB', text: 'Pesanan dibuat.' },
      { time: '19 Okt 2026, 10:20 WIB', text: 'Pembayaran terkonfirmasi. Seller sedang memeriksa kondisi fisik dan mengemas barang.' }
    ]
  },
  {
    id: 'TRF-202610-003',
    date: '17 Okt 2026, 16:40 WIB',
    shop: 'Kembali Studio',
    shopLocation: 'Dipatiukur, Bandung',
    status: 'shipped',
    statusLabel: 'Dalam Pengiriman',
    product: {
      id: 3,
      name: "Levi's 501 Original Straight Cut 90s",
      category: 'Celana',
      price: 265000,
      size: 'Size 32 (LP 83 cm, P 102 cm)',
      condition: 'Kondisi Baik (8.5/10)',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80'
    },
    shippingMethod: 'J&T Express (2 Hari)',
    shippingCost: 20000,
    totalAmount: 285000,
    paymentMethod: 'QRIS',
    shippingAddress: {
      recipient: 'Raditya Pratama',
      phone: '0812-3456-7890',
      address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, 12190'
    },
    trackingNumber: 'JT982310842ID',
    timeline: [
      { time: '17 Okt 2026, 16:40 WIB', text: 'Pesanan dibuat & dibayar.' },
      { time: '18 Okt 2026, 09:10 WIB', text: 'Barang telah diserahkan seller ke kurir J&T Bandung.' },
      { time: '19 Okt 2026, 08:30 WIB', text: 'Paket telah tiba di DC Jakarta Selatan. Sedang dibawa kurir ke alamat tujuan.' }
    ]
  },
  {
    id: 'TRF-202610-004',
    date: '14 Okt 2026, 11:20 WIB',
    shop: 'Ruang Ulang',
    shopLocation: 'Malioboro, Yogyakarta',
    status: 'completed',
    statusLabel: 'Selesai',
    product: {
      id: 5,
      name: 'Sweater Knit Cable Earthy Sage',
      category: 'Outerwear',
      price: 115000,
      size: 'Fit to L (P 66 cm x L 55 cm)',
      condition: 'Sangat Baik (9/10)',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80'
    },
    shippingMethod: 'JNE Reguler',
    shippingCost: 18000,
    totalAmount: 133000,
    paymentMethod: 'Transfer Mandiri',
    shippingAddress: {
      recipient: 'Raditya Pratama',
      phone: '0812-3456-7890',
      address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, 12190'
    },
    trackingNumber: 'JNE0192830192',
    review: {
      rating: 5,
      conditionMatch: true,
      comment: 'Barangnya beneran wangi dan bersih! Rajutannya rapat, warna sage-nya persis di foto. Seller responsif banget.',
      reviewedAt: '16 Okt 2026'
    },
    timeline: [
      { time: '14 Okt 2026, 11:20 WIB', text: 'Pesanan dibuat & dibayar.' },
      { time: '15 Okt 2026, 14:00 WIB', text: 'Barang dikirim dari Yogyakarta.' },
      { time: '16 Okt 2026, 13:15 WIB', text: 'Paket diterima oleh pembeli. Transaksi selesai.' }
    ]
  }
];
