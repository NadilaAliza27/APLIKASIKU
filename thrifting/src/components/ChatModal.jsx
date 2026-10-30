import { useState, useEffect, useRef } from 'react';
import { X, Send, Store, MapPin, CheckCheck, MessageCircle } from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function ChatModal({
  product,
  onClose,
  onStartCheckout
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'seller',
      text: `Halo kak! Terima kasih sudah mampir ke toko kami. Ada yang bisa kami bantu mengenai "${product?.name || 'barang ini'}"?`,
      time: '10:00'
    },
    {
      id: 2,
      sender: 'buyer',
      text: 'Halo kak, apakah barangnya masih ada? Bahannya adem nggak ya kak?',
      time: '10:02'
    },
    {
      id: 3,
      sender: 'seller',
      text: 'Masih ready kak! Stok hanya 1 pcs yaa. Bahannya adem banget dan sudah kami dry clean steril siap pakai.',
      time: '10:03'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  function handleSend(e) {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'buyer',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Simulasi balasan otomatis seller demo setelah 1.5 detik
    setTimeout(() => {
      const sellerReply = {
        id: Date.now() + 1,
        sender: 'seller',
        text: 'Siap kak! Mau langsung dibeli lewat tombol "Beli Sekarang", atau mau kami simpankan dulu?',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, sellerReply]);
    }, 1500);
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="chat-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Chat */}
        <div className="chat-modal-header">
          <div className="chat-shop-identity">
            <div className="chat-avatar-box">
              <Store size={18} />
            </div>
            <div>
              <div className="chat-shop-name-row">
                <strong>{product.shop}</strong>
                <span className="online-indicator-pill">Online</span>
              </div>
              <small className="chat-shop-city">
                <MapPin size={10} /> {product.location}
              </small>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Pinned Product Header */}
        <div className="chat-product-pinned-bar">
          <SafeImage src={product.image} alt={product.name} className="chat-pinned-thumb" />
          <div className="chat-pinned-info">
            <h5>{product.name}</h5>
            <span className="chat-pinned-price">Rp {product.price.toLocaleString('id-ID')}</span>
          </div>
          <button
            type="button"
            className="btn-chat-buy-direct"
            onClick={() => {
              onClose();
              onStartCheckout(product);
            }}
          >
            Beli
          </button>
        </div>

        {/* Chat History Container */}
        <div className="chat-messages-container">
          <div className="chat-disclaimer-pill">
            Simulasi Percakapan Demo dengan Seller
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-message-row ${m.sender === 'buyer' ? 'is-self' : 'is-seller'}`}
            >
              <div className="chat-bubble">
                <p className="chat-bubble-text">{m.text}</p>
                <div className="chat-bubble-time">
                  <span>{m.time}</span>
                  {m.sender === 'buyer' && <CheckCheck size={12} className="check-read" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="chat-input-row">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Tulis pesan ke seller..."
            aria-label="Ketik pesan"
          />
          <button
            type="submit"
            className="btn-chat-send"
            disabled={!inputVal.trim()}
            aria-label="Kirim pesan"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
