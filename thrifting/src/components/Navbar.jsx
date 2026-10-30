import { useState } from 'react';
import { Heart, ArrowUpRight, Menu, X, Store, Search, Sparkles } from 'lucide-react';

export default function Navbar({
  savedCount = 0,
  showSavedOnly = false,
  onToggleSavedOnly,
  onOpenSellerModal,
  onFocusSearch
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleNavClick(targetId) {
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* Top Banner Minimalist */}
      <div className="top-banner">
        <div className="top-banner-inner">
          <span className="banner-tag">Baru</span>
          <span>Katalog thrift terkurasi dari Pasar Senen, Gedebage, & seller independen se-Indonesia</span>
          <a href="#toko-lokasi" className="banner-link">Lihat Lokasi Toko &rarr;</a>
        </div>
      </div>

      <header className="modern-header">
        <div className="header-container">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" aria-label="Thrifting Beranda">
            <span className="brand-icon">T.</span>
            <span className="brand-title">thrifting<span className="brand-dot"></span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Navigasi Utama">
            <button type="button" onClick={() => handleNavClick('jelajah')} className="nav-item">
              Katalog
            </button>
            <button type="button" onClick={() => handleNavClick('kategori')} className="nav-item">
              Kategori
            </button>
            <button type="button" onClick={() => handleNavClick('toko-lokasi')} className="nav-item">
              Toko Fisik
            </button>
            <button type="button" onClick={() => handleNavClick('cara-kerja')} className="nav-item">
              Cara Kerja
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            {/* Quick Search Shortcut */}
            <button
              type="button"
              className="header-search-btn"
              onClick={() => {
                handleNavClick('jelajah');
                if (onFocusSearch) onFocusSearch();
              }}
              aria-label="Cari produk"
            >
              <Search size={16} />
              <span className="search-btn-text">Cari barang thrift...</span>
              <kbd className="search-kbd">Ctrl K</kbd>
            </button>

            {/* Favorite Button */}
            <button
              type="button"
              className={`header-fav-btn ${showSavedOnly ? 'active' : ''}`}
              onClick={onToggleSavedOnly}
              aria-label="Lihat produk favorit"
              title="Filter Favorit"
            >
              <Heart
                size={18}
                fill={savedCount > 0 ? (showSavedOnly ? '#e11d48' : '#e11d48') : 'none'}
                stroke={savedCount > 0 ? '#e11d48' : 'currentColor'}
              />
              <span className="fav-counter">{savedCount}</span>
            </button>

            {/* Seller CTA */}
            <button
              type="button"
              className="header-cta-btn"
              onClick={onOpenSellerModal}
            >
              <Store size={15} />
              <span>Buka Toko</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu navigasi"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <div className="drawer-links">
              <button
                type="button"
                className="drawer-link"
                onClick={() => handleNavClick('jelajah')}
              >
                Katalog Produk
              </button>
              <button
                type="button"
                className="drawer-link"
                onClick={() => handleNavClick('kategori')}
              >
                Kategori Pilihan
              </button>
              <button
                type="button"
                className="drawer-link"
                onClick={() => handleNavClick('toko-lokasi')}
              >
                Toko & Pasar Fisik
              </button>
              <button
                type="button"
                className="drawer-link"
                onClick={() => handleNavClick('cara-kerja')}
              >
                Cara Kerja Platform
              </button>
            </div>

            <div className="drawer-actions">
              <button
                type="button"
                className="drawer-fav-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleSavedOnly();
                  handleNavClick('jelajah');
                }}
              >
                <Heart size={18} fill={savedCount > 0 ? '#e11d48' : 'none'} stroke={savedCount > 0 ? '#e11d48' : 'currentColor'} />
                <span>Lihat Koleksi Favorit ({savedCount})</span>
              </button>

              <button
                type="button"
                className="drawer-seller-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSellerModal();
                }}
              >
                <Store size={16} />
                <span>Buka Toko Thrift Sekarang</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
