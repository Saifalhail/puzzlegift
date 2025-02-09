import React from 'react';
import BaseFoodIcon from './BaseFoodIcon';

const BreadCheeseIcon = (props) => {
  return (
    <BaseFoodIcon {...props}>
      {/* Bottom bread slice */}
      <path
        d="M20,60 Q25,65 50,65 Q75,65 80,60 Q85,55 85,50 Q85,45 80,40 Q75,35 50,35 Q25,35 20,40 Q15,45 15,50 Q15,55 20,60"
        fill="#DEB887"
        stroke="#8B4513"
        strokeWidth="2"
      />
      {/* Cheese slice */}
      <path
        d="M25,45 L75,45 L70,30 L30,30 Z"
        fill="#FFD700"
        stroke="#DAA520"
        strokeWidth="2"
      />
      {/* Cheese holes */}
      <circle cx="40" cy="35" r="2" fill="#DAA520" />
      <circle cx="60" cy="40" r="2" fill="#DAA520" />
      <circle cx="50" cy="38" r="1.5" fill="#DAA520" />
      {/* Bread texture */}
      <path
        d="M30,50 Q40,52 50,50 Q60,48 70,50"
        fill="none"
        stroke="#8B4513"
        strokeWidth="1"
        strokeDasharray="2,2"
      />
      {/* Bread crust */}
      <path
        d="M20,60 Q25,62 50,62 Q75,62 80,60"
        fill="none"
        stroke="#8B4513"
        strokeWidth="2"
      />
    </BaseFoodIcon>
  );
};

export default BreadCheeseIcon; 