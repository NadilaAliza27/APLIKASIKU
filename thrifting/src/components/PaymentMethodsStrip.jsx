import { QrCode, CreditCard, Wallet, Banknote, ShieldCheck } from 'lucide-react';

export default function PaymentMethodsStrip() {
  const methods = [
    {
      category: 'QRIS & E-Wallet',
      icon: <QrCode size={20} />,
      items: ['QRIS All Payment', 'GoPay', 'OVO', 'DANA', 'ShopeePay'],
      desc: 'Scan instan dari semua aplikasi bank dan dompet digital'
    },
    {
      category: 'Transfer Bank (VA)',
      icon: <CreditCard size={20} />,
      items: ['BCA', 'Bank Mandiri', 'BRI', 'BNI', 'BSI'],
      desc: 'Transfer realtime via Mobile Banking & ATM'
    },
    {
      category: 'Bayar di Kios Fisik',
      icon: <Banknote size={20} />,
      items: ['Tunai (Cash)', 'Debit EDC', 'QRIS Kasir'],
      desc: 'Bayar langsung saat hunting di Pasar Senen & Gedebage'
    },
    {
      category: 'Garansi Transaksi',
      icon: <ShieldCheck size={20} />,
      items: ['Verifikasi Seller', 'Cek Kondisi PxL', 'Konfirmasi WA'],
      desc: 'Chat langsung penjual untuk konfirmasi barang'
    }
  ];

  return (
    <section className="payment-methods-section">
      <div className="payment-container">
        <div className="payment-header-row">
          <div>
            <span className="eyebrow-modern">TRANSAKSI FLEKSIBEL & AMAN</span>
            <h2 className="title-modern">Metode Pembayaran yang Didukung</h2>
          </div>
          <p className="subtitle-modern">
            Dukung kemudahan belanja thrift online maupun pembayaran langsung di kasir toko fisik.
          </p>
        </div>

        <div className="payment-grid">
          {methods.map((method, idx) => (
            <div key={idx} className="payment-card">
              <div className="payment-card-top">
                <div className="payment-icon-box">{method.icon}</div>
                <h3 className="payment-cat-name">{method.category}</h3>
              </div>
              <div className="payment-tags-list">
                {method.items.map((item, i) => (
                  <span key={i} className="payment-pill-badge">{item}</span>
                ))}
              </div>
              <p className="payment-desc-text">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
