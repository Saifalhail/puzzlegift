import React from 'react';

const RoseCorridorScene = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Patterns and gradients */}
      <defs>
        <pattern
          id="stonePattern"
          patternUnits="userSpaceOnUse"
          width="60"
          height="40"
        >
          <path
            d="M0 0h60v40H0z"
            fill="#2a2a3a"
            stroke="#1a1a2a"
            strokeWidth="2"
          />
          <path
            d="M30 0v40M0 20h60"
            fill="none"
            stroke="#1a1a2a"
            strokeWidth="1"
          />
        </pattern>

        {/* Rose pattern */}
        <pattern
          id="rosePattern"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          <path
            d="M50,30 Q60,40 50,50 Q40,40 50,30 Z"
            fill="#ff6b6b"
            opacity="0.6"
          />
          <path
            d="M40,40 Q50,50 40,60 Q30,50 40,40 Z"
            fill="#ff6b6b"
            opacity="0.6"
          />
          <path
            d="M60,40 Q70,50 60,60 Q50,50 60,40 Z"
            fill="#ff6b6b"
            opacity="0.6"
          />
        </pattern>
        
        {/* Torch glow gradient */}
        <radialGradient id="torchGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
        </radialGradient>

        {/* Moonlight through windows gradient */}
        <radialGradient id="moonlight" cx="0.5" cy="0.5" r="0.8">
          <stop offset="0%" stopColor="#b3d9ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#b3d9ff" stopOpacity="0" />
        </radialGradient>

        {/* Rose glow filter */}
        <filter id="roseGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="#ff6b6b" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dark background */}
      <rect width="1000" height="600" fill="#1a1a2a" />

      {/* Corridor walls */}
      <path
        d="M0,0 L400,150 L400,450 L0,600 Z"
        fill="url(#stonePattern)"
      />
      <path
        d="M1000,0 L600,150 L600,450 L1000,600 Z"
        fill="url(#stonePattern)"
      />

      {/* Gothic arches along the corridor */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`arch-${i}`} transform={`translate(${400 + i * 50}, 150)`}>
          <path
            d={`M0,0 Q${50},${-30} 100,0`}
            fill="none"
            stroke="#1a1a2a"
            strokeWidth="10"
          />
          <path
            d={`M10,0 Q${50},${-25} 90,0`}
            fill="none"
            stroke="#2a2a3a"
            strokeWidth="5"
          />
          {/* Rose decoration on arch */}
          <g transform={`translate(50, -20)`} filter="url(#roseGlow)">
            <path
              d="M-10,-10 Q0,-20 10,-10 Q0,0 -10,-10 Z"
              fill="#ff6b6b"
              opacity="0.8"
            />
          </g>
        </g>
      ))}

      {/* Floor with rose petals */}
      <path
        d="M400,450 L600,450 L1000,600 L0,600 Z"
        fill="#2a2a3a"
        stroke="#1a1a2a"
      />
      <path
        d="M450,450 L550,450 L800,600 L200,600 Z"
        fill="url(#rosePattern)"
        opacity="0.3"
      />

      {/* Rose vines along the walls */}
      {[1, 2, 3].map((i) => (
        <g key={`vine-${i}`}>
          <path
            d={`M${350},${150 + i * 100} Q${370},${200 + i * 100} ${350},${250 + i * 100}`}
            stroke="#4a0404"
            strokeWidth="3"
            fill="none"
          />
          <g transform={`translate(350, ${200 + i * 100})`} filter="url(#roseGlow)">
            <path
              d="M-5,-5 Q0,-10 5,-5 Q0,0 -5,-5 Z"
              fill="#ff6b6b"
              opacity="0.8"
            />
          </g>
        </g>
      ))}

      {/* Enhanced torches with animated flames */}
      {[200, 400].map((y, i) => (
        <React.Fragment key={`torches-${i}`}>
          {/* Left torch */}
          <g transform={`translate(350, ${y})`}>
            <circle
              cx="0"
              cy="0"
              r="40"
              fill="url(#torchGlow)"
              className="torch-glow"
            />
            <rect
              x="-5"
              y="-20"
              width="10"
              height="30"
              fill="#8b4513"
            />
            <path
              d="M-5,-25 Q0,-35 5,-25 Q0,-30 0,-20"
              fill="#ff4500"
              className="torch-flame"
            >
              <animate
                attributeName="d"
                values="M-5,-25 Q0,-35 5,-25 Q0,-30 0,-20;M-5,-25 Q0,-40 5,-25 Q0,-35 0,-20;M-5,-25 Q0,-35 5,-25 Q0,-30 0,-20"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          {/* Right torch */}
          <g transform={`translate(650, ${y})`}>
            <circle
              cx="0"
              cy="0"
              r="40"
              fill="url(#torchGlow)"
              className="torch-glow"
            />
            <rect
              x="-5"
              y="-20"
              width="10"
              height="30"
              fill="#8b4513"
            />
            <path
              d="M-5,-25 Q0,-35 5,-25 Q0,-30 0,-20"
              fill="#ff4500"
              className="torch-flame"
            >
              <animate
                attributeName="d"
                values="M-5,-25 Q0,-35 5,-25 Q0,-30 0,-20;M-5,-25 Q0,-40 5,-25 Q0,-35 0,-20;M-5,-25 Q0,-35 5,-25 Q0,-30 0,-20"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </React.Fragment>
      ))}

      {/* Moonlight through windows effect */}
      {[1, 2].map((i) => (
        <React.Fragment key={`windows-${i}`}>
          <circle
            cx={300}
            cy={200 * i}
            r="60"
            fill="url(#moonlight)"
            opacity="0.3"
          />
          <circle
            cx={700}
            cy={200 * i}
            r="60"
            fill="url(#moonlight)"
            opacity="0.3"
          />
        </React.Fragment>
      ))}

      <style>{`
        .torch-glow {
          animation: torchGlow 2s infinite alternate;
        }

        .torch-flame {
          animation: flicker 0.5s infinite alternate;
        }

        @keyframes torchGlow {
          from { opacity: 0.8; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1.05); }
        }

        @keyframes flicker {
          from { transform: scaleY(0.9) translateY(2px); }
          to { transform: scaleY(1.1) translateY(-2px); }
        }
      `}</style>
    </svg>
  );
};

export default RoseCorridorScene; 