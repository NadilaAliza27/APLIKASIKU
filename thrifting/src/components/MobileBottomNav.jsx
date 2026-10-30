import { Home, Radio, Package, User } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  onSelectTab,
  orderCount = 0
}) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navigasi Bawah">
      <button
        type="button"
        className={`bottom-nav-item ${activeTab === 'beranda' ? 'is-active' : ''}`}
        onClick={() => onSelectTab('beranda')}
      >
        <Home size={19} />
        <span>Beranda</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${activeTab === 'live' ? 'is-active' : ''}`}
        onClick={() => onSelectTab('live')}
      >
        <div className="bottom-live-icon-wrap">
          <Radio size={19} />
          <span className="live-bubble-dot"></span>
        </div>
        <span>Live</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${activeTab === 'pesanan' ? 'is-active' : ''}`}
        onClick={() => onSelectTab('pesanan')}
      >
        <div className="bottom-badge-wrap">
          <Package size={19} />
          {orderCount > 0 && <span className="bottom-badge">{orderCount}</span>}
        </div>
        <span>Pesanan</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${activeTab === 'profil' ? 'is-active' : ''}`}
        onClick={() => onSelectTab('profil')}
      >
        <User size={19} />
        <span>Profil</span>
      </button>
    </nav>
  );
}
