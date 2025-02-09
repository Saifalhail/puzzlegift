import React from 'react';

const KnightPortrait = ({ color, weapon, banner, isComplete, number }) => {
  const colors = {
    Red: '#cc0000',
    Blue: '#0044cc',
    Green: '#006600',
    Yellow: '#cccc00'
  };

  const baseColor = colors[color] || '#888888';
  const highlightColor = isComplete ? baseColor : '#444444';

  return (
    <svg viewBox="0 0 200 200" className="knight-portrait">
      {/* Background Shield */}
      <path
        d="M30,20 L170,20 L190,100 L100,180 L10,100 Z"
        fill={highlightColor}
        stroke="#333"
        strokeWidth="4"
      />

      {/* Number Circle */}
      <circle
        cx="100"
        cy="40"
        r="20"
        fill="#ffd700"
        stroke="#333"
        strokeWidth="2"
      />
      <text
        x="100"
        y="48"
        textAnchor="middle"
        fill="#333"
        fontSize="24"
        fontWeight="bold"
        fontFamily="serif"
      >
        {number}
      </text>

      {/* Helmet */}
      <path
        d="M70,60 Q100,40 130,60 L120,100 Q100,110 80,100 Z"
        fill="#d0d0d0"
        stroke="#333"
        strokeWidth="2"
      />

      {/* Visor */}
      <path
        d="M85,70 Q100,65 115,70 Q115,85 100,90 Q85,85 85,70"
        fill="#222"
        stroke="#111"
        strokeWidth="2"
      />

      {/* Weapon Icon */}
      {weapon === 'Sword' && (
        <path
          d="M90,110 L110,130 L130,110 L110,90 Z"
          fill="#c0c0c0"
          stroke="#333"
        />
      )}
      {weapon === 'Axe' && (
        <path
          d="M80,110 Q100,90 120,110 L100,130 Z"
          fill="#c0c0c0"
          stroke="#333"
        />
      )}
      {weapon === 'Lance' && (
        <path
          d="M70,110 L130,110 L120,120 L80,120 Z"
          fill="#c0c0c0"
          stroke="#333"
        />
      )}
      {weapon === 'Mace' && (
        <circle
          cx="100"
          cy="110"
          r="15"
          fill="#c0c0c0"
          stroke="#333"
        />
      )}

      {/* Banner Symbol */}
      {banner === 'Lion' && (
        <path
          d="M90,140 Q100,130 110,140 Q115,150 100,155 Q85,150 90,140"
          fill="#ffd700"
          stroke="#333"
        />
      )}
      {banner === 'Eagle' && (
        <path
          d="M85,140 L115,140 L100,160 Z"
          fill="#ffd700"
          stroke="#333"
        />
      )}
      {banner === 'Stag' && (
        <path
          d="M90,140 L110,140 L100,155 Z M85,145 L115,145"
          fill="#ffd700"
          stroke="#333"
        />
      )}
      {banner === 'Boar' && (
        <circle
          cx="100"
          cy="145"
          r="10"
          fill="#ffd700"
          stroke="#333"
        />
      )}
    </svg>
  );
};

export default KnightPortrait; 