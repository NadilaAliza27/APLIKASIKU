import { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function CheckoutModal({
  product,
  onClose,
  onConfirmOrder,
  coinBalance = 0
}) {
  const [shippingMethod, setShippingMethod] = useState({
    name: 'JNE Reguler',
    cost: 18000,
    estimate: '2-3 hari'
  });
  const [paymentMethod, setPaymentMethod] = useState('QRIS (Gopay / OVO / Dana / BCA)');
  const [useCoins, setUseCoins] = useState(false);

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

  const productPrice = product.price;
  const shippingCost = shippingMethod.cost;
  // Koin bisa dipakai max 10.000 atau saldo yang ada
  const maxCoinsUsable = Math.min(coinBalance, 10000);
  const coinDiscount = useCoins ? maxCoinsUsable : 0;
  const totalAmount = productPrice + shippingCost - coinDiscount;

  function handleSubmit(e) {
    e.preventDefault();
    const newOrder = {
      id: `TRF-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB',
      shop: product.shop,
      shopLocation: product.location,
      status: 'unpaid', // Masuk ke Belum Dibayar
      statusLabel: 'Belum Dibayar',
      product: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        size: product.size || 'Free Size',
        condition: product.condition,
        image: product.image
      },
      shippingMethod: `${shippingMethod.name} (${shippingMethod.estimate})`,
      shippingCost,
      coinDiscount,
      totalAmount,
      paymentMethod,
      shippingAddress: {
        recipient: 'Raditya Pratama',
        phone: '0812-3456-7890',
        address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, 12190'
      },
      trackingNumber: null,
      timeline: [
        {
          time: 'Baru saja',
          text: `Pesanan dibuat. Menunggu pembayaran via ${paymentMethod} (DEMO).`
        }
      ]
    };

    onConfirmOrder(newOrder, coinDiscount);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal-header">
          <div>
            <h3 className="checkout-title">Checkout Pesanan</h3>
            <span className="checkout-badge-demo">PROTOTIPE DEMO</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup checkout"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-scroll-area">
            {/* 1. Alamat Pengiriman Demo */}
            <div className="checkout-section-box">
              <div className="section-head-mini">
                <MapPin size={14} className="icon-sage" />
                <span>Alamat Pengiriman (Demo)</span>
              </div>
              <div className="address-display-box">
                <div className="address-recipient">
                  <strong>Raditya Pratama</strong>
                  <span className="address-phone">(0812-3456-7890)</span>
                </div>
                <p className="address-text">
                  Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, 12190
                </p>
                <span className="address-badge-home">Alamat Utama</span>
              </div>
            </div>

            {/* 2. Rincian Produk */}
            <div className="checkout-section-box">
              <span className="section-label-seller">Toko: <strong>{product.shop}</strong></span>
              <div className="checkout-product-preview">
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  className="checkout-thumb"
                />
                <div className="checkout-product-meta">
                  <h4 className="checkout-product-name">{product.name}</h4>
                  <span className="checkout-product-spec">
                    {product.size} • {product.condition}
                  </span>
                  <strong className="checkout-product-price">
                    Rp {product.price.toLocaleString('id-ID')}
                  </strong>
                </div>
              </div>
            </div>

            {/* 3. Pilihan Pengiriman */}
            <div className="checkout-section-box">
              <div className="section-head-mini">
                <Truck size={14} className="icon-sage" />
                <span>Pilih Opsi Pengiriman</span>
              </div>
              <div className="shipping-options-list">
                {[
                  { name: 'JNE Reguler', cost: 18000, estimate: '2-3 hari' },
                  { name: 'SiCepat BEST', cost: 22000, estimate: '1-2 hari' },
                  { name: 'J&T Express', cost: 19000, estimate: '2-3 hari' }
                ].map((ship) => (
                  <label
                    key={ship.name}
                    className={`shipping-choice-item ${shippingMethod.name === ship.name ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={shippingMethod.name === ship.name}
                      onChange={() => setShippingMethod(ship)}
                    />
                    <div className="choice-text-col">
                      <span className="choice-title">{ship.name}</span>
                      <small className="choice-sub">Estimasi tiba: {ship.estimate}</small>
                    </div>
                    <span className="choice-cost">Rp {ship.cost.toLocaleString('id-ID')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Metode Pembayaran Demo */}
            <div className="checkout-section-box">
              <div className="section-head-mini">
                <CreditCard size={14} className="icon-sage" />
                <span>Metode Pembayaran (Demo)</span>
              </div>
              <div className="payment-options-list">
                {[
                  { label: 'QRIS (Gopay / OVO / Dana / BCA)', icon: <QrCode size={15} /> },
                  { label: 'Transfer Virtual Account (BCA/Mandiri/BRI)', icon: <CreditCard size={15} /> },
                  { label: 'Bayar Tunai di Kios Fisik (Ambil Sendiri)', icon: <Banknote size={15} /> }
                ].map((pay) => (
                  <label
                    key={pay.label}
                    className={`payment-choice-item ${paymentMethod === pay.label ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentMethod === pay.label}
                      onChange={() => setPaymentMethod(pay)}
                    />
                    <span className="payment-icon-wrap">{pay.icon}</span>
                    <span className="payment-label-text">{pay.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Loyalty Koin Thrifting */}
            {coinBalance > 0 && (
              <div className="checkout-section-box coins-box">
                <div className="coins-toggle-row">
                  <div className="coins-lead">
                    <Coins size={16} className="icon-lime" />
                    <div>
                      <strong>Gunakan Koin Thrifting</strong>
                      <small>Saldo Koin: {coinBalance.toLocaleString('id-ID')} Koin</small>
                    </div>
                  </div>
                  <label className="switch-toggle">
                    <input
                      type="checkbox"
                      checked={useCoins}
                      onChange={(e) => setUseCoins(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                {useCoins && (
                  <p className="coins-used-desc">
                    Hemat <strong>Rp {maxCoinsUsable.toLocaleString('id-ID')}</strong> dengan penukaran {maxCoinsUsable.toLocaleString('id-ID')} Koin Thrifting.
                  </p>
                )}
              </div>
            )}

            {/* 6. Ringkasan Pembayaran */}
            <div className="checkout-section-box summary-box">
              <div className="summary-row">
                <span>Subtotal Produk</span>
                <span>Rp {productPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="summary-row">
                <span>Biaya Pengiriman ({shippingMethod.name})</span>
                <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
              </div>
              {useCoins && (
                <div className="summary-row discount">
                  <span>Diskon Koin Thrifting</span>
                  <span>- Rp {coinDiscount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="summary-row total">
                <strong>Total Pembayaran</strong>
                <strong className="total-highlight">
                  Rp {totalAmount.toLocaleString('id-ID')}
                </strong>
              </div>
            </div>
          </div>

          <div className="checkout-footer">
            <button type="submit" className="btn-confirm-checkout">
              <span>Konfirmasi & Buat Pesanan</span>
              <ArrowRight size={16} />
            </button>
            <small className="checkout-disclaimer">
              ✦ Ini adalah alur prototipe demo. Tidak ada pemotongan saldo riil.
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
