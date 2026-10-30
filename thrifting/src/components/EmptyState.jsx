import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ search, activeCategory, onReset }) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">
        <SearchX size={36} strokeWidth={1.5} />
      </div>
      <h3>Belum Ada Temuan yang Cocok</h3>
      <p>
        {search ? (
          <>
            Tidak menemukan produk dengan kata kunci "<strong>{search}</strong>"
            {activeCategory !== 'Semua' && ` di kategori ${activeCategory}`}.
          </>
        ) : (
          <>Tidak ada barang thrift yang sesuai dengan filter yang dipilih saat ini.</>
        )}
      </p>
      <div className="empty-state-suggestions">
        <small>Tips pencarian: Coba kata kunci umum seperti "jaket", "kemeja", "denim", atau nama kota seperti "Senen" atau "Bandung".</small>
      </div>
      <button
        type="button"
        className="btn-reset-filter"
        onClick={onReset}
      >
        <RotateCcw size={15} />
        <span>Reset Semua Filter & Pencarian</span>
      </button>
    </div>
  );
}
