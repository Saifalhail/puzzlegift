import React from 'react';
import BaseFoodIcon from './BaseFoodIcon';

const MeadIcon = (props) => {
  return (
    <BaseFoodIcon {...props}>
      {/* Mug body */}
      <path
        d="M30,25 L60,25 L65,75 L25,75 Z"
        fill="#8B4513"
        stroke="#654321"
        strokeWidth="3"
      />
      {/* Mead liquid */}
      <path
        d="M32,30 L58,30 L62,70 L28,70 Z"
        fill="#FFD700"
        stroke="none"
      />
      {/* Foam top */}
      <path
        d="M32,30 Q45,25 58,30"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
      />
      {/* Handle */}
      <path
        d="M65,35 Q80,45 65,65"
        fill="none"
        stroke="#8B4513"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Bubbles */}
      <circle cx="40" cy="45" r="2" fill="#FFFFFF" opacity="0.6" />
      <circle cx="50" cy="55" r="2" fill="#FFFFFF" opacity="0.6" />
      <circle cx="45" cy="40" r="1.5" fill="#FFFFFF" opacity="0.6" />
      {/* Wood grain texture */}
      <path
        d="M35,35 L55,35 M33,45 L57,45 M31,55 L59,55 M29,65 L61,65"
        stroke="#654321"
        strokeWidth="1"
        strokeDasharray="2,3"
        opacity="0.3"
      />
    </BaseFoodIcon>
  );
};

export default MeadIcon; 