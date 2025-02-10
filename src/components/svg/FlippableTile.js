import React from 'react';

const FlippableTile = ({ letter, isFlipped, onClick, isLocked }) => {
  return (
    <div 
      className={`tile-container ${isFlipped ? 'flipped' : ''} ${isLocked ? 'locked' : ''}`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="tile">
        {/* Back face (compass rose) */}
        <div className="tile-face back">
          <svg viewBox="0 0 100 100">
            <defs>
              <pattern
                id="tileTexture"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
              >
                <rect width="10" height="10" fill="#deb887" />
                <path
                  d="M0 5h10M5 0v10"
                  stroke="#d4a76a"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feFlood floodColor="#ffd700" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Tile background */}
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              rx="10"
              ry="10"
              fill="url(#tileTexture)"
              stroke="#8b4513"
              strokeWidth="2"
            />

            {/* Compass rose */}
            <g transform="translate(50, 50)">
              <circle r="30" fill="none" stroke="#8b4513" strokeWidth="2" />
              <path
                d="M0,-30 L0,30 M-30,0 L30,0"
                stroke="#8b4513"
                strokeWidth="2"
              />
              <path
                d="M0,-25 L5,-5 L0,0 L-5,-5 Z"
                fill="#8b4513"
                transform="rotate(0)"
              />
              <path
                d="M0,-25 L5,-5 L0,0 L-5,-5 Z"
                fill="#8b4513"
                transform="rotate(90)"
              />
              <path
                d="M0,-25 L5,-5 L0,0 L-5,-5 Z"
                fill="#8b4513"
                transform="rotate(180)"
              />
              <path
                d="M0,-25 L5,-5 L0,0 L-5,-5 Z"
                fill="#8b4513"
                transform="rotate(270)"
              />
            </g>

            {/* Decorative corners */}
            {[
              'M10,10 L20,10 L20,20',
              'M80,10 L90,10 L90,20',
              'M10,80 L10,90 L20,90',
              'M90,80 L90,90 L80,90'
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#8b4513"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        {/* Front face (letter) */}
        <div className="tile-face front">
          <svg viewBox="0 0 100 100">
            <defs>
              <pattern
                id="tileTextureFront"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
              >
                <rect width="10" height="10" fill="#f4e4bc" />
                <path
                  d="M0 5h10M5 0v10"
                  stroke="#e4d4ac"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>

            {/* Tile background */}
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              rx="10"
              ry="10"
              fill="url(#tileTextureFront)"
              stroke="#8b4513"
              strokeWidth="2"
            />

            {/* Letter */}
            <text
              x="50"
              y="65"
              textAnchor="middle"
              fontSize="45"
              fontFamily="MedievalSharp"
              fill="#4a4e69"
              filter="url(#glow)"
            >
              {letter}
            </text>

            {/* Decorative corners */}
            {[
              'M10,10 L20,10 L20,20',
              'M80,10 L90,10 L90,20',
              'M10,80 L10,90 L20,90',
              'M90,80 L90,90 L80,90'
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#8b4513"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>

      <style jsx>{`
        .tile-container {
          width: 100px;
          height: 100px;
          perspective: 1000px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .tile-container:hover:not(.locked) {
          transform: scale(1.05);
        }

        .tile {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .tile-container.flipped .tile {
          transform: rotateY(180deg);
        }

        .tile-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tile-face.front {
          transform: rotateY(180deg);
        }

        .tile-container.locked {
          cursor: default;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .tile-container {
            width: 80px;
            height: 80px;
          }
        }

        @media (max-width: 480px) {
          .tile-container {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default FlippableTile;