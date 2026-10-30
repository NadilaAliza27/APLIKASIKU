import { Heart, MapPin, Store } from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onSelectProduct
}) {
  const formattedPrice = `Rp ${product.price.toLocaleString('id-ID')}`;

  function handleFavoriteClick(e) {
    e.stopPropagation();
    onToggleFavorite(product.id);
  }

  return (
    <article
      className="product-card"
      onClick={() => onSelectProduct(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectProduct(product);
        }
      }}
      aria-label={`Lihat detail ${product.name}`}
    >
      {/* Product Image Frame */}
      <div className="product-card-image-wrap">
        <SafeImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="product-card-image"
        />

        {/* Condition Badge (Minimal Editorial) */}
        <span className="product-condition-tag">
          {product.condition}
        </span>

        {/* Favorite Button */}
        <button
          type="button"
          className={`product-favorite-btn ${isFavorite ? 'is-favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? `Hapus ${product.name} dari favorit` : `Simpan ${product.name} ke favorit`}
          title={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
        >
          <Heart
            size={16}
            fill={isFavorite ? '#c0392b' : 'none'}
            stroke={isFavorite ? '#c0392b' : '#252922'}
          />
        </button>
      </div>

      {/* Product Meta */}
      <div className="product-card-body">
        <div className="product-card-seller">
          <span className="seller-name-text">{product.shop}</span>
          <span className="seller-bullet">•</span>
          <span className="seller-city-text">{product.location.split(',')[0]}</span>
        </div>

        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>

        <div className="product-card-bottom">
          <span className="product-card-price">{formattedPrice}</span>
          <span className="product-card-category">{product.category}</span>
        </div>
      </div>
    </article>
  );
}
