import React from 'react';
import BaseFoodIcon from './BaseFoodIcon';

const TurkeyLegIcon = (props) => {
  return (
    <BaseFoodIcon {...props}>
      {/* Main leg meat */}
      <path
        d="M30,30 Q45,35 65,70 Q55,75 45,75 Q35,75 25,65 Q20,55 30,30"
        fill="#CD853F"
        stroke="#8B4513"
        strokeWidth="2"
      />
      {/* Bone */}
      <path
        d="M65,70 L80,85"
        fill="none"
        stroke="#F5F5DC"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Meat texture */}
      <path
        d="M35,40 Q40,45 45,50 M40,55 Q45,60 50,65"
        fill="none"
        stroke="#8B4513"
        strokeWidth="1"
        strokeDasharray="2,3"
      />
      {/* Crispy skin highlights */}
      <path
        d="M32,35 Q40,40 45,45 M35,50 Q40,55 45,60"
        fill="none"
        stroke="#DEB887"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1,4"
      />
      {/* Bone end detail */}
      <circle
        cx="80"
        cy="85"
        r="4"
        fill="#F5F5DC"
        stroke="#DEB887"
        strokeWidth="1"
      />
    </BaseFoodIcon>
  );
};

export default TurkeyLegIcon; 