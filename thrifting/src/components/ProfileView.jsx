import { useState } from 'react';
import {
  User,
  Coins,
  Heart,
  MapPin,
  Package,
  MessageCircle,
  Settings,
  Store,
  ArrowRight,
  Ticket,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function ProfileView({
  coinData,
  onRedeemVoucher,
  favorites = [],
  orders = [],
  onSelectProduct,
  onSelectTab,
  onToggleSellerMode,
  onOpenChat
}) {
  const [activeSection, setActiveSection] = useState('koin'); // 'koin' | 'favorit' | 'alamat'

  const userProfile = {
    name: 'Raditya Pratama',
    email: 'raditya.pratama@example.com',
    phone: '0812-3456-7890',
    joined: 'Oktober 2026',
    memberBadge: 'Pencinta Sustainable Fashion'
  };

  return (
    <div className="profile-page-container">
      {/* Profil Header Card */}
      <div className="profile-header-card">
        <div className="profile-user-main">
          <div className="profile-avatar-circle">
            <User size={30} />
          </div>
          <div className="profile-user-meta">
            <div className="profile-name-row">
              <h1 className="profile-full-name">{userProfile.name}</h1>
              <span className="profile-demo-tag">AKUN DEMO</span>
            </div>
            <span className="profile-email-sub">{userProfile.email}</span>
            <div className="profile-badge-strip">
              <ShieldCheck size={13} className="icon-sage" />
              <span>{userProfile.memberBadge}</span>
            </div>
          </div>
        </div>

        {/* Quick Summary Pill Widget */}
        <div className="profile-quick-stats">
          <div
            className="stat-card clickable"
            onClick={() => setActiveSection('koin')}
          >
            <div className="stat-icon-wrap lime">
              <Coins size={18} />
            </div>
            <div>
              <span className="stat-label">Koin Thrifting</span>
              <strong className="stat-val">{coinData.balance.toLocaleString('id-ID')}</strong>
            </div>
          </div>

          <div
            className="stat-card clickable"
            onClick={() => setActiveSection('favorit')}
          >
            <div className="stat-icon-wrap rose">
              <Heart size={18} fill="#c0392b" stroke="#c0392b" />
            </div>
            <div>
              <span className="stat-label">Favorit Tersimpan</span>
              <strong className="stat-val">{favorites.length} Item</strong>
            </div>
          </div>

          <div
            className="stat-card clickable"
            onClick={() => onSelectTab('pesanan')}
          >
            <div className="stat-icon-wrap forest">
              <Package size={18} />
            </div>
            <div>
              <span className="stat-label">Total Pesanan</span>
              <strong className="stat-val">{orders.length} Transaksi</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section Navigation Bar */}
      <div className="profile-nav-tabs-strip">
        <button
          type="button"
          className={`profile-tab-btn ${activeSection === 'koin' ? 'is-active' : ''}`}
          onClick={() => setActiveSection('koin')}
        >
          <Coins size={15} />
          <span>Loyalty Koin Thrifting</span>
        </button>

        <button
          type="button"
          className={`profile-tab-btn ${activeSection === 'favorit' ? 'is-active' : ''}`}
          onClick={() => setActiveSection('favorit')}
        >
          <Heart size={15} />
          <span>Produk Favorit ({favorites.length})</span>
        </button>

        <button
          type="button"
          className={`profile-tab-btn ${activeSection === 'alamat' ? 'is-active' : ''}`}
          onClick={() => setActiveSection('alamat')}
        >
          <MapPin size={15} />
          <span>Alamat Pengiriman</span>
        </button>
      </div>

      {/* Section 1: Loyalty Koin Thrifting */}
      {activeSection === 'koin' && (
        <div className="coin-loyalty-section">
          {/* Card Saldo Koin */}
          <div className="coin-balance-card">
            <div className="balance-info-col">
              <span className="coin-eyebrow">PROGRAM LOYALTY THRIFTING</span>
              <h2 className="coin-total-number">{coinData.balance.toLocaleString('id-ID')}</h2>
              <span className="coin-unit-text">Koin Thrifting Aktif (Data Demo)</span>
              <p className="coin-manifesto">
                Koin Thrifting diberikan sebagai apresiasi atas partisipasi berbelanja pakaian pre-loved dan mendukung ekonomi sirkular ramah lingkungan.
              </p>
            </div>

            <div className="coin-rules-col">
              <h4>Cara Mendapatkan Koin:</h4>
              <ul className="coin-rules-list">
                <li>
                  <CheckCircle2 size={14} className="icon-sage" />
                  <span>Selesaikan pesanan thrift: Dapatkan 5.000 Koin per transaksi</span>
                </li>
                <li>
                  <CheckCircle2 size={14} className="icon-sage" />
                  <span>Beri ulasan jujur & rating: Bonus 2.500 Koin</span>
                </li>
                <li>
                  <CheckCircle2 size={14} className="icon-sage" />
                  <span>Koin dapat ditukar menjadi voucher potongan belanja checkout</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tukar Voucher */}
          <div className="coin-vouchers-block">
            <div className="block-head-row">
              <h3>Tukarkan Koin Menjadi Voucher</h3>
              <span className="block-sub">Potongan langsung saat checkout pesanan berikutnya</span>
            </div>

            <div className="vouchers-grid">
              {coinData.vouchers.map((vch) => {
                const canAfford = coinData.balance >= vch.cost;
                return (
                  <div key={vch.id} className="voucher-card">
                    <div className="voucher-left">
                      <Ticket size={24} className="voucher-icon" />
                      <div className="voucher-info">
                        <strong>{vch.title}</strong>
                        <small>Min. belanja Rp {vch.minSpend.toLocaleString('id-ID')} • Berlaku s/d {vch.expiry}</small>
                      </div>
                    </div>
                    <div className="voucher-right">
                      <span className="voucher-cost">{vch.cost.toLocaleString('id-ID')} Koin</span>
                      <button
                        type="button"
                        className={`btn-redeem-voucher ${canAfford ? '' : 'disabled'}`}
                        disabled={!canAfford}
                        onClick={() => onRedeemVoucher(vch)}
                      >
                        {canAfford ? 'Tukar' : 'Koin Kurang'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Riwayat Koin */}
          <div className="coin-history-block">
            <h3>Riwayat Aktivitas Koin</h3>
            <div className="history-list">
              {coinData.history.map((item) => (
                <div key={item.id} className="history-row">
                  <div className="history-left">
                    <span className="history-title">{item.title}</span>
                    <span className="history-date">{item.date}</span>
                  </div>
                  <strong className={`history-amount ${item.type}`}>
                    {item.amount > 0 ? `+${item.amount.toLocaleString('id-ID')}` : item.amount.toLocaleString('id-ID')} Koin
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Favorit Saya */}
      {activeSection === 'favorit' && (
        <div className="profile-favorites-section">
          <div className="block-head-row">
            <h3>Barang yang Kamu Simpan ({favorites.length})</h3>
            <span className="block-sub">Koleksi pakaian pre-loved favoritmu tersimpan aman</span>
          </div>

          {favorites.length > 0 ? (
            <div className="favorites-grid">
              {favorites.map((product) => (
                <article
                  key={product.id}
                  className="favorite-mini-card"
                  onClick={() => onSelectProduct(product)}
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="fav-card-thumb"
                  />
                  <div className="fav-card-info">
                    <span className="fav-card-shop">{product.shop}</span>
                    <h4 className="fav-card-title">{product.name}</h4>
                    <span className="fav-card-price">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="favorites-empty">
              <Heart size={36} className="icon-empty-heart" />
              <h4>Belum Ada Barang Favorit</h4>
              <p>Klik ikon hati pada produk di katalog untuk menyimpannya ke koleksi pribadimu.</p>
              <button
                type="button"
                className="btn-primary-explore"
                onClick={() => onSelectTab('beranda')}
              >
                Jelajahi Katalog
              </button>
            </div>
          )}
        </div>
      )}

      {/* Section 3: Alamat Pengiriman Demo */}
      {activeSection === 'alamat' && (
        <div className="profile-address-section">
          <div className="block-head-row">
            <h3>Alamat Pengiriman Utama (Demo)</h3>
            <span className="block-sub">Alamat default untuk simulasi pengiriman paket</span>
          </div>

          <div className="address-full-card">
            <div className="address-top">
              <div className="recipient-col">
                <strong>Raditya Pratama</strong>
                <span>0812-3456-7890</span>
              </div>
              <span className="badge-primary-address">Utama</span>
            </div>
            <p className="address-detail-text">
              Jl. Senopati No. 45, RT 04 / RW 02, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
            </p>
            <div className="address-actions-row">
              <button type="button" className="btn-edit-address" onClick={() => alert('Fitur ubah alamat demo tersedia pada pembaruan berikutnya.')}>
                Ubah Alamat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Akses Seller & Layanan Pelanggan */}
      <div className="profile-bottom-actions-panel">
        <div className="seller-access-box">
          <div className="seller-box-left">
            <Store size={22} className="icon-forest" />
            <div>
              <strong>Punya Pakaian Pre-Loved atau Toko Thrift?</strong>
              <p>Kelola produk, live streaming, dan pesanan masuk di Dashboard Seller.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-profile-seller"
            onClick={onToggleSellerMode}
          >
            <span>Buka Dashboard Seller</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
