import React from 'react';

const MagicalLetterTile = ({ letter, points = 1, isSelected, onClick, className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        {/* Tile texture */}
        <pattern
          id={`tileTexture-${letter}`}
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
        >
          <rect width="10" height="10" fill="#deb887" />
          <path
            d="M0 5h10M5 0v10"
            stroke="#d4a76a"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>

        {/* Magical glow for selected state */}
        <filter id={`magicalGlow-${letter}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="#ffd700" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Tile background */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="10"
        ry="10"
        fill={`url(#tileTexture-${letter})`}
        stroke="#8b4513"
        strokeWidth="2"
        filter={isSelected ? `url(#magicalGlow-${letter})` : undefined}
      />

      {/* Letter */}
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="40"
        fontFamily="MedievalSharp"
        fill="#4a4e69"
        filter={isSelected ? `url(#magicalGlow-${letter})` : undefined}
      >
        {letter}
      </text>

      {/* Points */}
      <text
        x="80"
        y="85"
        textAnchor="middle"
        fontSize="16"
        fontFamily="MedievalSharp"
        fill="#8b4513"
      >
        {points}
      </text>

      {/* Decorative corners */}
      {[
        'M10,10 L20,10 L20,20',
        'M80,10 L90,10 L90,20',
        'M10,80 L10,90 L20,90',
        'M90,80 L90,90 L80,90'
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#8b4513"
          strokeWidth="2"
          filter={isSelected ? `url(#magicalGlow-${letter})` : undefined}
        />
      ))}

      {/* Magical sparkles when selected */}
      {isSelected && (
        <>
          <circle cx="20" cy="20" r="2" fill="#ffd700" className="sparkle" />
          <circle cx="80" cy="20" r="2" fill="#ffd700" className="sparkle" />
          <circle cx="20" cy="80" r="2" fill="#ffd700" className="sparkle" />
          <circle cx="80" cy="80" r="2" fill="#ffd700" className="sparkle" />
        </>
      )}

      <style>{`
        @keyframes sparkle {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
          100% { opacity: 0.2; transform: scale(1); }
        }
        .sparkle {
          animation: sparkle 1.5s infinite;
        }
      `}</style>
    </svg>
  );
};

export default MagicalLetterTile; 