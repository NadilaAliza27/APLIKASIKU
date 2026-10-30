import { useEffect } from 'react';
import {
  X,
  Heart,
  MapPin,
  Store,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Info,
  CheckCircle2,
  ArrowRight,
  Clock
} from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function ProductDetailModal({
  product,
  isFavorite = false,
  onClose,
  onToggleFavorite,
  onStartCheckout,
  onOpenChat
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!product) return null;

  const formattedPrice = `Rp ${product.price.toLocaleString('id-ID')}`;

  // Pisahkan alamat fisik dan jam operasional agar tampil rapi sebagai list
  let physicalLocation = product.storeAddress || '';
  let openingHours = '';
  if (product.storeAddress && product.storeAddress.includes('(')) {
    const parts = product.storeAddress.split('(');
    physicalLocation = parts[0].trim();
    openingHours = parts[1].replace(')', '').trim();
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="detail-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Tutup detail produk"
        >
          <X size={18} />
        </button>

        <div className="detail-modal-grid">
          {/* Kolom Gambar */}
          <div className="detail-media-pane">
            <SafeImage
              src={product.image}
              alt={product.name}
              category={product.category}
              className="detail-main-image"
            />
            <div className="detail-condition-badge">
              <ShieldCheck size={14} />
              <span>{product.condition}</span>
            </div>
          </div>

          {/* Kolom Informasi & Aksi */}
          <div className="detail-info-pane">
            <div className="detail-meta-top">
              <span className="detail-category-tag">{product.category}</span>
              <span className="detail-stock-notice">
                <span className="stock-dot"></span>
                Stok 1 barang saja (One-off Thrift)
              </span>
            </div>

            <h2 className="detail-title">{product.name}</h2>
            <div className="detail-price-text">{formattedPrice}</div>

            {/* Spesifikasi Detail (List Card) */}
            <div className="detail-spec-grid">
              <div className="spec-cell">
                <span className="spec-label">Ukuran / Size</span>
                <span className="spec-value">{product.size || 'Free Size'}</span>
              </div>
              <div className="spec-cell">
                <span className="spec-label">Material / Bahan</span>
                <span className="spec-value">{product.material || 'Standar Thrift'}</span>
              </div>
              <div className="spec-cell full-width">
                <span className="spec-label">Kondisi & Catatan Fisik</span>
                <p className="spec-description">
                  {product.conditionNotes || 'Kondisi pakaian pre-loved terawat, siap dipakai.'}
                </p>
              </div>
            </div>

            {/* Informasi Seller & Toko Fisik (List Rapi & Waktu Terpisah) */}
            <div className="detail-seller-box">
              <div className="seller-header">
                <div className="seller-avatar-badge">
                  <Store size={18} />
                </div>
                <div className="seller-meta-info">
                  <h4 className="seller-name-heading">{product.shop}</h4>
                  <span className="seller-location-text">
                    <MapPin size={12} /> {product.location}
                  </span>
                </div>
              </div>

              {product.storeAddress && (
                <div className="seller-store-details-list">
                  <div className="store-detail-item">
                    <MapPin size={14} className="store-info-icon" />
                    <div>
                      <span className="store-info-label">Alamat Kios Fisik</span>
                      <p className="store-info-text">{physicalLocation}</p>
                    </div>
                  </div>

                  {openingHours && (
                    <div className="store-detail-item">
                      <Clock size={14} className="store-info-icon" />
                      <div>
                        <span className="store-info-label">Jadwal & Waktu Buka</span>
                        <p className="store-info-text time-highlight">{openingHours}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tombol Aksi Utama */}
            <div className="detail-actions-row">
              <button
                type="button"
                className="btn-primary-buy"
                onClick={() => {
                  onClose();
                  onStartCheckout(product);
                }}
              >
                <ShoppingBag size={17} />
                <span>Beli Sekarang</span>
              </button>

              <button
                type="button"
                className="btn-chat-seller"
                onClick={() => {
                  onClose();
                  onOpenChat(product);
                }}
                title="Chat Penjual"
              >
                <MessageCircle size={17} />
                <span>Chat</span>
              </button>

              <button
                type="button"
                className={`btn-detail-fav ${isFavorite ? 'is-active' : ''}`}
                onClick={() => onToggleFavorite(product.id)}
                aria-label={isFavorite ? 'Hapus dari favorit' : 'Simpan favorit'}
                title={isFavorite ? 'Hapus dari favorit' : 'Simpan favorit'}
              >
                <Heart
                  size={18}
                  fill={isFavorite ? '#c0392b' : 'none'}
                  stroke={isFavorite ? '#c0392b' : 'currentColor'}
                />
              </button>
            </div>

            <p className="detail-trust-note">
              ✦ Barang thrift kurasi unik. Dapat dikirim ke seluruh Indonesia atau cek langsung ke toko fisik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
