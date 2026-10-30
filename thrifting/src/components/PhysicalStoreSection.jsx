import { MapPin, Store, ArrowRight } from 'lucide-react';

export default function PhysicalStoreSection({ onSelectCity }) {
  const physicalShops = [
    {
      id: 1,
      shop: 'Arsip Lawas',
      city: 'Jakarta',
      market: 'Pasar Senen Blok III Lt. 2 No. 42',
      specialty: 'Jaket workwear vintage 90s, military surplus, dan celana chino.',
      hours: '10.00 - 18.00 WIB'
    },
    {
      id: 2,
      shop: 'Kembali Studio',
      city: 'Bandung',
      market: 'Jl. Dipatiukur No. 88, Bandung',
      specialty: 'Denim Levi\'s 501 orisinil, flannel adem, dan overshirt.',
      hours: '11.00 - 20.00 WIB'
    },
    {
      id: 3,
      shop: 'Ruang Ulang',
      city: 'Yogyakarta',
      market: 'Area Sosrowijayan No. 12, Malioboro',
      specialty: 'Knitwear rajut earth-tone, vintage band tee, dan kemeja santai.',
      hours: '10.00 - 19.00 WIB'
    },
    {
      id: 4,
      shop: 'Galeri Barang Antik',
      city: 'Solo',
      market: 'Pasar Triwindu Kios No. 18, Surakarta',
      specialty: 'Tas kulit asli patina, boots vintage, dan aksesoris klasik.',
      hours: '09.00 - 17.00 WIB'
    }
  ];

  return (
    <section className="store-discovery-section" id="toko-fisik">
      <div className="store-discovery-container">
        <div className="section-head-editorial">
          <div>
            <span className="section-eyebrow">PENEMUAN TOKO FISIK</span>
            <h2 className="section-heading-title">Kunjungi Kios & Toko Thrift Pilihan</h2>
          </div>
          <p className="section-heading-desc">
            Cek foto dan detail barang secara online di Thrifting sebelum memutuskan datang langsung ke kios mereka.
          </p>
        </div>

        <div className="stores-grid-layout">
          {physicalShops.map((item) => (
            <div key={item.id} className="store-feature-card">
              <div className="store-card-top-row">
                <div className="store-badge-icon">
                  <Store size={16} />
                </div>
                <span className="store-city-pill">{item.city}</span>
              </div>

              <h3 className="store-shop-heading">{item.shop}</h3>
              <p className="store-address-text">
                <MapPin size={12} className="icon-sage" /> {item.market}
              </p>

              <p className="store-specialty-text">{item.specialty}</p>

              <div className="store-card-action-row">
                <span className="store-hours-note">{item.hours}</span>
                <button
                  type="button"
                  className="btn-store-filter"
                  onClick={() => onSelectCity(item.city)}
                >
                  <span>Lihat Produk Toko</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
