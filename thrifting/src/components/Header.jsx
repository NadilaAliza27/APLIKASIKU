import { Search, Heart, Store, User, ShoppingBag, ArrowLeft } from 'lucide-react';
import LogoIcon from './LogoIcon.jsx';

export default function Header({
  activeTab,
  onSelectTab,
  savedCount = 0,
  isSellerMode = false,
  onToggleSellerMode,
  searchQuery = '',
  onSearchChange,
  onSearchSubmit
}) {
  return (
    <header className="site-header container-fluid">
      <div className="header-inner">
        {/* Brand Logo: Kaos Putih di Hanger dengan huruf T. di tengah */}
        <div className="header-brand-wrap">
          <button
            type="button"
            className="brand-button"
            onClick={() => onSelectTab('beranda')}
            aria-label="Thrifting Beranda"
          >
            <LogoIcon size={38} className="brand-logo-hang" />
            <span className="brand-name">Thrifting</span>
          </button>
        </div>

        {/* 4 Navigasi Utama (Desktop) */}
        {!isSellerMode && (
          <nav className="desktop-main-nav" aria-label="Navigasi Utama">
            <button
              type="button"
              className={`nav-tab-link ${activeTab === 'beranda' ? 'is-active' : ''}`}
              onClick={() => onSelectTab('beranda')}
            >
              Beranda
            </button>
            <button
              type="button"
              className={`nav-tab-link ${activeTab === 'live' ? 'is-active' : ''}`}
              onClick={() => onSelectTab('live')}
            >
              <span className="nav-live-dot"></span>
              Live
            </button>
            <button
              type="button"
              className={`nav-tab-link ${activeTab === 'pesanan' ? 'is-active' : ''}`}
              onClick={() => onSelectTab('pesanan')}
            >
              Pesanan
            </button>
            <button
              type="button"
              className={`nav-tab-link ${activeTab === 'profil' ? 'is-active' : ''}`}
              onClick={() => onSelectTab('profil')}
            >
              Profil
            </button>
          </nav>
        )}

        {/* Search Bar Minimalis */}
        {!isSellerMode && (
          <form onSubmit={onSearchSubmit} className="header-search-form">
            <Search size={15} className="header-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari jaket, denim, kemeja, seller..."
              aria-label="Cari produk"
              className="header-search-input"
            />
          </form>
        )}

        {/* Header Actions */}
        <div className="header-actions">
          {!isSellerMode ? (
            <>
              {/* Tombol Favorit */}
              <button
                type="button"
                className="header-icon-action"
                onClick={() => {
                  onSelectTab('beranda');
                  const el = document.getElementById('katalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Produk Favorit"
                title="Produk Favorit"
              >
                <Heart size={18} fill={savedCount > 0 ? '#c0392b' : 'none'} stroke={savedCount > 0 ? '#c0392b' : 'currentColor'} />
                {savedCount > 0 && <span className="action-badge">{savedCount}</span>}
              </button>

              {/* Tombol Alih ke Mode Seller */}
              <button
                type="button"
                className="btn-switch-seller"
                onClick={onToggleSellerMode}
                title="Masuk ke Dashboard Seller"
              >
                <Store size={15} />
                <span className="seller-btn-label">Dashboard Seller</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-switch-buyer"
              onClick={onToggleSellerMode}
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Mode Pembeli</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
