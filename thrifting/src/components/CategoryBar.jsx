import { Sparkles, Shirt, Layers, Scissors, Tag, Watch } from 'lucide-react';

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  const categoryItems = [
    { name: 'Semua', label: 'Semua Kategori', icon: <Sparkles size={18} /> },
    { name: 'Outerwear', label: 'Jaket & Outer', icon: <Layers size={18} /> },
    { name: 'Kemeja', label: 'Kemeja & Flannel', icon: <Shirt size={18} /> },
    { name: 'Kaos', label: 'Kaos & Vintage Tee', icon: <Tag size={18} /> },
    { name: 'Celana', label: 'Denim & Trousers', icon: <Scissors size={18} /> },
    { name: 'Aksesoris', label: 'Sepatu & Tas', icon: <Watch size={18} /> }
  ];

  function handleClick(catName) {
    onSelectCategory(catName);
    const catalogEl = document.getElementById('jelajah');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="category-section" id="kategori">
      <div className="category-section-inner">
        <div className="section-head-minimal">
          <div>
            <span className="eyebrow-modern">KATEGORI PILIHAN</span>
            <h2 className="title-modern">Eksplorasi Gaya Favoritmu</h2>
          </div>
          <p className="subtitle-modern">
            Temukan busana pre-loved sesuai kategori yang kamu cari dengan mudah dan cepat.
          </p>
        </div>

        <div className="category-card-grid">
          {categoryItems.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                className={`category-quick-card ${isActive ? 'is-active' : ''}`}
                onClick={() => handleClick(cat.name)}
              >
                <div className="cat-icon-circle">{cat.icon}</div>
                <span className="cat-card-name">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
