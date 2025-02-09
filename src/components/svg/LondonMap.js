import React from 'react';

const LondonMap = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Map Background with Parchment Texture */}
      <defs>
        <filter id="parchment">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
          <feColorMatrix type="saturate" values="0.1" />
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
        
        <filter id="magical-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="gold" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Parchment Background */}
      <rect
        width="100%"
        height="100%"
        fill="#f4e4bc"
        filter="url(#parchment)"
      />

      {/* Thames River */}
      <path
        d="M50,300 C150,310 250,290 350,300 S550,320 750,300"
        fill="none"
        stroke="#4a90e2"
        strokeWidth="8"
        filter="url(#magical-glow)"
      />

      {/* Major London Landmarks */}
      {/* Big Ben */}
      <g transform="translate(300,250)" filter="url(#magical-glow)">
        <rect x="-10" y="-50" width="20" height="50" fill="#c17f59" />
        <circle cx="0" cy="-60" r="15" fill="#ffd700" />
      </g>

      {/* Tower Bridge */}
      <g transform="translate(400,300)" filter="url(#magical-glow)">
        <path
          d="M-40,0 L-20,-30 L20,-30 L40,0"
          fill="none"
          stroke="#8b4513"
          strokeWidth="5"
        />
        <rect x="-45" y="0" width="10" height="30" fill="#8b4513" />
        <rect x="35" y="0" width="10" height="30" fill="#8b4513" />
      </g>

      {/* London Eye */}
      <g transform="translate(200,280)" filter="url(#magical-glow)">
        <circle
          cx="0"
          cy="0"
          r="30"
          fill="none"
          stroke="#ff4081"
          strokeWidth="3"
        />
        <circle cx="0" cy="0" r="25" fill="none" stroke="#ff4081" strokeWidth="2" />
      </g>

      {/* Decorative Compass Rose */}
      <g transform="translate(700,100)" filter="url(#magical-glow)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#8b4513" strokeWidth="2" />
        <path
          d="M0,-25 L5,-5 L25,0 L5,5 L0,25 L-5,5 L-25,0 L-5,-5 Z"
          fill="#ffd700"
          stroke="#8b4513"
          strokeWidth="1"
        />
      </g>

      {/* Magical Sparkles */}
      <g className="sparkles" filter="url(#magical-glow)">
        <circle cx="150" cy="150" r="2" fill="#ffd700" />
        <circle cx="650" cy="450" r="2" fill="#ffd700" />
        <circle cx="350" cy="100" r="2" fill="#ffd700" />
        <circle cx="450" cy="500" r="2" fill="#ffd700" />
      </g>

      {/* Map Title */}
      <text
        x="400"
        y="50"
        textAnchor="middle"
        fill="#8b4513"
        fontFamily="var(--font-medieval)"
        fontSize="24"
        filter="url(#magical-glow)"
      >
        Enchanted London
      </text>
    </svg>
  );
};

export default LondonMap; 