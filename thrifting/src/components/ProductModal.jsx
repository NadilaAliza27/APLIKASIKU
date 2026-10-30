import { useState, useEffect } from 'react';
import {
  X,
  Heart,
  MapPin,
  Store,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Banknote
} from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function ProductModal({
  product,
  isFavorite = false,
  onClose,
  onToggleFavorite
}) {
  const [selectedPayment, setSelectedPayment] = useState('QRIS');

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
  const whatsappUrl = `https://wa.me/${product.whatsapp || '6281234567890'}?text=${encodeURIComponent(
    `Halo ${product.shop}, saya tertarik dengan barang "${product.name}" (${formattedPrice}) di Thrifting. Saya ingin bayar via ${selectedPayment}. Apakah masih tersedia?`
  )}`;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modern-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        <div className="modern-modal-layout">
          {/* Sisi Kiri: Gambar Produk */}
          <div className="modal-media-wrapper">
            <SafeImage
              src={product.image}
              alt={product.name}
              category={product.category}
              className="modal-product-img"
            />
            <div className="modal-img-badge">
              <ShieldCheck size={14} />
              <span>{product.condition}</span>
            </div>
          </div>

          {/* Sisi Kanan: Informasi, Pembayaran & Aksi */}
          <div className="modal-content-wrapper">
            <div className="modal-top-meta">
              <span className="modal-cat-tag">{product.category}</span>
              <span className="modal-status-tag">
                <CheckCircle2 size={13} /> 1 Item Saja (One-off Thrift)
              </span>
            </div>

            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-price">{formattedPrice}</div>

            {/* Spesifikasi Grid */}
            <div className="modal-specs-grid">
              <div className="spec-card">
                <span className="spec-title">Ukuran / Size</span>
                <strong className="spec-data">{product.size || 'Free Size'}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-title">Material / Bahan</span>
                <strong className="spec-data">{product.material || 'Standar Thrift'}</strong>
              </div>
              <div className="spec-card full">
                <span className="spec-title">Catatan Detail Kondisi</span>
                <p className="spec-desc">{product.conditionNotes || 'Kondisi pre-loved terawat, siap pakai.'}</p>
              </div>
            </div>

            {/* Pilihan Metode Pembayaran */}
            <div className="modal-payment-section">
              <span className="spec-title">Pilih Metode Pembayaran:</span>
              <div className="payment-options-grid">
                <button
                  type="button"
                  className={`payment-choice-pill ${selectedPayment === 'QRIS' ? 'active' : ''}`}
                  onClick={() => setSelectedPayment('QRIS')}
                >
                  <QrCode size={14} />
                  <span>QRIS (GoPay/OVO/DANA/ShopeePay)</span>
                </button>

                <button
                  type="button"
                  className={`payment-choice-pill ${selectedPayment === 'Transfer Bank' ? 'active' : ''}`}
                  onClick={() => setSelectedPayment('Transfer Bank')}
                >
                  <CreditCard size={14} />
                  <span>Transfer Bank (BCA/Mandiri/BRI)</span>
                </button>

                <button
                  type="button"
                  className={`payment-choice-pill ${selectedPayment === 'Tunai di Toko Fisik' ? 'active' : ''}`}
                  onClick={() => setSelectedPayment('Tunai di Toko Fisik')}
                >
                  <Banknote size={14} />
                  <span>Bayar Langsung di Kios Fisik</span>
                </button>
              </div>
            </div>

            {/* Lokasi Toko Seller */}
            <div className="modal-seller-card">
              <div className="seller-card-header">
                <div className="seller-icon-box">
                  <Store size={18} />
                </div>
                <div>
                  <h4 className="seller-name">{product.shop}</h4>
                  <span className="seller-city">
                    <MapPin size={12} /> {product.location}
                  </span>
                </div>
              </div>
              {product.storeAddress && (
                <div className="seller-address-box">
                  <strong>Lokasi Kios / Booth Fisik:</strong>
                  <p>{product.storeAddress}</p>
                </div>
              )}
            </div>

            {/* Tombol Aksi */}
            <div className="modal-buttons-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-chat"
              >
                <MessageCircle size={18} />
                <span>Chat Seller & Pesan ({selectedPayment})</span>
              </a>

              <button
                type="button"
                className={`btn-modal-fav ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(product.id)}
                aria-label={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                <Heart size={18} fill={isFavorite ? '#e11d48' : 'none'} stroke={isFavorite ? '#e11d48' : 'currentColor'} />
                <span>{isFavorite ? 'Disimpan' : 'Favorit'}</span>
              </button>
            </div>

            <p className="modal-disclaimer">
              ✦ Pembayaran aman langsung ke seller atau bayar di kasir saat mengunjungi toko fisik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
