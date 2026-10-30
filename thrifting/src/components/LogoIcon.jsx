export default function LogoIcon({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`thrifting-logo-icon ${className}`}
      aria-label="Logo Thrifting - Kaos di Hanger"
    >
      {/* 1. Gantungan Baju (Hanger Hook & Bar) */}
      <path
        d="M22 10.5V8C22 5.5 24.5 4.5 25.5 6C26.5 7.5 24.5 8.5 23 9.5"
        stroke="#293D30"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bahu Gantungan Hanger Kayu/Besi */}
      <path
        d="M14.5 13.5L22 10.5L29.5 13.5"
        stroke="#293D30"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Kaos Putih Polos (White Plain T-Shirt Silhouette) */}
      <path
        d="M17.5 13.5C18.8 16 25.2 16 26.5 13.5L34.5 16.5L37 22.5L32 24.5L31.5 39.5C31.5 40.5 30.5 41 29.5 41H14.5C13.5 41 12.5 40.5 12.5 39.5L12 24.5L7 22.5L9.5 16.5L17.5 13.5Z"
        fill="#FFFFFF"
        stroke="#293D30"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Jahitan Halus di Kerah (Crewneck Collar) */}
      <path
        d="M17.5 13.5C19 16.2 25 16.2 26.5 13.5"
        stroke="#293D30"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* 3. Huruf "T." di Tengah Kaos */}
      <text
        x="21.5"
        y="29"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#293D30"
        fontFamily="'Playfair Display', 'DM Sans', serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="-0.5"
      >
        T.
      </text>
    </svg>
  );
}
