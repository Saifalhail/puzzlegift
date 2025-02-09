import React from 'react';

export const CrownEmblem = ({ className, onClick }) => (
  <svg viewBox="0 0 100 100" className={className} onClick={onClick}>
    <circle cx="50" cy="50" r="45" fill="#B8860B" />
    <path
      d="M25,60 L35,40 L50,50 L65,40 L75,60 L25,60 Z"
      fill="#FFD700"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <path
      d="M30,35 L35,40 M50,45 L50,50 M65,40 L70,35"
      fill="none"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <circle cx="35" cy="35" r="3" fill="#FF0000" />
    <circle cx="50" cy="40" r="3" fill="#0000FF" />
    <circle cx="65" cy="35" r="3" fill="#00FF00" />
  </svg>
);

export const LionEmblem = ({ className, onClick }) => (
  <svg viewBox="0 0 100 100" className={className} onClick={onClick}>
    <circle cx="50" cy="50" r="45" fill="#B8860B" />
    <path
      d="M30,30 Q50,20 70,30 Q60,40 50,35 Q40,40 30,30 Z"
      fill="#FFA500"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <path
      d="M45,40 Q50,45 55,40 M40,50 Q50,60 60,50 Q50,70 40,50 Z"
      fill="#FFA500"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <circle cx="45" cy="35" r="2" fill="#000" />
    <circle cx="55" cy="35" r="2" fill="#000" />
    <path
      d="M30,60 Q50,80 70,60"
      fill="none"
      stroke="#4A3000"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const RoseEmblem = ({ className, onClick }) => (
  <svg viewBox="0 0 100 100" className={className} onClick={onClick}>
    <circle cx="50" cy="50" r="45" fill="#B8860B" />
    <path
      d="M50,30 Q60,40 50,50 Q40,40 50,30 Z"
      fill="#FF69B4"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <path
      d="M40,40 Q50,50 40,60 Q30,50 40,40 Z"
      fill="#FF69B4"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <path
      d="M60,40 Q70,50 60,60 Q50,50 60,40 Z"
      fill="#FF69B4"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <path
      d="M50,50 Q60,60 50,70 Q40,60 50,50 Z"
      fill="#FF69B4"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <circle cx="50" cy="50" r="5" fill="#FFD700" />
    <path
      d="M50,70 L50,85"
      stroke="#006400"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const DragonEmblem = ({ className, onClick }) => (
  <svg viewBox="0 0 100 100" className={className} onClick={onClick}>
    <circle cx="50" cy="50" r="45" fill="#B8860B" />
    <path
      d="M30,50 Q40,30 60,30 Q70,30 70,40 Q70,50 60,55 Q50,60 40,55 Q30,50 30,40 Z"
      fill="#8B0000"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <path
      d="M60,30 Q70,20 80,30"
      fill="none"
      stroke="#4A3000"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M40,55 Q50,70 60,55"
      fill="#8B0000"
      stroke="#4A3000"
      strokeWidth="2"
    />
    <circle cx="45" cy="40" r="2" fill="#FFD700" />
    <path
      d="M55,45 Q60,45 65,40"
      fill="none"
      stroke="#FFD700"
      strokeWidth="2"
    />
  </svg>
);

const Emblems = {
  Crown: CrownEmblem,
  Lion: LionEmblem,
  Rose: RoseEmblem,
  Dragon: DragonEmblem,
};

export default Emblems; 