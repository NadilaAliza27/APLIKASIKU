import { useState, useEffect } from 'react';
import { X, Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function ReviewModal({
  order,
  onClose,
  onSubmitReview
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [conditionMatch, setConditionMatch] = useState('sesuai');

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    const reviewData = {
      rating,
      conditionMatch: conditionMatch === 'sesuai',
      comment: comment.trim(),
      reviewedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    onSubmitReview(order.id, reviewData);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="review-modal-header">
          <div>
            <h3 className="review-modal-title">Beri Penilaian & Ulasan</h3>
            <span className="review-sub">Pesanan #{order.id} • {order.shop}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup ulasan"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          {/* Item Preview */}
          <div className="review-product-box">
            <SafeImage
              src={order.product.image}
              alt={order.product.name}
              className="review-thumb"
            />
            <div>
              <h4 className="review-item-name">{order.product.name}</h4>
              <span className="review-item-spec">{order.product.size} • {order.product.condition}</span>
            </div>
          </div>

          {/* Bintang Rating */}
          <div className="rating-selector-col">
            <label className="rating-label">Bagaimana kepuasanmu terhadap barang ini?</label>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="star-btn"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  aria-label={`Bintang ${star}`}
                >
                  <Star
                    size={28}
                    fill={(hoverRating || rating) >= star ? '#D4E06D' : 'none'}
                    stroke={(hoverRating || rating) >= star ? '#293D30' : '#E7E5DC'}
                  />
                </button>
              ))}
              <span className="rating-word">
                {rating === 5 && 'Sangat Puas!'}
                {rating === 4 && 'Puas'}
                {rating === 3 && 'Cukup'}
                {rating === 2 && 'Kurang Puas'}
                {rating === 1 && 'Kecewa'}
              </span>
            </div>
          </div>

          {/* Kesesuaian Kondisi */}
          <div className="condition-verify-col">
            <label className="rating-label">Apakah kondisi fisik sesuai dengan catatan seller?</label>
            <div className="radio-pills-row">
              <label className={`radio-pill-item ${conditionMatch === 'sesuai' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="conditionMatch"
                  value="sesuai"
                  checked={conditionMatch === 'sesuai'}
                  onChange={() => setConditionMatch('sesuai')}
                />
                <CheckCircle2 size={15} />
                <span>Ya, Sesuai Deskripsi</span>
              </label>
              <label className={`radio-pill-item ${conditionMatch === 'tidak' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="conditionMatch"
                  value="tidak"
                  checked={conditionMatch === 'tidak'}
                  onChange={() => setConditionMatch('tidak')}
                />
                <span>Ada Minus Tambahan</span>
              </label>
            </div>
          </div>

          {/* Ulasan Teks */}
          <div className="comment-input-col">
            <label htmlFor="reviewComment" className="rating-label">Ulasan Pengalaman Kamu</label>
            <textarea
              id="reviewComment"
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan kebersihan pakaian, aroma, kerapian jahitan, dan keramahan seller..."
            />
          </div>

          <div className="review-footer">
            <button type="submit" className="btn-submit-review">
              Kirim Penilaian & Dapatkan 2.500 Koin
            </button>
            <small className="review-disclaimer">
              ✦ Ulasan akan tercatat pada data demo dan memberi reward Koin Thrifting ke akunmu.
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
