import { Search, MessageCircle, Store } from 'lucide-react';

export default function TrustStrip() {
  const steps = [
    {
      num: '1',
      icon: <Search size={20} />,
      title: 'Pilih & Cek Detail Online',
      desc: 'Lihat foto asli, ukuran panjang x lebar, bahan, dan kondisi minus secara transparan.'
    },
    {
      num: '2',
      icon: <MessageCircle size={20} />,
      title: 'Tanya Ketersediaan ke Seller',
      desc: 'Hubungi toko via WhatsApp dalam 1 klik untuk konfirmasi barang dan negosiasi.'
    },
    {
      num: '3',
      icon: <Store size={20} />,
      title: 'Kunjungi Toko atau Kirim Langsung',
      desc: 'Mampir ke kios fisik mereka atau minta kirim ke rumah Anda dengan aman.'
    }
  ];

  return (
    <section className="clean-guide-section" id="cara-kerja">
      <div className="guide-container">
        <div className="section-title-center">
          <span className="eyebrow-modern">CARA KERJA</span>
          <h2 className="title-modern">Cara Belanja di Thrifting</h2>
          <p className="subtitle-modern">
            3 langkah mudah belanja barang pre-loved idaman tanpa rasa ragu.
          </p>
        </div>

        <div className="guide-steps-grid">
          {steps.map((item, idx) => (
            <div key={idx} className="guide-step-card">
              <div className="step-badge-number">{item.num}</div>
              <div className="step-icon-box">{item.icon}</div>
              <h3 className="step-card-title">{item.title}</h3>
              <p className="step-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
