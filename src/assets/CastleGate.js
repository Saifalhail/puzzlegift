import React from 'react';

const CastleGate = ({ isOpen, className }) => {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      style={{
        width: '100%',
        maxWidth: '800px',
        height: 'auto',
      }}
    >
      {/* Stone Wall Background */}
      <rect x="0" y="0" width="400" height="500" fill="#808080" />
      <pattern
        id="stonePattern"
        patternUnits="userSpaceOnUse"
        width="50"
        height="30"
      >
        <path
          d="M0 0h50v30H0z"
          fill="none"
          stroke="#666"
          strokeWidth="2"
        />
        <path
          d="M25 0v30M0 15h50"
          fill="none"
          stroke="#666"
          strokeWidth="1"
        />
      </pattern>
      <rect x="0" y="0" width="400" height="500" fill="url(#stonePattern)" />

      {/* Wooden Gate */}
      <g transform={`translate(50, ${isOpen ? -300 : 50})`}
         style={{ transition: 'transform 1s ease-in-out' }}>
        <rect
          x="0"
          y="0"
          width="300"
          height="400"
          fill="#8B4513"
          stroke="#4A3000"
          strokeWidth="8"
        />
        {/* Wood Grain Pattern */}
        <pattern
          id="woodPattern"
          patternUnits="userSpaceOnUse"
          width="60"
          height="30"
        >
          <path
            d="M0 15h60"
            fill="none"
            stroke="#734A12"
            strokeWidth="2"
          />
        </pattern>
        <rect
          x="0"
          y="0"
          width="300"
          height="400"
          fill="url(#woodPattern)"
          opacity="0.5"
        />
        
        {/* Gate Details */}
        <circle cx="250" cy="200" r="20" fill="#B8860B" /> {/* Door Handle */}
        <rect x="30" y="30" width="240" height="340" fill="none" stroke="#4A3000" strokeWidth="4" />
      </g>

      {/* Stone Arch */}
      <path
        d="M30,50 A220,220 0 0,1 370,50"
        fill="none"
        stroke="#666"
        strokeWidth="20"
      />

      {/* Torches */}
      <g className="torch-glow">
        <circle cx="30" cy="150" r="15" fill="#FF4500" opacity="0.6" />
        <circle cx="370" cy="150" r="15" fill="#FF4500" opacity="0.6" />
      </g>
      <rect x="20" cy="150" width="20" height="60" fill="#4A3000" />
      <rect x="360" cy="150" width="20" height="60" fill="#4A3000" />
    </svg>
  );
};

export default CastleGate; 