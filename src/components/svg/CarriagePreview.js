import React from 'react';

const CarriagePreview = ({ wheels, color, ornament, trim, emblem }) => {
  const getWheelStyle = () => {
    switch (wheels) {
      case 'modern':
        return (
          <g>
            <circle cx="0" cy="0" r="40" fill="#333" />
            <circle cx="0" cy="0" r="35" fill="#666" />
            <circle cx="0" cy="0" r="20" fill="#333" />
            <path d="M-30 0 L30 0 M0 -30 L0 30" stroke="#888" strokeWidth="5" />
            <circle cx="0" cy="0" r="5" fill="#888" />
          </g>
        );
      case 'sport':
        return (
          <g>
            <circle cx="0" cy="0" r="40" fill="#1a1a1a" />
            <circle cx="0" cy="0" r="35" fill="#333" />
            <g>
              {[...Array(5)].map((_, i) => (
                <path
                  key={i}
                  d="M-30 -5 L30 -5 L30 5 L-30 5 Z"
                  fill="#666"
                  transform={`rotate(${i * 72})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="5" fill="#888" />
          </g>
        );
      case 'luxury':
        return (
          <g>
            <circle cx="0" cy="0" r="40" fill="#444" />
            <circle cx="0" cy="0" r="35" fill="#666" />
            <g>
              {[...Array(10)].map((_, i) => (
                <path
                  key={i}
                  d="M-35 0 L-25 0"
                  stroke="#888"
                  strokeWidth="3"
                  transform={`rotate(${i * 36})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="15" fill="#444" />
            <circle cx="0" cy="0" r="5" fill="#888" />
          </g>
        );
      default: // classic
        return (
          <g>
            <circle cx="0" cy="0" r="40" fill="#8B4513" />
            <circle cx="0" cy="0" r="35" fill="#A0522D" />
            <circle cx="0" cy="0" r="30" fill="#8B4513" />
            <g>
              {[...Array(8)].map((_, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-35"
                  width="6"
                  height="70"
                  fill="#6B4423"
                  transform={`rotate(${i * 45})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="5" fill="#6B4423" />
          </g>
        );
    }
  };

  const getOrnamentStyle = () => {
    switch (ornament) {
      case 'bentley':
        return (
          <g transform="translate(0, -10) scale(0.8)">
            <path
              d="M-20 0 L20 0 M0 -20 L0 20"
              stroke="#DDD"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="15" fill="none" stroke="#DDD" strokeWidth="4" />
          </g>
        );
      case 'crown':
        return (
          <path
            d="M-20 0 L-10 -15 L0 0 L10 -15 L20 0 L15 5 L-15 5 Z"
            fill="#DDD"
          />
        );
      case 'star':
        return (
          <path
            d="M0 -20 L5 -5 L20 -5 L10 5 L15 20 L0 10 L-15 20 L-10 5 L-20 -5 L-5 -5 Z"
            fill="#DDD"
            transform="scale(0.8)"
          />
        );
      case 'dragon':
        return (
          <path
            d="M-20 0 Q-10 -20 0 -10 Q10 -20 20 0 Q10 10 0 5 Q-10 10 -20 0 Z"
            fill="#DDD"
          />
        );
      default:
        return null;
    }
  };

  const getEmblemStyle = () => {
    switch (emblem) {
      case 'bentley':
        return (
          <g transform="translate(0, 0) scale(0.6)">
            <path
              d="M-20 0 L20 0 M0 -20 L0 20"
              stroke="#DDD"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="15" fill="none" stroke="#DDD" strokeWidth="4" />
          </g>
        );
      case 'wings':
        return (
          <path
            d="M-30 0 Q-15 -20 0 0 Q15 -20 30 0 Q15 10 0 0 Q-15 10 -30 0 Z"
            fill="#DDD"
          />
        );
      case 'shield':
        return (
          <path
            d="M-15 -20 L15 -20 L20 0 L0 20 L-20 0 Z"
            fill="#DDD"
          />
        );
      case 'crest':
        return (
          <path
            d="M0 -20 Q20 -10 20 10 Q0 30 0 20 Q0 30 -20 10 Q-20 -10 0 -20"
            fill="#DDD"
          />
        );
      default:
        return null;
    }
  };

  const getCarriageColor = () => {
    switch (color) {
      case 'silver': return '#C0C0C0';
      case 'black': return '#1a1a1a';
      case 'pink': return '#FFB6C1';
      case 'gold': return '#FFD700';
      default: return '#C0C0C0';
    }
  };

  const getTrimColor = () => {
    switch (trim) {
      case 'chrome': return '#DDD';
      case 'gold': return '#FFD700';
      case 'black': return '#1a1a1a';
      case 'matching': return getCarriageColor();
      default: return '#DDD';
    }
  };

  return (
    <svg
      viewBox="-200 -150 400 300"
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={getCarriageColor()} stopOpacity="0.8" />
          <stop offset="50%" stopColor={getCarriageColor()} stopOpacity="1" />
          <stop offset="100%" stopColor={getCarriageColor()} stopOpacity="0.8" />
        </linearGradient>

        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main body */}
      <g filter="url(#shadow)">
        <path
          d="M-150 0 
             Q-150 -80 0 -80 
             Q150 -80 150 0 
             Q150 80 0 80 
             Q-150 80 -150 0 Z"
          fill="url(#bodyGradient)"
          stroke={getTrimColor()}
          strokeWidth="3"
        />

        {/* Windows */}
        <path
          d="M-100 -40 
             Q-100 -60 -60 -60 
             Q-20 -60 -20 -40 
             Q-20 -20 -60 -20 
             Q-100 -20 -100 -40 Z"
          fill="#333"
          stroke={getTrimColor()}
          strokeWidth="2"
        />

        <path
          d="M20 -40 
             Q20 -60 60 -60 
             Q100 -60 100 -40 
             Q100 -20 60 -20 
             Q20 -20 20 -40 Z"
          fill="#333"
          stroke={getTrimColor()}
          strokeWidth="2"
        />

        {/* Door */}
        <path
          d="M-50 0 
             Q-50 -40 0 -40 
             Q50 -40 50 0 
             Q50 40 0 40 
             Q-50 40 -50 0 Z"
          fill="none"
          stroke={getTrimColor()}
          strokeWidth="2"
        />

        {/* Door handle */}
        <circle cx="30" cy="0" r="5" fill={getTrimColor()} />

        {/* Side Emblems */}
        <g transform="translate(-120, 0)">
          {getEmblemStyle()}
        </g>
        <g transform="translate(120, 0)">
          {getEmblemStyle()}
        </g>
      </g>

      {/* Wheels */}
      <g transform="translate(-100, 60)">
        {getWheelStyle()}
      </g>
      <g transform="translate(100, 60)">
        {getWheelStyle()}
      </g>

      {/* Hood ornament */}
      <g transform="translate(0, -80)">
        {getOrnamentStyle()}
      </g>

      {/* Sparkle effects for modern elements */}
      {wheels === 'modern' && (
        <g className="sparkles">
          <circle cx="-100" cy="60" r="3" fill="#FFF" className="sparkle" />
          <circle cx="100" cy="60" r="3" fill="#FFF" className="sparkle" />
          <circle cx="-120" cy="0" r="2" fill="#FFF" className="sparkle" />
          <circle cx="120" cy="0" r="2" fill="#FFF" className="sparkle" />
        </g>
      )}

      <style jsx>{`
        .sparkle {
          animation: twinkle 1s infinite alternate;
        }

        @keyframes twinkle {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }

        .sparkles circle:nth-child(2) {
          animation-delay: 0.3s;
        }
        
        .sparkles circle:nth-child(3) {
          animation-delay: 0.6s;
        }
        
        .sparkles circle:nth-child(4) {
          animation-delay: 0.9s;
        }
      `}</style>
    </svg>
  );
};

export default CarriagePreview; 