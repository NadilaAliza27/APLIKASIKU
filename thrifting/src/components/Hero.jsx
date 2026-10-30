import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero({ onExploreCatalog }) {
  return (
    <section className="editorial-hero">
      <div className="hero-editorial-inner">
        <div className="hero-eyebrow-pill">
          <span className="dot-sage"></span>
          <span>CURATED THRIFT & VINTAGE MARKETPLACE</span>
        </div>

        <h1 className="hero-editorial-heading">
          Pakaian Bersejarah.<br />
          <em>Cerita Baru Bersamamu.</em>
        </h1>

        <p className="hero-editorial-desc">
          Jelajahi ribuan pakaian pre-loved pilihan dari toko thrift Pasar Senen, Gedebage,
          hingga seller independen terpercaya tanpa harus keliling fisik seharian.
        </p>

        <div className="hero-editorial-actions">
          <button
            type="button"
            className="btn-hero-explore"
            onClick={onExploreCatalog}
          >
            <span>Mulai Jelajah Katalog</span>
            <ArrowDown size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
