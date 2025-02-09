import React from 'react';
import BaseFoodIcon from './BaseFoodIcon';

const BurgerIcon = (props) => {
  return (
    <BaseFoodIcon {...props}>
      {/* Burger bun top */}
      <path
        d="M20,35 Q50,25 80,35 Q80,45 50,40 Q20,45 20,35"
        fill="#F4A460"
        stroke="#8B4513"
        strokeWidth="2"
      />
      {/* Lettuce */}
      <path
        d="M15,45 Q50,35 85,45 Q85,55 50,50 Q15,55 15,45"
        fill="#90EE90"
        stroke="#228B22"
        strokeWidth="1"
      />
      {/* Cheese */}
      <path
        d="M18,50 Q50,45 82,50 L82,55 Q50,50 18,55 Z"
        fill="#FFD700"
        stroke="#DAA520"
        strokeWidth="1"
      />
      {/* Patty */}
      <path
        d="M20,55 Q50,50 80,55 Q80,65 50,60 Q20,65 20,55"
        fill="#8B4513"
        stroke="#654321"
        strokeWidth="2"
      />
      {/* Burger bun bottom */}
      <path
        d="M25,60 Q50,55 75,60 Q75,70 50,68 Q25,70 25,60"
        fill="#F4A460"
        stroke="#8B4513"
        strokeWidth="2"
      />
    </BaseFoodIcon>
  );
};

export default BurgerIcon; 