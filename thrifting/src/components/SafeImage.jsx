import { useState } from 'react';
import { ShoppingBag, ImageOff } from 'lucide-react';

/**
 * Komponen gambar aman dengan penanganan fallback otomatis.
 * Jika URL gambar publik gagal dimuat atau koneksi offline,
 * komponen ini akan menampilkan visual placeholder minimalis yang elegan
 * sehingga tampilan antarmuka tetap rapi dan tidak rusak.
 */
export default function SafeImage({ src, alt, className = '', category = 'Thrift' }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div className={`image-fallback-container ${className}`}>
        <div className="fallback-inner">
          <div className="fallback-icon-wrap">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </div>
          <span className="fallback-category">{category}</span>
          <span className="fallback-label" title={alt}>{alt || 'Produk Thrift'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`safe-image-wrapper ${isLoading ? 'is-loading' : ''} ${className}`}>
      <img
        src={src}
        alt={alt || 'Foto produk thrift'}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
