import React from 'react';

const ThroneRoomBackground = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background */}
    <rect width="800" height="600" fill="#22223b" />
    
    {/* Floor */}
    <path
      d="M0 400 L400 500 L800 400 L800 600 L0 600 Z"
      fill="#1a1a2e"
      stroke="#4a4a6e"
      strokeWidth="2"
    />
    
    {/* Floor pattern */}
    {Array.from({ length: 8 }).map((_, i) => (
      <path
        key={`floor-line-${i}`}
        d={`M${i * 100} 400 L${i * 100 + 50} 500 L${i * 100 + 100} 400`}
        stroke="#4a4a6e"
        strokeWidth="1"
        fill="none"
      />
    ))}
    
    {/* Back wall */}
    <rect x="0" y="0" width="800" height="400" fill="#2a2a44" />
    
    {/* Throne platform */}
    <path
      d="M300 300 L500 300 L550 400 L250 400 Z"
      fill="#4a4a6e"
      stroke="#6e6e9e"
      strokeWidth="2"
    />
    
    {/* Throne */}
    <path
      d="M350 200 L450 200 L475 350 L325 350 Z"
      fill="#6e6e9e"
      stroke="#8e8ebe"
      strokeWidth="2"
    />
    <path
      d="M375 150 L425 150 L450 200 L350 200 Z"
      fill="#6e6e9e"
      stroke="#8e8ebe"
      strokeWidth="2"
    />
    
    {/* Stained glass windows */}
    {Array.from({ length: 3 }).map((_, i) => (
      <g key={`window-${i}`}>
        <path
          d={`M${150 + i * 250} 50 L${200 + i * 250} 50 L${200 + i * 250} 200 L${150 + i * 250} 200 Z`}
          fill="#4a4a6e"
          stroke="#6e6e9e"
          strokeWidth="2"
        />
        <circle
          cx={175 + i * 250}
          cy={100}
          r="20"
          fill="#ffd700"
          opacity="0.3"
          className="window-glow"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.4;0.2"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
    
    {/* Columns */}
    {Array.from({ length: 4 }).map((_, i) => (
      <g key={`column-${i}`}>
        <rect
          x={100 + i * 200}
          y="0"
          width="40"
          height="400"
          fill="#4a4a6e"
          stroke="#6e6e9e"
          strokeWidth="2"
        />
        <path
          d={`M${90 + i * 200} 0 L${150 + i * 200} 0 L${140 + i * 200} 50 L${100 + i * 200} 50 Z`}
          fill="#4a4a6e"
          stroke="#6e6e9e"
          strokeWidth="2"
        />
      </g>
    ))}
    
    {/* Banners */}
    {Array.from({ length: 2 }).map((_, i) => (
      <g key={`banner-${i}`} className="banner">
        <path
          d={`M${250 + i * 300} 100 L${350 + i * 300} 100 L${350 + i * 300} 250 L${300 + i * 300} 270 L${250 + i * 300} 250 Z`}
          fill="#8e1515"
          stroke="#ae3535"
          strokeWidth="2"
        >
          <animate
            attributeName="d"
            values={`M${250 + i * 300} 100 L${350 + i * 300} 100 L${350 + i * 300} 250 L${300 + i * 300} 270 L${250 + i * 300} 250 Z;
                    M${250 + i * 300} 100 L${350 + i * 300} 100 L${350 + i * 300} 250 L${300 + i * 300} 280 L${250 + i * 300} 250 Z;
                    M${250 + i * 300} 100 L${350 + i * 300} 100 L${350 + i * 300} 250 L${300 + i * 300} 270 L${250 + i * 300} 250 Z`}
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    ))}
    
    {/* Torches */}
    {Array.from({ length: 4 }).map((_, i) => (
      <g key={`torch-${i}`} className="torch">
        <path
          d={`M${150 + i * 200} 250 L${170 + i * 200} 250 L${170 + i * 200} 310 L${150 + i * 200} 310 Z`}
          fill="#4a4a6e"
          stroke="#6e6e9e"
          strokeWidth="2"
        />
        <circle
          cx={160 + i * 200}
          cy={240}
          r="10"
          fill="#ffa500"
          className="flame"
        >
          <animate
            attributeName="r"
            values="8;10;8"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
    
    <style>
      {`
        .flame {
          filter: blur(2px);
          animation: flicker 1s infinite;
        }
        
        .window-glow {
          filter: blur(5px);
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}
    </style>
  </svg>
);

export default ThroneRoomBackground; 