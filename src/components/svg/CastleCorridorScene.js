import React from 'react';

const CastleCorridorScene = ({ className }) => {
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

        <pattern
          id="carpetPattern"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          <rect width="100" height="100" fill="#4a0404" />
          <path
            d="M0 50h100M50 0v100"
            stroke="#3a0303"
            strokeWidth="2"
          />
          <circle cx="50" cy="50" r="20" fill="#3a0303" />
          <path
            d="M30 50l40-40M30 50l40 40"
            stroke="#600"
            strokeWidth="2"
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
      {[0, 1, 2].map((i) => (
        <g key={`arch-${i}`} transform={`translate(${400 + i * 70}, 150)`}>
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
        </g>
      ))}

      {/* Floor with carpet runner */}
      <path
        d="M400,450 L600,450 L1000,600 L0,600 Z"
        fill="#2a2a3a"
        stroke="#1a1a2a"
      />
      <path
        d="M450,450 L550,450 L800,600 L200,600 Z"
        fill="url(#carpetPattern)"
        opacity="0.8"
      />

      {/* Ceiling details */}
      <path
        d="M400,150 Q500,100 600,150"
        fill="none"
        stroke="#1a1a2a"
        strokeWidth="20"
      />
      {/* Ceiling medallions */}
      {[0, 1, 2].map((i) => (
        <g key={`medallion-${i}`} transform={`translate(${450 + i * 50}, 130)`}>
          <circle r="15" fill="#2a2a3a" stroke="#1a1a2a" strokeWidth="2" />
          <path
            d="M-10,0 L10,0 M0,-10 L0,10"
            stroke="#1a1a2a"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* Library entrance arch */}
      <path
        d="M450,180 Q500,170 550,180 L550,400 L450,400 Z"
        fill="#1a1a2a"
      />
      <path
        d="M460,190 Q500,180 540,190 L540,390 L460,390 Z"
        fill="#4a4e69"
      />

      {/* Decorative arch details */}
      <path
        d="M445,180 Q500,170 555,180"
        fill="none"
        stroke="#ffd700"
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M445,185 L445,400 M555,185 L555,400"
        fill="none"
        stroke="#ffd700"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Enhanced bookshelves visible through doorway */}
      <g transform="translate(470, 220)">
        {[0, 1, 2, 3].map(row => (
          <g key={row} transform={`translate(0, ${row * 40})`}>
            {[0, 1, 2].map(col => (
              <g key={`${row}-${col}`} transform={`translate(${col * 22}, 0)`}>
                <rect
                  width="20"
                  height="35"
                  fill="#8b4513"
                  stroke="#654321"
                />
                {/* Book spines */}
                {[0, 1, 2, 3].map(book => (
                  <rect
                    key={book}
                    x={book * 5}
                    y="2"
                    width="4"
                    height="31"
                    fill={['#8B0000', '#006400', '#4B0082', '#800000'][book]}
                    opacity="0.8"
                  />
                ))}
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Enchanted Map at the end of corridor */}
      <g transform="translate(485, 230)">
        <rect
          width="30"
          height="40"
          fill="#f4e4bc"
          stroke="#8b4513"
          strokeWidth="2"
        />
        {/* Map details */}
        <path
          d="M5,10 Q15,5 25,10 M5,20 Q15,25 25,20 M10,30 L20,30"
          stroke="#8b4513"
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Magical glow around map */}
        <rect
          width="30"
          height="40"
          fill="none"
          stroke="#ffd700"
          strokeWidth="1"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Wall decorations */}
      {[1, 2, 3, 4].map((i) => (
        <g key={`decoration-${i}`}>
          <path
            d={`M${350},${150 + i * 80} L${370},${150 + i * 80}`}
            stroke="#ffd700"
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d={`M${630},${150 + i * 80} L${650},${150 + i * 80}`}
            stroke="#ffd700"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>
      ))}

      {/* Enhanced torches with more detailed flames */}
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

export default CastleCorridorScene; 