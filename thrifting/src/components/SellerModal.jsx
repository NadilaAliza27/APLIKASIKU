import { useState, useEffect } from 'react';
import { X, Store, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function SellerModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    city: 'Jakarta',
    hasPhysicalStore: 'ya',
    address: '',
    category: 'Vintage & Streetwear',
    whatsapp: '',
    instagram: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  function handleReset() {
    setIsSubmitted(false);
    setFormData({
      shopName: '',
      ownerName: '',
      city: 'Jakarta',
      hasPhysicalStore: 'ya',
      address: '',
      category: 'Vintage & Streetwear',
      whatsapp: '',
      instagram: ''
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modern-modal-dialog seller-dialog-size" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Tutup form"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div className="seller-form-wrapper">
            <div className="modal-top-meta">
              <span className="modal-cat-tag">KEMITRAAN SELLER</span>
            </div>

            <h2 className="seller-modal-heading">Daftarkan Toko Thrift Anda</h2>
            <p className="seller-modal-sub">
              Tampilkan barang pre-loved toko Anda kepada ribuan calon pembeli yang mencari barang secara online sebelum berkunjung ke toko fisik.
            </p>

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-field">
                <label htmlFor="shopName">Nama Toko Thrift / Seller *</label>
                <input
                  id="shopName"
                  name="shopName"
                  required
                  placeholder="Contoh: Arsip Lawas, Gedebage Heritage"
                  value={formData.shopName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="ownerName">Nama Pengelola *</label>
                  <input
                    id="ownerName"
                    name="ownerName"
                    required
                    placeholder="Nama lengkap Anda"
                    value={formData.ownerName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="city">Kota / Sentra Pasar *</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="Jakarta">Jakarta (Pasar Senen / Santa)</option>
                    <option value="Bandung">Bandung (Pasar Gedebage)</option>
                    <option value="Yogyakarta">Yogyakarta (Malioboro)</option>
                    <option value="Solo">Solo (Pasar Triwindu)</option>
                    <option value="Surabaya">Surabaya (Tunjungan)</option>
                    <option value="Kota Lain">Kota Lainnya di Indonesia</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Apakah Memiliki Kios / Toko Fisik?</label>
                <div className="radio-options-row">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="hasPhysicalStore"
                      value="ya"
                      checked={formData.hasPhysicalStore === 'ya'}
                      onChange={handleChange}
                    />
                    <span>Ya, punya kios fisik / booth pasar</span>
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="hasPhysicalStore"
                      value="tidak"
                      checked={formData.hasPhysicalStore === 'tidak'}
                      onChange={handleChange}
                    />
                    <span>Hanya online / studio rumahan</span>
                  </label>
                </div>
              </div>

              {formData.hasPhysicalStore === 'ya' && (
                <div className="form-field">
                  <label htmlFor="address">Alamat Kios / Patokan Toko Fisik</label>
                  <input
                    id="address"
                    name="address"
                    placeholder="Contoh: Blok III Lt. 2 No. 42 Pasar Senen"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="whatsapp">Nomor WhatsApp *</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="instagram">Username Instagram</label>
                  <input
                    id="instagram"
                    name="instagram"
                    placeholder="@nama_toko_thrift"
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn-form-submit">
                <span>Kirim Pendaftaran Toko</span>
                <ArrowRight size={17} />
              </button>

              <span className="form-note">
                ✦ Gratis kurasi awal untuk tahap prototipe. Data tercatat langsung di sistem peramban.
              </span>
            </form>
          </div>
        ) : (
          <div className="seller-success-box">
            <div className="success-icon-circle">
              <CheckCircle size={44} color="#10b981" />
            </div>
            <h3>Pendaftaran Toko Diterima!</h3>
            <p>
              Terima kasih <strong>{formData.ownerName || 'Kak'}</strong> telah mendaftarkan <strong>"{formData.shopName}"</strong>.
            </p>
            <p className="success-note">
              Tim kurator Thrifting akan segera menghubungi Anda melalui WhatsApp di <code>{formData.whatsapp}</code> untuk verifikasi katalog barang.
            </p>
            <button
              type="button"
              className="btn-hero-primary"
              onClick={handleReset}
            >
              Selesai & Kembali Menjelajah
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
