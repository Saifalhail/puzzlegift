import React from 'react';

const HallBackground = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1000 800"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Gradients and Patterns */}
      <defs>
        <linearGradient id="hallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1a" />
        </linearGradient>

        <linearGradient id="marbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d4d4d4" />
        </linearGradient>

        <pattern id="stainedGlassPattern" patternUnits="userSpaceOnUse" width="200" height="200">
          <path
            d="M0 0 L200 0 L200 200 L0 200 Z"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <path
            d="M100 0 L100 200 M0 100 L200 100"
            fill="none"
            stroke="#FFD700"
            strokeWidth="1"
          />
          <circle cx="100" cy="100" r="50" fill="#4a0404" opacity="0.3" />
        </pattern>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="1000" height="800" fill="url(#hallGradient)" />

      {/* Floor */}
      <path
        d="M0 600 L1000 600 L800 800 L200 800 Z"
        fill="url(#marbleGradient)"
        opacity="0.3"
      />

      {/* Left Wall */}
      <path
        d="M0 0 L300 0 L300 600 L0 600 Z"
        fill="#1a1a2e"
        stroke="#FFD700"
        strokeWidth="2"
      />

      {/* Right Wall */}
      <path
        d="M700 0 L1000 0 L1000 600 L700 600 Z"
        fill="#1a1a2e"
        stroke="#FFD700"
        strokeWidth="2"
      />

      {/* Ceiling Arches */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${200 + i * 150} 0 
              Q${275 + i * 150} 100, ${350 + i * 150} 0`}
          fill="none"
          stroke="#FFD700"
          strokeWidth="3"
        />
      ))}

      {/* Pillars */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect
            x={150 + i * 150}
            y={0}
            width="20"
            height="600"
            fill="url(#marbleGradient)"
            opacity="0.5"
          />
          <path
            d={`M${140 + i * 150} 0 
                L${180 + i * 150} 0 
                L${180 + i * 150} 600
                L${140 + i * 150} 600 Z`}
            fill="none"
            stroke="#FFD700"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Decorative Elements */}
      <g className="decorative-elements">
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={275 + i * 150}
            cy={100}
            r="30"
            fill="url(#stainedGlassPattern)"
            className="stained-glass"
          />
        ))}
      </g>

      {/* Light Beams */}
      <g className="light-beams">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${275 + i * 150} 100 
                L${225 + i * 150} 600
                L${325 + i * 150} 600 Z`}
            fill="#FFD700"
            opacity="0.05"
            className="light-beam"
          />
        ))}
      </g>

      <style jsx>{`
        .stained-glass {
          animation: glimmer 4s ease-in-out infinite;
        }

        .light-beam {
          animation: flicker 6s ease-in-out infinite;
        }

        @keyframes glimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }

        @keyframes flicker {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.07; }
        }
      `}</style>
    </svg>
  );
};

export default HallBackground; 