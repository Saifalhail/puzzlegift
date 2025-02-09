import React from 'react';

const MagicalMapBackground = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1000 800"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Parchment background with texture */}
      <defs>
        <pattern
          id="parchmentTexture"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          <rect width="100" height="100" fill="#f4e4bc" />
          <path
            d="M0 50h100M50 0v100"
            stroke="#e4d4ac"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>

        {/* Magical glow filter */}
        <filter id="magicalGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="#ffd700" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Compass rose gradient */}
        <radialGradient id="compassGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base parchment */}
      <rect
        width="1000"
        height="800"
        fill="url(#parchmentTexture)"
      />

      {/* Decorative border */}
      <rect
        x="20"
        y="20"
        width="960"
        height="760"
        fill="none"
        stroke="#8b4513"
        strokeWidth="4"
        filter="url(#magicalGlow)"
      />

      {/* Compass rose */}
      <g transform="translate(100, 100)">
        <circle r="40" fill="url(#compassGlow)" />
        <path
          d="M0,0 L30,0 M0,0 L-30,0 M0,0 L0,30 M0,0 L0,-30"
          stroke="#8b4513"
          strokeWidth="2"
          filter="url(#magicalGlow)"
        />
        <circle r="5" fill="#8b4513" />
      </g>

      {/* Decorative map elements */}
      {[...Array(5)].map((_, i) => (
        <g key={i} transform={`translate(${200 + i * 150}, ${300 + (i % 2) * 100})`}>
          <path
            d="M0,0 Q30,-20 60,0 Q90,20 120,0"
            fill="none"
            stroke="#8b4513"
            strokeWidth="2"
            opacity="0.3"
          />
          <circle
            r="3"
            fill="#8b4513"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Magical runes scattered around */}
      {[...Array(8)].map((_, i) => (
        <g key={`rune-${i}`} transform={`translate(${100 + i * 120}, ${600})`}>
          <text
            fontSize="20"
            fill="#8b4513"
            opacity="0.4"
            filter="url(#magicalGlow)"
          >
            ⚡✧⚔️
          </text>
        </g>
      ))}

      {/* Animated magical sparkles */}
      <style>{`
        @keyframes sparkle {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        .magical-sparkle {
          animation: sparkle 2s infinite;
        }
      `}</style>
      {[...Array(20)].map((_, i) => (
        <circle
          key={`sparkle-${i}`}
          cx={Math.random() * 1000}
          cy={Math.random() * 800}
          r="1"
          fill="#ffd700"
          className="magical-sparkle"
          style={{ animationDelay: `${Math.random() * 2}s` }}
        />
      ))}
    </svg>
  );
};

export default MagicalMapBackground; 