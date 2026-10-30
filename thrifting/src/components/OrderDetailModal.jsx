import { useEffect } from 'react';
import {
  X,
  MapPin,
  Truck,
  CreditCard,
  Store,
  Package,
  Clock,
  CheckCircle2,
  Star
} from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function OrderDetailModal({
  order,
  onClose,
  onPayOrder,
  onConfirmReceived,
  onOpenReview
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

  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="order-detail-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="order-modal-header">
          <div>
            <span className="order-id-label">Pesanan #{order.id}</span>
            <div className="order-status-pill-wrap">
              <span className={`status-badge ${order.status}`}>
                {order.statusLabel}
              </span>
              <span className="order-date-text">{order.date}</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup detail pesanan"
          >
            <X size={18} />
          </button>
        </div>

        <div className="order-modal-scroll">
          {/* Tracking / Kurir Info */}
          {order.trackingNumber && (
            <div className="order-tracking-strip">
              <Truck size={16} className="tracking-icon" />
              <div className="tracking-text">
                <strong>Nomor Resi: {order.trackingNumber}</strong>
                <span>Pengiriman via {order.shippingMethod}</span>
              </div>
            </div>
          )}

          {/* Rincian Produk */}
          <div className="order-section-item">
            <span className="section-head-text">Barang yang Dibeli</span>
            <div className="order-product-card">
              <SafeImage
                src={order.product.image}
                alt={order.product.name}
                className="order-detail-thumb"
              />
              <div className="order-product-details">
                <span className="shop-name-tag">
                  <Store size={12} /> {order.shop}
                </span>
                <h4 className="product-title-large">{order.product.name}</h4>
                <span className="product-spec-sub">
                  {order.product.size} • {order.product.condition}
                </span>
                <strong className="product-price-amount">
                  Rp {order.product.price.toLocaleString('id-ID')}
                </strong>
              </div>
            </div>
          </div>

          {/* Timeline Riwayat Pesanan (Format List Rapi, Waktu Terpisah & Tidak Ditumpuk) */}
          <div className="order-section-item">
            <div className="section-head-row">
              <Clock size={14} className="icon-sage" />
              <span className="section-head-text">Timeline & Riwayat Status Pesanan</span>
            </div>

            <div className="timeline-list">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-bullet-wrap">
                    <span className="timeline-dot"></span>
                    {idx < order.timeline.length - 1 && <span className="timeline-line"></span>}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time-badge">
                      <Clock size={11} />
                      <span>{step.time}</span>
                    </div>
                    <p className="timeline-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alamat Pengiriman */}
          <div className="order-section-item">
            <span className="section-head-text">Alamat Pengiriman (Demo)</span>
            <div className="order-address-box">
              <strong>{order.shippingAddress.recipient} ({order.shippingAddress.phone})</strong>
              <p>{order.shippingAddress.address}</p>
            </div>
          </div>

          {/* Penilaian / Review Jika Sudah Selesai */}
          {order.status === 'completed' && order.review && (
            <div className="order-section-item review-done-box">
              <span className="section-head-text">Penilaian dari Anda</span>
              <div className="reviewed-content">
                <div className="stars-display">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < order.review.rating ? '#293D30' : 'none'}
                      stroke="#293D30"
                    />
                  ))}
                  <span className="reviewed-date">Diberikan pada {order.review.reviewedAt}</span>
                </div>
                <p className="reviewed-comment">"{order.review.comment}"</p>
                <span className="reviewed-match-tag">
                  ✓ Kondisi Sesuai Catatan Seller
                </span>
              </div>
            </div>
          )}

          {/* Rincian Biaya */}
          <div className="order-section-item cost-breakdown">
            <span className="section-head-text">Rincian Pembayaran</span>
            <div className="breakdown-row">
              <span>Harga Barang</span>
              <span>Rp {order.product.price.toLocaleString('id-ID')}</span>
            </div>
            <div className="breakdown-row">
              <span>Ongkos Kirim</span>
              <span>Rp {order.shippingCost.toLocaleString('id-ID')}</span>
            </div>
            {order.coinDiscount > 0 && (
              <div className="breakdown-row discount">
                <span>Potongan Koin Thrifting</span>
                <span>- Rp {order.coinDiscount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="breakdown-row total">
              <strong>Total Akhir</strong>
              <strong className="total-highlight">
                Rp {order.totalAmount.toLocaleString('id-ID')}
              </strong>
            </div>
            <div className="payment-method-footer">
              <CreditCard size={14} />
              <span>Metode: {order.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="order-modal-footer">
          {order.status === 'unpaid' && (
            <button
              type="button"
              className="btn-action-pay"
              onClick={() => {
                onClose();
                onPayOrder(order.id);
              }}
            >
              Bayar Sekarang (DEMO)
            </button>
          )}

          {order.status === 'shipped' && (
            <button
              type="button"
              className="btn-action-confirm"
              onClick={() => {
                onClose();
                onConfirmReceived(order.id);
              }}
            >
              Konfirmasi Terima Barang & Ambil Koin
            </button>
          )}

          {order.status === 'completed' && !order.review && (
            <button
              type="button"
              className="btn-action-review"
              onClick={() => {
                onClose();
                onOpenReview(order);
              }}
            >
              Beri Ulasan (+2.500 Koin)
            </button>
          )}

          <button type="button" className="btn-modal-back" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
