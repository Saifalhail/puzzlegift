import React from 'react';

const BasePortrait = ({ children, size = 60 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    style={{
      filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, var(--color-primary), var(--color-background))',
      border: '2px solid var(--color-gold)',
    }}
  >
    {children}
  </svg>
);

export const HusbandPortrait = ({ size }) => (
  <BasePortrait size={size}>
    {/* Face shape */}
    <path
      d="M30,30 Q50,20 70,30 Q75,45 70,70 Q50,80 30,70 Q25,45 30,30"
      fill="#FFE0BD"
      stroke="#8B4513"
      strokeWidth="2"
    />
    {/* Beard */}
    <path
      d="M35,55 Q50,65 65,55 Q60,75 50,80 Q40,75 35,55"
      fill="#1A1A1A"
      stroke="#000"
      strokeWidth="1"
    />
    {/* Hair */}
    <path
      d="M25,40 Q50,20 75,40 L70,30 Q50,10 30,30 Z"
      fill="#1A1A1A"
      stroke="#000"
      strokeWidth="1"
    />
    {/* Glasses */}
    <path
      d="M35,45 L45,45 M55,45 L65,45"
      fill="none"
      stroke="#333"
      strokeWidth="2"
    />
    <circle cx="40" cy="45" r="5" fill="none" stroke="#333" strokeWidth="2" />
    <circle cx="60" cy="45" r="5" fill="none" stroke="#333" strokeWidth="2" />
  </BasePortrait>
);

export const WifePortrait = ({ size }) => (
  <BasePortrait size={size}>
    {/* Face shape */}
    <path
      d="M30,30 Q50,20 70,30 Q75,45 70,70 Q50,80 30,70 Q25,45 30,30"
      fill="#FFF0E6"
      stroke="#8B4513"
      strokeWidth="2"
    />
    {/* Hair back */}
    <path
      d="M25,35 Q50,15 75,35 Q80,50 75,65 Q50,80 25,65 Q20,50 25,35"
      fill="#1A1A1A"
      stroke="#000"
      strokeWidth="1"
    />
    {/* Hair front left */}
    <path
      d="M25,35 Q35,45 30,65 Q25,55 25,35"
      fill="#1A1A1A"
      stroke="#000"
      strokeWidth="1"
    />
    {/* Hair front right */}
    <path
      d="M75,35 Q65,45 70,65 Q75,55 75,35"
      fill="#1A1A1A"
      stroke="#000"
      strokeWidth="1"
    />
    {/* Face shape overlay to clean up hair edges */}
    <path
      d="M30,30 Q50,20 70,30 Q75,45 70,70 Q50,80 30,70 Q25,45 30,30"
      fill="#FFF0E6"
      stroke="none"
    />
    {/* Eyebrows */}
    <path
      d="M35,42 Q40,40 45,42"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth="1.5"
    />
    <path
      d="M55,42 Q60,40 65,42"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth="1.5"
    />
    {/* Eyes with eyelashes */}
    <path
      d="M37,45 L43,45"
      stroke="#1A1A1A"
      strokeWidth="1.5"
    />
    <path
      d="M57,45 L63,45"
      stroke="#1A1A1A"
      strokeWidth="1.5"
    />
    <circle cx="40" cy="45" r="2" fill="#1A1A1A" />
    <circle cx="60" cy="45" r="2" fill="#1A1A1A" />
    {/* Nose */}
    <path
      d="M48,45 Q50,50 52,45"
      fill="none"
      stroke="#C68642"
      strokeWidth="1"
    />
    {/* Lips */}
    <path
      d="M42,58 Q50,62 58,58"
      fill="none"
      stroke="#C68642"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M42,58 Q50,55 58,58"
      fill="none"
      stroke="#C68642"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </BasePortrait>
);

export const KnightPortrait = ({ size }) => (
  <BasePortrait size={size}>
    {/* Helmet */}
    <path
      d="M25,40 Q50,20 75,40 L70,70 Q50,80 30,70 Z"
      fill="#A9A9A9"
      stroke="#696969"
      strokeWidth="2"
    />
    {/* Face opening */}
    <path
      d="M40,45 Q50,40 60,45 Q60,60 50,65 Q40,60 40,45"
      fill="#FFE0BD"
      stroke="#8B4513"
      strokeWidth="2"
    />
    {/* Eyes */}
    <circle cx="45" cy="50" r="2" fill="#1A1A1A" />
    <circle cx="55" cy="50" r="2" fill="#1A1A1A" />
  </BasePortrait>
);

export const DuchessPortrait = ({ size }) => (
  <BasePortrait size={size}>
    {/* Face shape */}
    <path
      d="M30,30 Q50,20 70,30 Q75,45 70,70 Q50,80 30,70 Q25,45 30,30"
      fill="#FFE0BD"
      stroke="#8B4513"
      strokeWidth="2"
    />
    {/* Crown */}
    <path
      d="M30,30 L40,20 L50,30 L60,20 L70,30"
      fill="none"
      stroke="#FFD700"
      strokeWidth="3"
    />
    {/* Hair */}
    <path
      d="M25,40 Q50,20 75,40 Q70,60 50,70 Q30,60 25,40"
      fill="#8B4513"
      stroke="#654321"
      strokeWidth="1"
    />
    {/* Eyes */}
    <circle cx="40" cy="45" r="2" fill="#1A1A1A" />
    <circle cx="60" cy="45" r="2" fill="#1A1A1A" />
    {/* Smile */}
    <path
      d="M40,55 Q50,60 60,55"
      fill="none"
      stroke="#8B4513"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </BasePortrait>
);

export const WizardPortrait = ({ size }) => (
  <BasePortrait size={size}>
    {/* Hat */}
    <path
      d="M20,40 L50,10 L80,40"
      fill="#4A4E69"
      stroke="#22223B"
      strokeWidth="2"
    />
    {/* Face shape */}
    <path
      d="M30,40 Q50,30 70,40 Q75,55 70,70 Q50,80 30,70 Q25,55 30,40"
      fill="#FFE0BD"
      stroke="#8B4513"
      strokeWidth="2"
    />
    {/* Beard */}
    <path
      d="M35,55 Q50,65 65,55 Q60,80 50,85 Q40,80 35,55"
      fill="#CCCCCC"
      stroke="#A9A9A9"
      strokeWidth="1"
    />
    {/* Eyes */}
    <circle cx="40" cy="50" r="2" fill="#1A1A1A" />
    <circle cx="60" cy="50" r="2" fill="#1A1A1A" />
  </BasePortrait>
);

const Portraits = {
  Husband: HusbandPortrait,
  Wife: WifePortrait,
  Knight: KnightPortrait,
  Duchess: DuchessPortrait,
  Wizard: WizardPortrait,
};

export default Portraits; 