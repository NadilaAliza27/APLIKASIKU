// Dataset Demo Sesi Thrifting Live
export const initialLiveSessions = [
  {
    id: 'live-1',
    status: 'live', // 'live' | 'upcoming'
    title: 'Drop Carhartt & Workwear 90s — Koleksi Pasar Senen',
    shop: 'Arsip Lawas',
    location: 'Pasar Senen, Jakarta',
    viewers: 284,
    thumbnail: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    scheduledTime: 'Sedang Berlangsung',
    featuredProductId: 1,
    demoComments: [
      { id: 1, user: 'dimas_vintage', text: 'Min, spill zipper jaket Carhartt no 1 dong!', time: '1 menit lalu' },
      { id: 2, user: 'anita_preloved', text: 'Kondisi kerahnya masih aman gak min?', time: '45 dtk lalu' },
      { id: 3, user: 'reza.thrift', text: 'Fix no 1 ya min kalau masih ada!', time: '30 dtk lalu' },
      { id: 4, user: 'citra_bandung', text: 'Bisa kirim ke Bandung pakai JNE hari ini?', time: '12 dtk lalu' },
      { id: 5, user: 'bagus_90s', text: 'Ukurannya PxL berapa tadi gan?', time: 'Baru saja' }
    ]
  },
  {
    id: 'live-2',
    status: 'live',
    title: 'Clearance Denim Levi\'s 501 & Celana Chino Impor',
    shop: 'Kembali Studio',
    location: 'Dipatiukur, Bandung',
    viewers: 196,
    thumbnail: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=700&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    scheduledTime: 'Sedang Berlangsung',
    featuredProductId: 3,
    demoComments: [
      { id: 1, user: 'farhan_jkt', text: 'Waist size 32 ada model washed apa aja kak?', time: '2 menit lalu' },
      { id: 2, user: 'denimhead_id', text: 'Button fly-nya masih original USA?', time: '1 menit lalu' },
      { id: 3, user: 'sinta_w', text: 'Keren banget potongan straight-nya', time: '20 dtk lalu' }
    ]
  },
  {
    id: 'live-3',
    status: 'upcoming',
    title: 'Vintage Band Tee Tour 90s & Oversized Knitwear',
    shop: 'Second Sunday',
    location: 'Pasar Santa, Jakarta Selatan',
    viewers: 0,
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    scheduledTime: 'Malam Ini, 19.30 WIB',
    featuredProductId: 4,
    reminded: false
  },
  {
    id: 'live-4',
    status: 'upcoming',
    title: 'Arsip Tas Kulit Asli & Boots Vintage Heritage Solo',
    shop: 'Galeri Barang Antik',
    location: 'Triwindu, Solo',
    viewers: 0,
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    scheduledTime: 'Besok, 16.00 WIB',
    featuredProductId: 6,
    reminded: false
  }
];
