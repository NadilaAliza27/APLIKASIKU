import { useState } from 'react';
import {
  Store,
  PlusCircle,
  Package,
  Radio,
  TrendingUp,
  MapPin,
  Trash2,
  CheckCircle2,
  Truck,
  ArrowLeft,
  Upload
} from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function SellerDashboard({
  products = [],
  orders = [],
  onAddNewProduct,
  onDeleteProduct,
  onProcessShipping,
  onExitSellerMode
}) {
  const [activeSubTab, setActiveSubTab] = useState('products'); // 'products' | 'add' | 'orders' | 'live' | 'shop'

  // State Form Tambah Produk
  const [formData, setFormData] = useState({
    name: '',
    category: 'Outerwear',
    price: '',
    size: '',
    condition: 'Sangat Baik (9/10)',
    material: '',
    conditionNotes: '',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80',
    stock: 1
  });

  const shopInfo = {
    name: 'Arsip Lawas',
    owner: 'Fajar Nugraha',
    market: 'Pasar Senen Blok III Lt. 2 No. 42',
    city: 'Jakarta Pusat',
    hours: '10.00 - 18.00 WIB (Buka Setiap Hari)',
    whatsapp: '0812-3456-7891'
  };

  // Filter pesanan yang masuk ke toko ini
  const incomingOrders = orders.filter((o) => o.status === 'packing' || o.status === 'shipped');

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const newProd = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: parseInt(formData.price, 10),
      shop: shopInfo.name,
      location: `${shopInfo.market}, ${shopInfo.city}`,
      storeAddress: `${shopInfo.market}, ${shopInfo.city} (${shopInfo.hours})`,
      hasPhysicalStore: true,
      condition: formData.condition,
      conditionNotes: formData.conditionNotes || 'Kondisi pre-loved terawat.',
      size: formData.size || 'Free Size',
      material: formData.material || 'Cotton Thrift',
      image: formData.image || 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80',
      stock: parseInt(formData.stock, 10) || 1,
      whatsapp: '6281234567891',
      featured: false
    };

    onAddNewProduct(newProd);

    // Reset Form
    setFormData({
      name: '',
      category: 'Outerwear',
      price: '',
      size: '',
      condition: 'Sangat Baik (9/10)',
      material: '',
      conditionNotes: '',
      image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80',
      stock: 1
    });

    setActiveSubTab('products');
  }

  return (
    <div className="seller-dashboard-container">
      {/* Top Banner Dashboard */}
      <div className="seller-top-bar">
        <div className="seller-title-col">
          <div className="seller-shop-badge">
            <Store size={15} />
            <span>DASHBOARD TOKO THRIFT (DEMO)</span>
          </div>
          <h1 className="seller-shop-name">{shopInfo.name}</h1>
          <span className="seller-shop-location">
            <MapPin size={12} /> {shopInfo.market}, {shopInfo.city}
          </span>
        </div>

        <button
          type="button"
          className="btn-exit-seller"
          onClick={onExitSellerMode}
        >
          <ArrowLeft size={15} />
          <span>Kembali ke Mode Pembeli</span>
        </button>
      </div>

      {/* Ringkasan Performa Toko */}
      <div className="seller-metrics-grid">
        <div className="metric-box">
          <span className="metric-label">Penjualan Bulan Ini (Demo)</span>
          <strong className="metric-val">Rp 2.450.000</strong>
          <small className="metric-trend text-green">+14% dari bulan lalu</small>
        </div>

        <div className="metric-box">
          <span className="metric-label">Produk Terdaftar</span>
          <strong className="metric-val">{products.length} Barang</strong>
          <small className="metric-sub">Stok live terverifikasi</small>
        </div>

        <div className="metric-box">
          <span className="metric-label">Pesanan Masuk</span>
          <strong className="metric-val">{incomingOrders.length} Pesanan</strong>
          <small className="metric-sub">Perlu diproses / dikirim</small>
        </div>

        <div className="metric-box">
          <span className="metric-label">Rating Toko</span>
          <strong className="metric-val">4.9 / 5.0</strong>
          <small className="metric-sub">Berdasarkan 38 ulasan pembeli</small>
        </div>
      </div>

      {/* Tab Navigasi Dashboard Seller */}
      <div className="seller-nav-tabs">
        <button
          type="button"
          className={`seller-tab-btn ${activeSubTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('products')}
        >
          <Package size={15} />
          <span>Daftar Produk ({products.length})</span>
        </button>

        <button
          type="button"
          className={`seller-tab-btn ${activeSubTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('add')}
        >
          <PlusCircle size={15} />
          <span>Tambah Produk Baru</span>
        </button>

        <button
          type="button"
          className={`seller-tab-btn ${activeSubTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('orders')}
        >
          <Truck size={15} />
          <span>Pesanan Masuk ({incomingOrders.length})</span>
        </button>

        <button
          type="button"
          className={`seller-tab-btn ${activeSubTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('shop')}
        >
          <Store size={15} />
          <span>Profil & Kios Fisik</span>
        </button>
      </div>

      {/* Konten Tab 1: Daftar Produk Toko */}
      {activeSubTab === 'products' && (
        <div className="seller-tab-content">
          <div className="content-action-head">
            <h3>Daftar Koleksi Pakaian Toko</h3>
            <button
              type="button"
              className="btn-add-shortcut"
              onClick={() => setActiveSubTab('add')}
            >
              <PlusCircle size={14} />
              <span>Tambah Produk</span>
            </button>
          </div>

          <div className="seller-products-table-wrap">
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Ukuran</th>
                  <th>Kondisi</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-product-col">
                        <SafeImage src={item.image} alt={item.name} className="table-thumb" />
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.shop}</small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-cat">{item.category}</span></td>
                    <td><strong>Rp {item.price.toLocaleString('id-ID')}</strong></td>
                    <td>{item.size}</td>
                    <td><span className="badge-cond">{item.condition}</span></td>
                    <td>{item.stock || 1}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-delete-item"
                        onClick={() => onDeleteProduct(item.id)}
                        title="Hapus produk demo"
                      >
                        <Trash2 size={14} />
                        <span>Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Konten Tab 2: Form Tambah Produk */}
      {activeSubTab === 'add' && (
        <div className="seller-tab-content">
          <div className="content-action-head">
            <h3>Tambah Barang Thrift Baru</h3>
            <span className="form-sub-desc">
              Data produk akan langsung muncul di katalog pembeli secara lokal.
            </span>
          </div>

          <form onSubmit={handleAddSubmit} className="seller-add-form">
            <div className="form-row-2">
              <div className="form-group-seller">
                <label>Nama Produk *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Jaket Denim Vintage Levi's Type 3"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group-seller">
                <label>Kategori *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                >
                  <option value="Atasan">Atasan (Kemeja, Kaos)</option>
                  <option value="Outerwear">Outerwear (Jaket, Sweater)</option>
                  <option value="Celana">Celana (Denim, Trousers)</option>
                  <option value="Aksesori">Aksesori (Tas, Sepatu)</option>
                </select>
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group-seller">
                <label>Harga (Rupiah) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="Contoh: 150000"
                  value={formData.price}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group-seller">
                <label>Ukuran / Size *</label>
                <input
                  type="text"
                  name="size"
                  required
                  placeholder="Contoh: L (P 70 cm x L 56 cm)"
                  value={formData.size}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group-seller">
                <label>Kondisi Barang *</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleFormChange}
                >
                  <option value="Seperti Baru (9.5/10)">Seperti Baru (9.5/10)</option>
                  <option value="Sangat Baik (9/10)">Sangat Baik (9/10)</option>
                  <option value="Kondisi Baik (8.5/10)">Kondisi Baik (8.5/10)</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group-seller">
                <label>Bahan / Material</label>
                <input
                  type="text"
                  name="material"
                  placeholder="Contoh: 100% Rigid Denim 13.5oz"
                  value={formData.material}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group-seller">
                <label>URL Foto Produk (Gambar Publik)</label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="form-group-seller">
              <label>Catatan Kondisi / Minus Jujur</label>
              <textarea
                name="conditionNotes"
                rows={3}
                placeholder="Contoh: Warna pekat, zipper original lancar, tidak ada noda atau lubang sama sekali."
                value={formData.conditionNotes}
                onChange={handleFormChange}
              />
            </div>

            <div className="form-submit-row">
              <button type="submit" className="btn-save-product">
                Simpan & Terbitkan ke Katalog
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Konten Tab 3: Pesanan Masuk */}
      {activeSubTab === 'orders' && (
        <div className="seller-tab-content">
          <div className="content-action-head">
            <h3>Pesanan Masuk dari Pembeli</h3>
            <span className="form-sub-desc">
              Kelola konfirmasi pengiriman paket pesanan pembeli secara langsung.
            </span>
          </div>

          {incomingOrders.length > 0 ? (
            <div className="seller-orders-list">
              {incomingOrders.map((ord) => (
                <div key={ord.id} className="seller-order-card">
                  <div className="order-head-strip">
                    <strong>#{ord.id}</strong>
                    <span className="order-date-label">{ord.date}</span>
                    <span className={`status-pill ${ord.status}`}>{ord.statusLabel}</span>
                  </div>

                  <div className="order-body-split">
                    <div className="order-item-left">
                      <SafeImage src={ord.product.image} alt={ord.product.name} className="order-thumb-mini" />
                      <div>
                        <h4>{ord.product.name}</h4>
                        <small>{ord.product.size} • {ord.product.condition}</small>
                        <div className="total-payout">
                          Total Pembayaran: <strong>Rp {ord.totalAmount.toLocaleString('id-ID')}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="order-shipping-right">
                      <strong>Tujuan:</strong>
                      <p>{ord.shippingAddress.recipient} ({ord.shippingAddress.phone})</p>
                      <p className="addr-sub">{ord.shippingAddress.address}</p>
                      <span className="courier-badge">Kurir: {ord.shippingMethod}</span>

                      {ord.status === 'packing' && (
                        <button
                          type="button"
                          className="btn-process-dispatch"
                          onClick={() => onProcessShipping(ord.id)}
                        >
                          <Truck size={14} />
                          <span>Kirim Barang (Generate Resi Demo)</span>
                        </button>
                      )}

                      {ord.status === 'shipped' && (
                        <div className="dispatched-label">
                          <CheckCircle2 size={14} className="icon-sage" />
                          <span>Sudah Dikirim (Resi: {ord.trackingNumber})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-seller-box">
              <Package size={32} />
              <h4>Tidak Ada Pesanan Baru yang Perlu Dikemas</h4>
              <p>Pesanan baru dari pembeli akan muncul di sini.</p>
            </div>
          )}
        </div>
      )}

      {/* Konten Tab 4: Profil Toko Fisik */}
      {activeSubTab === 'shop' && (
        <div className="seller-tab-content">
          <div className="content-action-head">
            <h3>Informasi Kios & Toko Fisik</h3>
            <span className="form-sub-desc">
              Informasi ini ditampilkan kepada pembeli agar mereka dapat datang langsung ke tokomu.
            </span>
          </div>

          <div className="shop-details-card">
            <div className="shop-info-grid">
              <div className="info-field">
                <label>Nama Toko</label>
                <strong>{shopInfo.name}</strong>
              </div>
              <div className="info-field">
                <label>Pemilik Toko</label>
                <span>{shopInfo.owner}</span>
              </div>
              <div className="info-field">
                <label>Sentra Pasar Fisik</label>
                <span>{shopInfo.market}</span>
              </div>
              <div className="info-field">
                <label>Kota</label>
                <span>{shopInfo.city}</span>
              </div>
              <div className="info-field">
                <label>Jam Operasional</label>
                <span>{shopInfo.hours}</span>
              </div>
              <div className="info-field">
                <label>Nomor WhatsApp Toko</label>
                <span>{shopInfo.whatsapp}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
