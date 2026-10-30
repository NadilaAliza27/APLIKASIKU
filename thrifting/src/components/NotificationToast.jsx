import { useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';

export default function NotificationToast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-notification-wrap">
      <div className="toast-notification">
        <span className="toast-icon">
          <Heart size={16} fill="currentColor" />
        </span>
        <span className="toast-message">{message}</span>
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Tutup notifikasi"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
