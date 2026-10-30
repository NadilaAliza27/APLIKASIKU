import { useState, useEffect, useRef } from 'react';
import {
  X,
  Radio,
  Eye,
  Send,
  ShoppingBag,
  Store,
  MapPin,
  Heart,
  Sparkles,
  Volume2
} from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function LiveRoomModal({
  session,
  products = [],
  onClose,
  onStartCheckout,
  onOpenProductDetail
}) {
  const [comments, setComments] = useState(session?.demoComments || []);
  const [newComment, setNewComment] = useState('');
  const [liveLikes, setLiveLikes] = useState(142);
  const [isLiked, setIsLiked] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto scroll chat to bottom when new comment arrives
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

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

  if (!session) return null;

  // Temukan produk yang sedang di-pin dalam live ini
  const featuredProduct = products.find((p) => p.id === session.featuredProductId) || products[0];

  function handleSendComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = {
      id: Date.now(),
      user: 'kamu',
      text: newComment.trim(),
      time: 'Baru saja'
    };
    setComments((prev) => [...prev, added]);
    setNewComment('');
  }

  function handleLike() {
    setLiveLikes((prev) => prev + 1);
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 500);
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="live-room-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Live Room */}
        <div className="live-room-header">
          <div className="live-seller-identity">
            <img src={session.avatar} alt={session.shop} className="live-avatar" />
            <div>
              <div className="seller-name-row">
                <strong>{session.shop}</strong>
                <span className="live-red-pill">
                  <Radio size={11} /> LIVE DEMO
                </span>
              </div>
              <small className="seller-location-sub">
                <MapPin size={10} /> {session.location}
              </small>
            </div>
          </div>

          <div className="live-header-right">
            <span className="viewer-counter">
              <Eye size={13} /> {session.viewers} menonton
            </span>
            <button
              type="button"
              className="live-close-btn"
              onClick={onClose}
              aria-label="Tutup live"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Live Main Layout: Left Video, Right Interactive Panel */}
        <div className="live-layout-split">
          {/* Sisi Kiri: Video Showcase Focus */}
          <div className="live-video-stage">
            <div className="video-background-layer">
              <img
                src={session.thumbnail}
                alt={session.title}
                className="video-simulated-stream"
              />
              <div className="video-dark-scrim"></div>
            </div>

            {/* Video Overlays */}
            <div className="video-top-tag">
              <span className="demo-stream-notice">
                SIMULASI VIDEO STREAMING (PROTOTIPE DEMO)
              </span>
            </div>

            <div className="video-bottom-caption">
              <h3 className="live-session-headline">{session.title}</h3>
              <p className="live-session-desc">
                Seller sedang memperlihatkan detail serat kain, jahitan, dan ukuran pakaian secara langsung.
              </p>
            </div>

            {/* Floating Quick Pin Card */}
            {featuredProduct && (
              <div className="live-pinned-card">
                <SafeImage
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="pinned-thumb"
                />
                <div className="pinned-meta">
                  <span className="pinned-badge">SEDANG DITAMPILKAN</span>
                  <h4 className="pinned-name">{featuredProduct.name}</h4>
                  <span className="pinned-price">
                    Rp {featuredProduct.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-buy-live"
                  onClick={() => {
                    onClose();
                    onStartCheckout(featuredProduct);
                  }}
                >
                  <ShoppingBag size={14} />
                  <span>Beli</span>
                </button>
              </div>
            )}
          </div>

          {/* Sisi Kanan: Live Chat & Product Catalog Drawer */}
          <div className="live-sidebar-pane">
            <div className="sidebar-section-title">
              <span>Percakapan Live ({comments.length})</span>
              <button
                type="button"
                className={`btn-like-live ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                title="Suka sesi live ini"
              >
                <Heart size={14} fill={isLiked ? '#c0392b' : 'none'} />
                <span>{liveLikes}</span>
              </button>
            </div>

            {/* Chat Messages List */}
            <div className="live-chat-messages">
              <div className="system-welcome-bubble">
                Selamat datang di Thrifting Live! Tanyakan detail ukuran dan minus langsung ke seller via chat di bawah.
              </div>
              {comments.map((c) => (
                <div
                  key={c.id}
                  className={`chat-bubble-row ${c.user === 'kamu' ? 'is-self' : ''}`}
                >
                  <span className="chat-username">{c.user}:</span>
                  <span className="chat-text-content">{c.text}</span>
                </div>
              ))}
              <div ref={chatBottomRef}></div>
            </div>

            {/* Input Kirim Komentar */}
            <form onSubmit={handleSendComment} className="live-chat-form">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis pertanyaan ke seller..."
                aria-label="Komentar live"
              />
              <button
                type="submit"
                className="btn-send-chat"
                aria-label="Kirim"
                disabled={!newComment.trim()}
              >
                <Send size={15} />
              </button>
            </form>

            {/* Produk Terkait dalam Sesi Live Ini */}
            <div className="live-products-strip">
              <span className="strip-title">Katalog Sesi Live Ini</span>
              <div className="live-products-list">
                {products.slice(0, 3).map((item) => (
                  <div key={item.id} className="live-product-mini-item">
                    <SafeImage src={item.image} alt={item.name} className="mini-thumb" />
                    <div className="mini-meta">
                      <h5>{item.name}</h5>
                      <strong>Rp {item.price.toLocaleString('id-ID')}</strong>
                    </div>
                    <button
                      type="button"
                      className="btn-mini-checkout"
                      onClick={() => {
                        onClose();
                        onStartCheckout(item);
                      }}
                    >
                      Beli
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
