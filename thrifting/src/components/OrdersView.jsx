import { useState } from 'react';
import { Package, Store, Clock, ArrowRight, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function OrdersView({
  orders = [],
  onSelectOrder,
  onPayOrder,
  onConfirmReceived,
  onOpenReview,
  onGoShopping
}) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filterTabs = [
    { key: 'all', label: 'Semua' },
    { key: 'unpaid', label: 'Belum Dibayar' },
    { key: 'packing', label: 'Dikemas' },
    { key: 'shipped', label: 'Dikirim' },
    { key: 'completed', label: 'Selesai' }
  ];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  return (
    <div className="orders-page-container">
      {/* Header Halaman Pesanan */}
      <div className="orders-header-block">
        <div>
          <span className="eyebrow-text">TRANSAKSI & RIWAYAT</span>
          <h1 className="orders-main-title">Pesanan Saya</h1>
        </div>
        <span className="orders-demo-pill">PROTOTIPE DEMO</span>
      </div>

      {/* Status Tabs Navigation */}
      <div className="orders-status-tabs-strip" role="tablist">
        {filterTabs.map((tab) => {
          const count = orders.filter((o) => tab.key === 'all' || o.status === tab.key).length;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={statusFilter === tab.key}
              className={`order-tab-btn ${statusFilter === tab.key ? 'is-active' : ''}`}
              onClick={() => setStatusFilter(tab.key)}
            >
              <span>{tab.label}</span>
              {count > 0 && <span className="tab-bubble-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="orders-list-col">
          {filteredOrders.map((order) => (
            <article key={order.id} className="order-summary-card">
              {/* Card Header */}
              <div className="order-card-header">
                <div className="order-shop-identity">
                  <Store size={14} className="icon-sage" />
                  <strong>{order.shop}</strong>
                  <span className="shop-loc-sub">• {order.shopLocation.split(',')[0]}</span>
                </div>
                <div className="order-status-right">
                  <span className="order-date-mini">{order.date}</span>
                  <span className={`status-pill ${order.status}`}>
                    {order.statusLabel}
                  </span>
                </div>
              </div>

              {/* Card Product Item */}
              <div
                className="order-product-preview-row"
                onClick={() => onSelectOrder(order)}
                role="button"
                tabIndex={0}
              >
                <SafeImage
                  src={order.product.image}
                  alt={order.product.name}
                  className="order-card-thumb"
                />
                <div className="order-product-info-col">
                  <h4 className="order-item-title">{order.product.name}</h4>
                  <span className="order-item-spec">
                    {order.product.size} • {order.product.condition}
                  </span>
                  <span className="order-item-qty">1 barang</span>
                </div>
                <div className="order-product-price-col">
                  <span className="price-tag-sub">Harga</span>
                  <strong>Rp {order.product.price.toLocaleString('id-ID')}</strong>
                </div>
              </div>

              {/* Card Footer: Total & Actions */}
              <div className="order-card-footer">
                <div className="order-total-group">
                  <span className="total-label">Total Pesanan:</span>
                  <strong className="total-val">
                    Rp {order.totalAmount.toLocaleString('id-ID')}
                  </strong>
                </div>

                <div className="order-actions-group">
                  {order.status === 'unpaid' && (
                    <button
                      type="button"
                      className="btn-order-action primary"
                      onClick={() => onPayOrder(order.id)}
                    >
                      Bayar Sekarang (DEMO)
                    </button>
                  )}

                  {order.status === 'packing' && (
                    <span className="order-status-hint">
                      <Clock size={13} /> Seller sedang menyiapkan barang
                    </span>
                  )}

                  {order.status === 'shipped' && (
                    <button
                      type="button"
                      className="btn-order-action success"
                      onClick={() => onConfirmReceived(order.id)}
                    >
                      Konfirmasi Diterima
                    </button>
                  )}

                  {order.status === 'completed' && !order.review && (
                    <button
                      type="button"
                      className="btn-order-action secondary"
                      onClick={() => onOpenReview(order)}
                    >
                      <Star size={13} />
                      <span>Beri Ulasan (+2.500 Koin)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn-order-action outline"
                    onClick={() => onSelectOrder(order)}
                  >
                    Detail Pesanan
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="orders-empty-state">
          <div className="empty-icon-wrap">
            <Package size={32} />
          </div>
          <h3>Belum Ada Pesanan di Status Ini</h3>
          <p>
            Semua pakaian pre-loved pilihanmu akan tercatat rapi di sini setelah kamu melakukan checkout.
          </p>
          <button
            type="button"
            className="btn-primary-explore"
            onClick={onGoShopping}
          >
            <span>Mulai Jelajah Katalog</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
