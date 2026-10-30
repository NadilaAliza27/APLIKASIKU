import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Heart,
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  ArrowUpDown,
  Radio,
  Eye,
  Store,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

// Datasets Awal
import { initialProducts, categories, conditions, cities } from './data/products.js';
import { initialLiveSessions } from './data/liveSessions.js';
import { initialOrders } from './data/orders.js';
import { initialCoinState } from './data/coins.js';

// Komponen
import Header from './components/Header.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';
import Hero from './components/Hero.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductDetailModal from './components/ProductDetailModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import LiveView from './components/LiveView.jsx';
import LiveRoomModal from './components/LiveRoomModal.jsx';
import OrdersView from './components/OrdersView.jsx';
import OrderDetailModal from './components/OrderDetailModal.jsx';
import ReviewModal from './components/ReviewModal.jsx';
import ProfileView from './components/ProfileView.jsx';
import SellerDashboard from './components/SellerDashboard.jsx';
import ChatModal from './components/ChatModal.jsx';
import PhysicalStoreSection from './components/PhysicalStoreSection.jsx';
import EmptyState from './components/EmptyState.jsx';
import Footer from './components/Footer.jsx';
import NotificationToast from './components/NotificationToast.jsx';

// Styling
import './styles/app.css';

export default function App() {
  // 1. Navigasi Utama (4 Bagian: 'beranda' | 'live' | 'pesanan' | 'profil')
  const [activeTab, setActiveTab] = useState('beranda');
  const [isSellerMode, setIsSellerMode] = useState(false);

  // 2. Data State Utama dengan Dukungan LocalStorage
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('thrifting_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((item) => {
          if (item.id === 3 && item.image && item.image.includes('1542272604-780c96856592')) {
            return {
              ...item,
              image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
            };
          }
          return item;
        });
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('thrifting_orders');
      return stored ? JSON.parse(stored) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [coinData, setCoinData] = useState(() => {
    try {
      const stored = localStorage.getItem('thrifting_coins');
      return stored ? JSON.parse(stored) : initialCoinState;
    } catch {
      return initialCoinState;
    }
  });

  const [liveSessions, setLiveSessions] = useState(() => {
    try {
      const stored = localStorage.getItem('thrifting_live');
      return stored ? JSON.parse(stored) : initialLiveSessions;
    } catch {
      return initialLiveSessions;
    }
  });

  const [saved, setSaved] = useState(() => {
    try {
      const stored = localStorage.getItem('thrifting_saved');
      return stored ? JSON.parse(stored) : [1, 3, 6];
    } catch {
      return [1, 3, 6];
    }
  });

  // Simpan Perubahan Data ke LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('thrifting_products', JSON.stringify(products));
      localStorage.setItem('thrifting_orders', JSON.stringify(orders));
      localStorage.setItem('thrifting_coins', JSON.stringify(coinData));
      localStorage.setItem('thrifting_live', JSON.stringify(liveSessions));
      localStorage.setItem('thrifting_saved', JSON.stringify(saved));
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage:', e);
    }
  }, [products, orders, coinData, liveSessions, saved]);

  // 3. State Filter Katalog Beranda
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [activeCondition, setActiveCondition] = useState('Semua Kondisi');
  const [activeCity, setActiveCity] = useState('Semua Kota');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price-low' | 'price-high'

  // 4. State Modals & Dialogs
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [chatProduct, setChatProduct] = useState(null);
  const [activeLiveSession, setActiveLiveSession] = useState(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // 5. Filter & Pengurutan Produk Beranda
  const visibleProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat = activeCategory === 'Semua' || p.category === activeCategory;
      const matchCond = activeCondition === 'Semua Kondisi' || p.condition === activeCondition;
      const matchCity = activeCity === 'Semua Kota' || p.location.toLowerCase().includes(activeCity.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      const matchSearch = !query || `${p.name} ${p.shop} ${p.category} ${p.material || ''}`.toLowerCase().includes(query);

      return matchCat && matchCond && matchCity && matchSearch;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, activeCondition, activeCity, searchQuery, sortBy]);

  // Reset Filter
  function handleResetFilters() {
    setSearchQuery('');
    setActiveCategory('Semua');
    setActiveCondition('Semua Kondisi');
    setActiveCity('Semua Kota');
    setSortBy('default');
  }

  // Toggle Favorit
  function handleToggleFavorite(id) {
    const item = products.find((p) => p.id === id);
    const title = item ? item.name : 'Produk';

    setSaved((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        setToastMessage(`"${title}" dihapus dari favorit.`);
        return prev.filter((itemKey) => itemKey !== id);
      } else {
        setToastMessage(`"${title}" disimpan ke favorit.`);
        return [...prev, id];
      }
    });
  }

  // Konfirmasi Pesanan Baru dari Checkout
  function handleConfirmOrder(newOrder, coinDiscountUsed) {
    setOrders((prev) => [newOrder, ...prev]);

    // Potong koin jika ada diskon koin
    if (coinDiscountUsed > 0) {
      setCoinData((prev) => ({
        ...prev,
        balance: Math.max(0, prev.balance - coinDiscountUsed),
        history: [
          {
            id: `coin-${Date.now()}`,
            title: `Diskon Belanja Pesanan #${newOrder.id}`,
            date: 'Hari ini',
            amount: -coinDiscountUsed,
            type: 'redeemed'
          },
          ...prev.history
        ]
      }));
    }

    setToastMessage(`Pesanan #${newOrder.id} berhasil dibuat! Silakan cek di tab Pesanan.`);
    setActiveTab('pesanan');
  }

  // Bayar Pesanan (Ubah Belum Dibayar -> Dikemas)
  function handlePayOrder(orderId) {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'packing',
            statusLabel: 'Sedang Dikemas',
            timeline: [
              ...ord.timeline,
              {
                time: 'Baru saja',
                text: 'Pembayaran demo berhasil diverifikasi. Seller sedang menyiapkan barang.'
              }
            ]
          };
        }
        return ord;
      })
    );
    setToastMessage(`Pembayaran pesanan #${orderId} berhasil dikonfirmasi!`);
  }

  // Konfirmasi Terima Barang (Ubah Dikirim -> Selesai + Tambah Koin Loyalty)
  function handleConfirmReceived(orderId) {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'completed',
            statusLabel: 'Selesai',
            timeline: [
              ...ord.timeline,
              {
                time: 'Baru saja',
                text: 'Barang telah diterima oleh pembeli. Transaksi selesai.'
              }
            ]
          };
        }
        return ord;
      })
    );

    // Reward Koin 5.000
    const rewardCoins = 5000;
    setCoinData((prev) => ({
      ...prev,
      balance: prev.balance + rewardCoins,
      history: [
        {
          id: `coin-${Date.now()}`,
          title: `Bonus Selesai Pesanan #${orderId}`,
          date: 'Hari ini',
          amount: rewardCoins,
          type: 'earned'
        },
        ...prev.history
      ]
    }));

    setToastMessage(`Pesanan #${orderId} selesai! Kamu mendapatkan +5.000 Koin Thrifting.`);
  }

  // Kirim Review Ulasan (Bonus +2.500 Koin)
  function handleSubmitReview(orderId, reviewData) {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, review: reviewData };
        }
        return ord;
      })
    );

    const reviewCoins = 2500;
    setCoinData((prev) => ({
      ...prev,
      balance: prev.balance + reviewCoins,
      history: [
        {
          id: `coin-${Date.now()}`,
          title: `Reward Ulasan Pesanan #${orderId}`,
          date: 'Hari ini',
          amount: reviewCoins,
          type: 'earned'
        },
        ...prev.history
      ]
    }));

    setToastMessage('Ulasanmu berhasil dikirim! Bonus +2.500 Koin ditambahkan ke akun.');
  }

  // Tukar Voucher Koin
  function handleRedeemVoucher(voucher) {
    if (coinData.balance < voucher.cost) {
      setToastMessage('Saldo Koin Thrifting tidak mencukupi.');
      return;
    }

    setCoinData((prev) => ({
      ...prev,
      balance: prev.balance - voucher.cost,
      history: [
        {
          id: `coin-${Date.now()}`,
          title: `Penukaran Voucher "${voucher.title}"`,
          date: 'Hari ini',
          amount: -voucher.cost,
          type: 'redeemed'
        },
        ...prev.history
      ]
    }));

    setToastMessage(`Voucher ${voucher.title} berhasil ditukarkan!`);
  }

  // Toggle Pengingat Sesi Live
  function handleToggleReminder(sessionId) {
    setLiveSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const next = !s.reminded;
          setToastMessage(next ? `Pengingat live "${s.title}" berhasil diatur!` : 'Pengingat live dibatalkan.');
          return { ...s, reminded: next };
        }
        return s;
      })
    );
  }

  // Seller Dashboard: Tambah Produk Baru
  function handleAddNewProduct(newProd) {
    setProducts((prev) => [newProd, ...prev]);
    setToastMessage(`"${newProd.name}" berhasil ditambahkan ke katalog toko!`);
  }

  // Seller Dashboard: Hapus Produk
  function handleDeleteProduct(prodId) {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
    setToastMessage('Produk berhasil dihapus dari katalog.');
  }

  // Seller Dashboard: Proses Pengiriman (Dikemas -> Dikirim + Resi)
  function handleProcessShipping(orderId) {
    const fakeTracking = `TRF${Math.floor(10000000 + Math.random() * 90000000)}ID`;
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'shipped',
            statusLabel: 'Dalam Pengiriman',
            trackingNumber: fakeTracking,
            timeline: [
              ...ord.timeline,
              {
                time: 'Baru saja',
                text: `Paket telah diserahkan seller ke kurir. Nomor resi: ${fakeTracking}.`
              }
            ]
          };
        }
        return ord;
      })
    );
    setToastMessage(`Pesanan #${orderId} telah diperbarui menjadi "Dikirim" dengan resi ${fakeTracking}.`);
  }

  // Daftar produk favorit lengkap
  const favoriteProducts = useMemo(() => {
    return products.filter((p) => saved.includes(p.id));
  }, [products, saved]);

  return (
    <div className="thrifting-site-root">
      {/* 1. Header Desktop & Topbar */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setIsSellerMode(false);
          setActiveTab(tab);
        }}
        savedCount={saved.length}
        isSellerMode={isSellerMode}
        onToggleSellerMode={() => setIsSellerMode(!isSellerMode)}
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          if (activeTab !== 'beranda') setActiveTab('beranda');
        }}
        onSearchSubmit={(e) => {
          e.preventDefault();
          if (activeTab !== 'beranda') setActiveTab('beranda');
          const el = document.getElementById('katalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Views Container */}
      <main className="main-content-flow">
        {/* VIEW 1: SELLER DASHBOARD (JIKA SELLER MODE AKTIF) */}
        {isSellerMode ? (
          <SellerDashboard
            products={products}
            orders={orders}
            onAddNewProduct={handleAddNewProduct}
            onDeleteProduct={handleDeleteProduct}
            onProcessShipping={handleProcessShipping}
            onExitSellerMode={() => setIsSellerMode(false)}
          />
        ) : (
          <>
            {/* VIEW 2: BERANDA (HOME) */}
            {activeTab === 'beranda' && (
              <div className="tab-view-home">
                {/* A. Sapaan & Pengantar Singkat Editorial */}
                <Hero
                  onExploreCatalog={() => {
                    const el = document.getElementById('katalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* B. Katalog Produk Utama */}
                <section className="catalog-editorial-section" id="katalog">
                  <div className="catalog-container">
                    {/* Filter Kategori Tabs (Atasan, Outerwear, Celana, Aksesori) */}
                    <div className="category-chips-bar" role="tablist" aria-label="Filter Kategori">
                      {categories.map((cat) => {
                        const count = cat === 'Semua' ? products.length : products.filter((p) => p.category === cat).length;
                        return (
                          <button
                            key={cat}
                            type="button"
                            role="tab"
                            aria-selected={activeCategory === cat}
                            className={`category-chip-btn ${activeCategory === cat ? 'is-active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                          >
                            <span>{cat}</span>
                            <span className="cat-count-sub">({count})</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Filter & Sort Bar (Tenang, Minimalis, Terstruktur) */}
                    <div className="catalog-toolbar-panel">
                      <div className="toolbar-left-filters">
                        {/* Filter Kondisi */}
                        <div className="filter-select-frame">
                          <label htmlFor="selectCondition" className="sr-only">Filter Kondisi</label>
                          <select
                            id="selectCondition"
                            value={activeCondition}
                            onChange={(e) => setActiveCondition(e.target.value)}
                            className="select-field-minimal"
                          >
                            {conditions.map((cond) => (
                              <option key={cond} value={cond}>{cond}</option>
                            ))}
                          </select>
                        </div>

                        {/* Filter Kota / Lokasi Pasar */}
                        <div className="filter-select-frame">
                          <label htmlFor="selectCity" className="sr-only">Filter Kota</label>
                          <select
                            id="selectCity"
                            value={activeCity}
                            onChange={(e) => setActiveCity(e.target.value)}
                            className="select-field-minimal"
                          >
                            {cities.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>

                        {/* Pengurutan Harga */}
                        <div className="filter-select-frame">
                          <label htmlFor="selectSort" className="sr-only">Urutkan</label>
                          <select
                            id="selectSort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="select-field-minimal"
                          >
                            <option value="default">Rekomendasi</option>
                            <option value="price-low">Harga: Rendah ke Tinggi</option>
                            <option value="price-high">Harga: Tinggi ke Rendah</option>
                          </select>
                        </div>
                      </div>

                      {/* Reset Action */}
                      {(activeCategory !== 'Semua' || activeCondition !== 'Semua Kondisi' || activeCity !== 'Semua Kota' || searchQuery || sortBy !== 'default') && (
                        <button
                          type="button"
                          className="btn-reset-filters"
                          onClick={handleResetFilters}
                        >
                          <RotateCcw size={12} />
                          <span>Reset Filter</span>
                        </button>
                      )}
                    </div>

                    {/* Status Hasil Pencarian */}
                    <div className="catalog-counter-strip">
                      <span>
                        Menampilkan <strong>{visibleProducts.length}</strong> pakaian pre-loved pilihan
                        {activeCategory !== 'Semua' && ` di kategori ${activeCategory}`}
                        {searchQuery && ` dengan kata kunci "${searchQuery}"`}
                      </span>
                    </div>

                    {/* Grid Produk Konsisten */}
                    {visibleProducts.length > 0 ? (
                      <div className="editorial-product-grid">
                        {visibleProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            isFavorite={saved.includes(product.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onSelectProduct={(p) => setSelectedProductDetail(p)}
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        search={searchQuery}
                        activeCategory={activeCategory}
                        onReset={handleResetFilters}
                      />
                    )}
                  </div>
                </section>

                {/* C. Teaser Thrifting Live di Beranda (Section 4E) */}
                <section className="home-live-teaser-section">
                  <div className="home-live-container">
                    <div className="live-teaser-head">
                      <div>
                        <span className="section-eyebrow">THRIFTING LIVE</span>
                        <h2 className="section-title">Lihat Pakaian Secara Langsung</h2>
                      </div>
                      <button
                        type="button"
                        className="btn-view-all-live"
                        onClick={() => setActiveTab('live')}
                      >
                        <span>Lihat Semua Sesi</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="home-live-preview-grid">
                      {liveSessions.slice(0, 2).map((session) => (
                        <div
                          key={session.id}
                          className="home-live-card"
                          onClick={() => {
                            if (session.status === 'live') {
                              setActiveLiveSession(session);
                            } else {
                              setActiveTab('live');
                            }
                          }}
                        >
                          <div className="home-live-thumb-wrap">
                            <img src={session.thumbnail} alt={session.title} />
                            {session.status === 'live' ? (
                              <span className="live-status-pill red">
                                <Radio size={11} /> SEDANG LIVE ({session.viewers})
                              </span>
                            ) : (
                              <span className="live-status-pill yellow">
                                {session.scheduledTime}
                              </span>
                            )}
                          </div>
                          <div className="home-live-body">
                            <span className="home-live-shop">{session.shop}</span>
                            <h4 className="home-live-title">{session.title}</h4>
                            <span className="home-live-cta">
                              {session.status === 'live' ? 'Tonton Sesi (DEMO) →' : 'Atur Pengingat →'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* D. Penemuan Toko Fisik (Section 4F) */}
                <PhysicalStoreSection
                  onSelectCity={(city) => {
                    setActiveCity(city);
                    const el = document.getElementById('katalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {/* VIEW 3: THRIFTING LIVE (TAB 2) */}
            {activeTab === 'live' && (
              <LiveView
                liveSessions={liveSessions}
                onOpenLiveRoom={(session) => setActiveLiveSession(session)}
                onToggleReminder={handleToggleReminder}
              />
            )}

            {/* VIEW 4: PESANAN SAYA (TAB 3) */}
            {activeTab === 'pesanan' && (
              <OrdersView
                orders={orders}
                onSelectOrder={(ord) => setSelectedOrderDetail(ord)}
                onPayOrder={handlePayOrder}
                onConfirmReceived={handleConfirmReceived}
                onOpenReview={(ord) => setReviewOrder(ord)}
                onGoShopping={() => setActiveTab('beranda')}
              />
            )}

            {/* VIEW 5: PROFIL PENGGUNA & KOIN (TAB 4) */}
            {activeTab === 'profil' && (
              <ProfileView
                coinData={coinData}
                onRedeemVoucher={handleRedeemVoucher}
                favorites={favoriteProducts}
                orders={orders}
                onSelectProduct={(p) => setSelectedProductDetail(p)}
                onSelectTab={(tab) => setActiveTab(tab)}
                onToggleSellerMode={() => setIsSellerMode(true)}
                onOpenChat={(p) => setChatProduct(p)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer Bersih (Hanya Desktop) */}
      {!isSellerMode && (
        <Footer
          onSelectCategory={(cat) => {
            setActiveTab('beranda');
            setActiveCategory(cat);
            const el = document.getElementById('katalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onGoToLive={() => setActiveTab('live')}
          onOpenSellerDashboard={() => setIsSellerMode(true)}
        />
      )}

      {/* 2. Navigasi Bawah Mobile (4 Bagian Utama) */}
      {!isSellerMode && (
        <MobileBottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          orderCount={orders.filter((o) => o.status === 'unpaid' || o.status === 'shipped').length}
        />
      )}

      {/* ---------------- MODALS & DIALOGS ---------------- */}

      {/* Modal Detail Produk */}
      {selectedProductDetail && (
        <ProductDetailModal
          product={selectedProductDetail}
          isFavorite={saved.includes(selectedProductDetail.id)}
          onClose={() => setSelectedProductDetail(null)}
          onToggleFavorite={handleToggleFavorite}
          onStartCheckout={(p) => setCheckoutProduct(p)}
          onOpenChat={(p) => setChatProduct(p)}
        />
      )}

      {/* Modal Checkout Demo */}
      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
          onConfirmOrder={handleConfirmOrder}
          coinBalance={coinData.balance}
        />
      )}

      {/* Modal Ruang Live Streaming Interaktif */}
      {activeLiveSession && (
        <LiveRoomModal
          session={activeLiveSession}
          products={products}
          onClose={() => setActiveLiveSession(null)}
          onStartCheckout={(p) => setCheckoutProduct(p)}
          onOpenProductDetail={(p) => setSelectedProductDetail(p)}
        />
      )}

      {/* Modal Detail Pesanan */}
      {selectedOrderDetail && (
        <OrderDetailModal
          order={selectedOrderDetail}
          onClose={() => setSelectedOrderDetail(null)}
          onPayOrder={handlePayOrder}
          onConfirmReceived={handleConfirmReceived}
          onOpenReview={(ord) => setReviewOrder(ord)}
        />
      )}

      {/* Modal Review Penilaian */}
      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* Modal Chat dengan Seller */}
      {chatProduct && (
        <ChatModal
          product={chatProduct}
          onClose={() => setChatProduct(null)}
          onStartCheckout={(p) => setCheckoutProduct(p)}
        />
      )}

      {/* Toast Notifikasi Feedback */}
      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
