import React from 'react';
import BaseFoodIcon from './BaseFoodIcon';

const SashimiIcon = (props) => {
  return (
    <BaseFoodIcon {...props}>
      {/* Plate */}
      <ellipse
        cx="50"
        cy="65"
        rx="35"
        ry="15"
        fill="#F5F5F5"
        stroke="#D3D3D3"
        strokeWidth="2"
      />
      {/* Sashimi pieces */}
      <path
        d="M30,45 Q40,40 50,45 L45,60 Q35,55 30,60 Z"
        fill="#FF6B6B"
        stroke="#CD5C5C"
        strokeWidth="1"
      />
      <path
        d="M45,40 Q55,35 65,40 L60,55 Q50,50 45,55 Z"
        fill="#FF6B6B"
        stroke="#CD5C5C"
        strokeWidth="1"
      />
      {/* Wasabi */}
      <path
        d="M55,55 Q60,53 65,55 Q63,58 57,58 Z"
        fill="#90EE90"
        stroke="#228B22"
        strokeWidth="1"
      />
      {/* Ginger */}
      <path
        d="M25,55 C25,52 35,52 35,55 C35,58 25,58 25,55"
        fill="#FFB6C1"
        stroke="#FF69B4"
        strokeWidth="1"
      />
      {/* Decorative leaves */}
      <path
        d="M70,45 Q75,40 80,45 L75,50 Z"
        fill="#228B22"
        stroke="#006400"
        strokeWidth="1"
      />
    </BaseFoodIcon>
  );
};

export default SashimiIcon; 