import { ArrowUp, Sparkles } from 'lucide-react';

export default function Footer({ onSelectCategory, onGoToLive, onOpenSellerDashboard }) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="clean-editorial-footer">
      <div className="footer-container">
        <div className="footer-main-grid">
          {/* Brand Info */}
          <div className="footer-col-brand">
            <div className="footer-logo">
              <span className="brand-mark">T.</span>
              <span className="brand-name">Thrifting</span>
            </div>
            <p className="footer-mission-text">
              Marketplace pakaian pre-loved dan arsip vintage Indonesia yang menghubungkan pembeli dengan toko thrift fisik dan seller independen.
            </p>
            <div className="footer-eco-badge">
              <Sparkles size={13} className="icon-lime" />
              <span>Gerakan Sustainable Fashion Indonesia</span>
            </div>
          </div>

          {/* Navigasi Kategori */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Kategori</h4>
            <div className="footer-nav-list">
              <button type="button" onClick={() => onSelectCategory('Atasan')}>Atasan & Kemeja</button>
              <button type="button" onClick={() => onSelectCategory('Outerwear')}>Outerwear & Jaket</button>
              <button type="button" onClick={() => onSelectCategory('Celana')}>Denim & Celana</button>
              <button type="button" onClick={() => onSelectCategory('Aksesori')}>Tas & Sepatu</button>
            </div>
          </div>

          {/* Layanan & Fitur */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Fitur Platform</h4>
            <div className="footer-nav-list">
              <button type="button" onClick={onGoToLive}>Thrifting Live Streaming</button>
              <a href="#toko-fisik">Sentra Pasar & Toko Fisik</a>
              <button type="button" onClick={onOpenSellerDashboard}>Dashboard Seller</button>
            </div>
          </div>

          {/* Sentra Pasar Fisik */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Sentra Thrift</h4>
            <div className="footer-static-text-list">
              <span>Pasar Senen Blok III (Jakarta)</span>
              <span>Pasar Gedebage (Bandung)</span>
              <span>Kawasan Malioboro (Yogyakarta)</span>
              <span>Pasar Triwindu (Solo)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copy">
            © 2026 <strong>Thrifting</strong>. Prototipe Frontend Marketplace Fashion Pre-Loved Indonesia.
          </span>
          <button
            type="button"
            className="btn-scroll-top"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
          >
            <span>Kembali ke atas</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
