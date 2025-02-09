import React from 'react';

const WorkshopBackground = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Stone wall pattern */}
        <pattern
          id="stonePattern"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
          patternTransform="rotate(0)"
        >
          <path
            d="M0 0h50v50H0zm50 50h50v50H50z"
            fill="#2a2a3a"
            fillOpacity="0.3"
          />
          <path
            d="M0 50h50v50H0zm50 0h50v-50H50z"
            fill="#1a1a2a"
            fillOpacity="0.3"
          />
          <path
            d="M25 25h50v50H25zm0-25h50v25H25z"
            fill="#3a3a4a"
            fillOpacity="0.2"
          />
        </pattern>

        {/* Wood grain pattern */}
        <pattern
          id="woodPattern"
          patternUnits="userSpaceOnUse"
          width="100"
          height="20"
        >
          <path
            d="M0 0h100v20H0z"
            fill="#8B4513"
            fillOpacity="0.2"
          />
          <path
            d="M0 5h100M0 15h100"
            stroke="#6B3410"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
        </pattern>

        {/* Torch glow gradient */}
        <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="1000" height="600" fill="#1a1a2a" />

      {/* Stone walls */}
      <rect width="1000" height="600" fill="url(#stonePattern)" />

      {/* Wooden workbench */}
      <rect x="100" y="400" width="800" height="30" fill="url(#woodPattern)" />
      <rect x="150" y="430" width="40" height="170" fill="url(#woodPattern)" />
      <rect x="810" y="430" width="40" height="170" fill="url(#woodPattern)" />

      {/* Tools on the wall */}
      <g transform="translate(50, 100)" fill="#8B4513">
        <rect x="0" y="0" width="10" height="100" /> {/* Hammer handle */}
        <circle cx="5" cy="0" r="15" fill="#4a4a5a" /> {/* Hammer head */}
        
        <rect x="40" y="20" width="8" height="80" /> {/* Wrench */}
        <path d="M30 10 L58 30 L30 50 Z" fill="#4a4a5a" /> {/* Wrench head */}
        
        <rect x="80" y="10" width="5" height="90" /> {/* Screwdriver */}
        <path d="M77 5 L88 5 L82.5 15 Z" fill="#4a4a5a" /> {/* Screwdriver tip */}
      </g>

      {/* Torches */}
      <g className="torch left-torch">
        <circle cx="50" cy="200" r="40" fill="url(#torchGlow)" className="torch-glow" />
        <rect x="45" y="180" width="10" height="40" fill="#8B4513" />
        <path
          d="M40 180 Q50 160 60 180"
          fill="#FF6B00"
          className="flame"
        />
      </g>

      <g className="torch right-torch">
        <circle cx="950" cy="200" r="40" fill="url(#torchGlow)" className="torch-glow" />
        <rect x="945" y="180" width="10" height="40" fill="#8B4513" />
        <path
          d="M940 180 Q950 160 960 180"
          fill="#FF6B00"
          className="flame"
        />
      </g>

      {/* Workshop details */}
      <g transform="translate(800, 100)" fill="#4a4a5a">
        <rect x="0" y="0" width="150" height="2" /> {/* Shelf */}
        <rect x="20" y="10" width="20" height="30" /> {/* Box */}
        <rect x="60" y="10" width="30" height="20" /> {/* Tool */}
        <circle cx="110" cy="20" r="10" /> {/* Gear */}
      </g>

      <style jsx>{`
        .torch-glow {
          animation: glow 2s infinite alternate;
        }

        .flame {
          animation: flicker 0.5s infinite alternate;
        }

        @keyframes glow {
          from { opacity: 0.4; }
          to { opacity: 0.8; }
        }

        @keyframes flicker {
          from {
            transform: scaleY(0.9) translateY(2px);
            opacity: 0.8;
          }
          to {
            transform: scaleY(1.1) translateY(-2px);
            opacity: 1;
          }
        }
      `}</style>
    </svg>
  );
};

export default WorkshopBackground; 