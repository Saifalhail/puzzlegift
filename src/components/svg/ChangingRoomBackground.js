import React from 'react';

const ChangingRoomBackground = ({ className }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5e6e8" />
          <stop offset="100%" stopColor="#d4c4c6" />
        </linearGradient>
        
        <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b7355" />
          <stop offset="100%" stopColor="#6b5642" />
        </linearGradient>

        <pattern id="curtainPattern" patternUnits="userSpaceOnUse" width="40" height="40">
          <path
            d="M0 0 Q20 20 40 0 Q20 20 0 40 Q20 20 40 40"
            fill="none"
            stroke="#d4afb9"
            strokeWidth="2"
          />
        </pattern>
      </defs>

      {/* Main wall */}
      <rect x="0" y="0" width="800" height="500" fill="url(#wallGradient)" />
      
      {/* Floor */}
      <rect x="0" y="500" width="800" height="100" fill="url(#floorGradient)" />

      {/* Changing room stalls */}
      {[0, 1, 2, 3].map(i => (
        <g key={i} transform={`translate(${150 + i * 180}, 50)`}>
          {/* Stall frame */}
          <rect
            x="0"
            y="0"
            width="150"
            height="400"
            fill="none"
            stroke="#8b7355"
            strokeWidth="4"
          />

          {/* Curtain rod */}
          <rect
            x="-5"
            y="10"
            width="160"
            height="4"
            fill="#8b7355"
          />

          {/* Curtain */}
          <g className={`curtain-${i}`}>
            <rect
              x="5"
              y="10"
              width="140"
              height="380"
              fill="url(#curtainPattern)"
              className="curtain"
            />
            <path
              d={`M5 10 Q75 40 145 10 Q75 50 5 10 
                  M5 50 Q75 80 145 50 Q75 90 5 50
                  M5 90 Q75 120 145 90 Q75 130 5 90
                  M5 130 Q75 160 145 130 Q75 170 5 130
                  M5 170 Q75 200 145 170 Q75 210 5 170
                  M5 210 Q75 240 145 210 Q75 250 5 210
                  M5 250 Q75 280 145 250 Q75 290 5 250
                  M5 290 Q75 320 145 290 Q75 330 5 290
                  M5 330 Q75 360 145 330 Q75 370 5 330`}
              fill="#f8c1d0"
              opacity="0.7"
              className="curtain-folds"
            />
          </g>

          {/* Mirror */}
          <rect
            x="20"
            y="50"
            width="110"
            height="200"
            fill="#c4c4c4"
            opacity="0.3"
          />
        </g>
      ))}

      {/* Decorative elements */}
      <g className="sparkles">
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 800}
            cy={Math.random() * 600}
            r="2"
            fill="#fff"
            className="sparkle"
            style={{
              animation: `twinkle ${2 + Math.random() * 2}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </g>

      <style jsx>{`
        .curtain {
          animation: sway 8s ease-in-out infinite;
          transform-origin: top;
        }

        .curtain-folds {
          animation: sway 8s ease-in-out infinite;
          transform-origin: top;
        }

        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1deg); }
        }

        .sparkle {
          opacity: 0;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }

        .curtain-0 { animation-delay: 0s; }
        .curtain-1 { animation-delay: 0.5s; }
        .curtain-2 { animation-delay: 1s; }
        .curtain-3 { animation-delay: 1.5s; }
      `}</style>
    </svg>
  );
};

export default ChangingRoomBackground; 