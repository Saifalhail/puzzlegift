import React from 'react';

const GrandRoseGateScene = ({ className }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Gradients and Patterns */}
      <defs>
        <linearGradient id="gateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>

        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>

        <pattern id="rosePattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <path
            d="M50 20 C60 10, 70 10, 80 20 C90 30, 90 40, 80 50 C70 60, 60 60, 50 50 C40 40, 40 30, 50 20"
            fill="#FF69B4"
            opacity="0.8"
          />
          <path
            d="M45 25 C55 15, 65 15, 75 25 C85 35, 85 45, 75 55 C65 65, 55 65, 45 55 C35 45, 35 35, 45 25"
            fill="#FF1493"
            opacity="0.6"
          />
        </pattern>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="800" height="600" fill="#1a1a2e" />

      {/* Gate Frame */}
      <path
        d="M200 100 
           L600 100 
           A50 50 0 0 1 650 150
           L650 500
           L150 500
           L150 150
           A50 50 0 0 1 200 100"
        fill="url(#gateGradient)"
        stroke="url(#goldGradient)"
        strokeWidth="10"
      />

      {/* Gate Doors */}
      <path
        d="M175 150
           L375 150
           L375 475
           L175 475
           Z"
        fill="#654321"
        stroke="url(#goldGradient)"
        strokeWidth="5"
      />

      <path
        d="M425 150
           L625 150
           L625 475
           L425 475
           Z"
        fill="#654321"
        stroke="url(#goldGradient)"
        strokeWidth="5"
      />

      {/* Rose Decorations */}
      <g className="rose-decorations">
        {/* Top Center Rose */}
        <circle cx="400" cy="125" r="40" fill="url(#rosePattern)" />
        
        {/* Side Roses */}
        <circle cx="200" cy="300" r="30" fill="url(#rosePattern)" />
        <circle cx="600" cy="300" r="30" fill="url(#rosePattern)" />
        
        {/* Bottom Roses */}
        <circle cx="300" cy="450" r="25" fill="url(#rosePattern)" />
        <circle cx="500" cy="450" r="25" fill="url(#rosePattern)" />
      </g>

      {/* Ornate Details */}
      <g className="ornate-details" stroke="url(#goldGradient)" strokeWidth="3" fill="none">
        {/* Swirls and flourishes */}
        <path d="M250 200 C300 220, 350 180, 400 200" />
        <path d="M400 200 C450 220, 500 180, 550 200" />
        <path d="M250 400 C300 420, 350 380, 400 400" />
        <path d="M400 400 C450 420, 500 380, 550 400" />
      </g>

      {/* Magical Glow */}
      <g className="magical-glow">
        <circle cx="400" cy="300" r="200" fill="url(#goldGradient)" opacity="0.1">
          <animate
            attributeName="opacity"
            values="0.1;0.2;0.1"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      <style jsx>{`
        .rose-decorations {
          animation: sway 6s ease-in-out infinite;
        }

        .magical-glow {
          filter: blur(20px);
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
      `}</style>
    </svg>
  );
};

export default GrandRoseGateScene; 