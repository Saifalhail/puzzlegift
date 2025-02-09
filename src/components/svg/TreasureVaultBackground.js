import React from 'react';

const TreasureVaultBackground = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1000 800"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Gold texture pattern */}
        <pattern
          id="goldPattern"
          patternUnits="userSpaceOnUse"
          width="40"
          height="40"
        >
          <rect width="40" height="40" fill="#FFD700" />
          <circle cx="20" cy="20" r="15" fill="#DAA520" opacity="0.3" />
        </pattern>

        {/* Metal texture for vault door */}
        <pattern
          id="metalPattern"
          patternUnits="userSpaceOnUse"
          width="50"
          height="50"
        >
          <rect width="50" height="50" fill="#444" />
          <circle cx="25" cy="25" r="2" fill="#333" />
          <line x1="0" y1="25" x2="50" y2="25" stroke="#333" strokeWidth="1" />
          <line x1="25" y1="0" x2="25" y2="50" stroke="#333" strokeWidth="1" />
        </pattern>

        {/* Sparkle filter */}
        <filter id="sparkle">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <feSpecularLighting in="blur" specularExponent="20" lightingColor="#fff">
            <fePointLight x="50" y="50" z="200" />
          </feSpecularLighting>
        </filter>
      </defs>

      {/* Background gradient */}
      <rect width="1000" height="800" fill="#1a1a2a" />

      {/* Large Vault Door */}
      <circle
        cx="500"
        cy="400"
        r="300"
        fill="url(#metalPattern)"
        stroke="#FFD700"
        strokeWidth="10"
      />

      {/* Door Handle */}
      <circle
        cx="700"
        cy="400"
        r="40"
        fill="#DAA520"
        stroke="#FFD700"
        strokeWidth="5"
      />

      {/* Vault Lock Mechanism */}
      <circle
        cx="500"
        cy="400"
        r="100"
        fill="none"
        stroke="#FFD700"
        strokeWidth="8"
      />
      <circle
        cx="500"
        cy="400"
        r="80"
        fill="none"
        stroke="#DAA520"
        strokeWidth="15"
        strokeDasharray="20 10"
      />

      {/* Scattered Gold Coins */}
      {[...Array(20)].map((_, i) => (
        <g key={`coin-${i}`} transform={`translate(${Math.random() * 900 + 50}, ${Math.random() * 700 + 50})`}>
          <circle
            r="15"
            fill="url(#goldPattern)"
            stroke="#DAA520"
            strokeWidth="2"
          />
          <circle
            r="12"
            fill="none"
            stroke="#B8860B"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Gems */}
      {[...Array(10)].map((_, i) => (
        <g key={`gem-${i}`} transform={`translate(${Math.random() * 900 + 50}, ${Math.random() * 700 + 50})`}>
          <path
            d={`M0,-15 L10,0 L0,15 L-10,0 Z`}
            fill={['#FF0000', '#0000FF', '#00FF00', '#FF00FF'][i % 4]}
            stroke="#fff"
            strokeWidth="1"
            opacity="0.8"
            filter="url(#sparkle)"
          />
        </g>
      ))}

      {/* Treasure Chests */}
      {[...Array(3)].map((_, i) => (
        <g key={`chest-${i}`} transform={`translate(${200 + i * 300}, 600)`}>
          <rect
            x="-40"
            y="-30"
            width="80"
            height="60"
            fill="#8B4513"
            stroke="#FFD700"
            strokeWidth="3"
          />
          <path
            d="M-40,-30 Q0,-50 40,-30"
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
          />
          <rect
            x="-30"
            y="-20"
            width="60"
            height="40"
            fill="url(#goldPattern)"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Decorative Bolts around the vault door */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x = 500 + Math.cos(angle) * 280;
        const y = 400 + Math.sin(angle) * 280;
        return (
          <circle
            key={`bolt-${i}`}
            cx={x}
            cy={y}
            r="10"
            fill="#DAA520"
            stroke="#FFD700"
            strokeWidth="2"
          />
        );
      })}

      <style>{`
        @keyframes sparkle {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }

        .gem {
          animation: sparkle 2s infinite;
        }
      `}</style>
    </svg>
  );
};

export default TreasureVaultBackground; 