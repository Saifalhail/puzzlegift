import React from 'react';

const CourtyardScene = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sky */}
    <rect width="800" height="600" fill="#22223b" />
    
    {/* Castle walls */}
    <path
      d="M0 100h800v400H0z"
      fill="#2a2a44"
      stroke="#4a4a6e"
      strokeWidth="4"
    />
    
    {/* Main archway */}
    <path
      d="M300 200 C300 100, 500 100, 500 200 L500 400 L300 400 Z"
      fill="#1a1a2e"
      stroke="#4a4a6e"
      strokeWidth="4"
    />
    
    {/* Stone texture on walls */}
    {Array.from({ length: 10 }).map((_, i) => (
      <rect
        key={`stone-${i}`}
        x={50 + i * 70}
        y={150}
        width="60"
        height="30"
        fill="none"
        stroke="#4a4a6e"
        strokeWidth="2"
      />
    ))}
    {Array.from({ length: 10 }).map((_, i) => (
      <rect
        key={`stone-b-${i}`}
        x={50 + i * 70}
        y={350}
        width="60"
        height="30"
        fill="none"
        stroke="#4a4a6e"
        strokeWidth="2"
      />
    ))}
    
    {/* Castle towers */}
    <path
      d="M50 50h100v450H50z"
      fill="#2a2a44"
      stroke="#4a4a6e"
      strokeWidth="4"
    />
    <path
      d="M650 50h100v450H650z"
      fill="#2a2a44"
      stroke="#4a4a6e"
      strokeWidth="4"
    />
    
    {/* Tower battlements */}
    {Array.from({ length: 5 }).map((_, i) => (
      <rect
        key={`battlement-l-${i}`}
        x={40 + i * 20}
        y={30}
        width="15"
        height="20"
        fill="#2a2a44"
        stroke="#4a4a6e"
        strokeWidth="2"
      />
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <rect
        key={`battlement-r-${i}`}
        x={640 + i * 20}
        y={30}
        width="15"
        height="20"
        fill="#2a2a44"
        stroke="#4a4a6e"
        strokeWidth="2"
      />
    ))}
    
    {/* Courtyard floor */}
    <path
      d="M0 400h800v200H0z"
      fill="#1a1a2e"
      stroke="#4a4a6e"
      strokeWidth="4"
    />
    
    {/* Floor pattern */}
    {Array.from({ length: 8 }).map((_, i) => (
      <line
        key={`floor-line-${i}`}
        x1={100 * i}
        y1="400"
        x2={100 * i + 100}
        y2="600"
        stroke="#4a4a6e"
        strokeWidth="2"
      />
    ))}
    
    {/* Torches */}
    <g className="torch left-torch">
      <path
        d="M150 250h20v60h-20z"
        fill="#4a4a6e"
        stroke="#6e6e9e"
        strokeWidth="2"
      />
      <circle cx="160" cy="240" r="10" fill="#ffa500" className="flame">
        <animate
          attributeName="r"
          values="8;10;8"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
    <g className="torch right-torch">
      <path
        d="M630 250h20v60h-20z"
        fill="#4a4a6e"
        stroke="#6e6e9e"
        strokeWidth="2"
      />
      <circle cx="640" cy="240" r="10" fill="#ffa500" className="flame">
        <animate
          attributeName="r"
          values="8;10;8"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
    
    <style>
      {`
        .flame {
          filter: blur(2px);
          animation: flicker 1s infinite;
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}
    </style>
  </svg>
);

export default CourtyardScene; 