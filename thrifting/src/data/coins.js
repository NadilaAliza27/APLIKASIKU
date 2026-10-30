// Dataset Demo Loyalty Koin Thrifting
export const initialCoinState = {
  balance: 25000,
  history: [
    {
      id: 'coin-1',
      title: 'Bonus Penyelesaian Pesanan #TRF-202610-004',
      date: '16 Okt 2026',
      amount: 5000,
      type: 'earned' // 'earned' | 'redeemed'
    },
    {
      id: 'coin-2',
      title: 'Ulasan Produk dengan Foto Pesanan Selesai',
      date: '16 Okt 2026',
      amount: 2500,
      type: 'earned'
    },
    {
      id: 'coin-3',
      title: 'Tukar Voucher Potongan Rp 10.000',
      date: '15 Okt 2026',
      amount: -10000,
      type: 'redeemed'
    },
    {
      id: 'coin-4',
      title: 'Bonus Sambutan Bergabung di Thrifting',
      date: '10 Okt 2026',
      amount: 27500,
      type: 'earned'
    }
  ],
  vouchers: [
    {
      id: 'vch-1',
      code: 'THRIFT10K',
      title: 'Potongan Belanja Rp 10.000',
      cost: 10000,
      minSpend: 50000,
      expiry: '31 Des 2026'
    },
    {
      id: 'vch-2',
      code: 'ONGKIR15K',
      title: 'Diskon Ongkir Seluruh Indonesia Rp 15.000',
      cost: 15000,
      minSpend: 80000,
      expiry: '31 Des 2026'
    },
    {
      id: 'vch-3',
      code: 'THRIFT25K',
      title: 'Potongan Belanja Spesial Rp 25.000',
      cost: 25000,
      minSpend: 150000,
      expiry: '31 Des 2026'
    }
  ]
};
