import React from 'react';

const TwilightCorridorScene = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Enhanced twilight gradient for more contrast with fog */}
        <linearGradient id="twilightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a1a" />
          <stop offset="30%" stopColor="#2a2e49" />
          <stop offset="60%" stopColor="#4a4c68" />
          <stop offset="100%" stopColor="#69607a" />
        </linearGradient>

        <pattern
          id="stonePattern"
          patternUnits="userSpaceOnUse"
          width="60"
          height="40"
        >
          <path
            d="M0 0h60v40H0z"
            fill="#1a1a2a"
            stroke="#0a0a1a"
            strokeWidth="2"
          />
        </pattern>

        {/* Moonlight effect */}
        <radialGradient id="moonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#b3d9ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#b3d9ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dark twilight sky background */}
      <rect width="1000" height="600" fill="url(#twilightSky)" />

      {/* Moon */}
      <circle cx="800" cy="100" r="40" fill="#b3d9ff" opacity="0.9" />
      <circle cx="800" cy="100" r="60" fill="url(#moonGlow)" />

      {/* Ground with slight gradient */}
      <path
        d="M0,400 L1000,400 L1000,600 L0,600 Z"
        fill="#1a1a2a"
      />

      {/* Graveyard Elements */}
      {/* Graves in the background */}
      {[...Array(8)].map((_, i) => (
        <g key={`grave-${i}`} transform={`translate(${100 + i * 120}, 380)`}>
          <path
            d={`M-20,0 C-20,-30 20,-30 20,0 L15,40 L-15,40 Z`}
            fill="#2a2a3a"
            stroke="#1a1a1a"
            strokeWidth="2"
          />
          <path
            d={`M-10,-15 L10,-15`}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* Dead trees */}
      {[...Array(4)].map((_, i) => (
        <g key={`tree-${i}`} transform={`translate(${200 + i * 250}, 350)`}>
          <path
            d={`M0,0 L0,-100 
                M0,-50 L20,-70 M0,-50 L-20,-70
                M0,-30 L30,-40 M0,-30 L-30,-40
                M0,-80 L15,-100 M0,-80 L-15,-100`}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="4"
          />
        </g>
      ))}

      {/* Scattered rocks */}
      {[...Array(12)].map((_, i) => (
        <path
          key={`rock-${i}`}
          d={`M${50 + i * 80},${420 + (i % 3) * 20} 
             l${10 + Math.random() * 10},${-5 - Math.random() * 10} 
             l${5 + Math.random() * 10},${5 + Math.random() * 10} 
             l${-15 - Math.random() * 10},${5 + Math.random() * 10} z`}
          fill="#2a2a3a"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
      ))}

      {/* Animated elements */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .moonlight {
          animation: flicker 4s infinite ease-in-out;
        }
      `}</style>
    </svg>
  );
};

export default TwilightCorridorScene; 