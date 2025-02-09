import React from 'react';
import BaseFoodIcon from './BaseFoodIcon';

const DrinkIcon = (props) => {
  return (
    <BaseFoodIcon {...props}>
      {/* Glass */}
      <path
        d="M35,20 L65,20 L60,80 L40,80 Z"
        fill="rgba(255, 99, 71, 0.8)"
        stroke="#CD5C5C"
        strokeWidth="2"
      />
      {/* Glass highlight */}
      <path
        d="M37,22 L63,22 L59,78 L41,78"
        fill="none"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
      />
      {/* Celery stick */}
      <path
        d="M45,15 L43,35 M47,15 L45,35"
        stroke="#90EE90"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Ice cubes */}
      <rect
        x="42"
        y="30"
        width="8"
        height="8"
        fill="rgba(255, 255, 255, 0.5)"
        transform="rotate(15, 46, 34)"
      />
      <rect
        x="48"
        y="45"
        width="8"
        height="8"
        fill="rgba(255, 255, 255, 0.5)"
        transform="rotate(-10, 52, 49)"
      />
      {/* Straw */}
      <path
        d="M55,15 Q60,30 55,50"
        fill="none"
        stroke="#FF0000"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Salt rim */}
      <path
        d="M35,20 Q50,18 65,20"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="2,2"
      />
    </BaseFoodIcon>
  );
};

export default DrinkIcon; 