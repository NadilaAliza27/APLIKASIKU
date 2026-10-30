import { ArrowUpRight, Sparkles, Store, CheckCircle2 } from 'lucide-react';

export default function SellerBanner({ onOpenSellerModal }) {
  return (
    <section className="modern-seller-section" id="seller">
      <div className="seller-banner-card">
        <div className="seller-banner-content">
          <div className="seller-pill-badge">
            <Sparkles size={13} />
            <span>KEMITRAAN TOKO THRIFT</span>
          </div>

          <h2 className="seller-banner-heading">
            Punya Toko Thrift atau Koleksi Pre-Loved Berkualitas?
          </h2>

          <p className="seller-banner-sub">
            Bergabunglah bersama puluhan toko thrift di Indonesia. Tampilkan katalog Anda secara online
            dan dapatkan kunjungan lebih banyak ke kios fisik Anda.
          </p>

          <div className="seller-benefits-list">
            <div className="benefit-item">
              <CheckCircle2 size={16} className="benefit-icon" />
              <span>Gratis Pendaftaran Tahap Awal</span>
            </div>
            <div className="benefit-item">
              <CheckCircle2 size={16} className="benefit-icon" />
              <span>Terhubung Langsung via WhatsApp</span>
            </div>
            <div className="benefit-item">
              <CheckCircle2 size={16} className="benefit-icon" />
              <span>Panduan Alamat Toko Fisik</span>
            </div>
          </div>
        </div>

        <div className="seller-banner-action-col">
          <button
            type="button"
            className="btn-seller-modern"
            onClick={onOpenSellerModal}
          >
            <Store size={18} />
            <span>Daftarkan Toko Sekarang</span>
            <ArrowUpRight size={18} />
          </button>
          <small className="seller-note-text">
            Proses kurasi cepat & tanpa biaya pendaftaran
          </small>
        </div>
      </div>
    </section>
  );
}
