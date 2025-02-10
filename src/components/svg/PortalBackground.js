import React from 'react';

const PortalBackground = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Portal Gradients */}
        <radialGradient id="portalCore">
          <stop offset="0%" stopColor="#9933ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#6600cc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#330066" stopOpacity="0.3" />
        </radialGradient>

        <radialGradient id="portalRim">
          <stop offset="0%" stopColor="#cc99ff" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#9933ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6600cc" stopOpacity="0" />
        </radialGradient>

        {/* Magic Particles Pattern */}
        <pattern id="magicParticles" patternUnits="userSpaceOnUse" width="100" height="100">
          <circle cx="50" cy="50" r="2" fill="#ffffff" opacity="0.5" />
          <circle cx="20" cy="30" r="1" fill="#ffffff" opacity="0.3" />
          <circle cx="80" cy="70" r="1.5" fill="#ffffff" opacity="0.4" />
        </pattern>

        {/* Swirl Path for Animation */}
        <path
          id="swirlPath"
          d="M0,0 C30,-30 70,-30 100,0 C130,30 130,70 100,100 C70,130 30,130 0,100 C-30,70 -30,30 0,0"
          fill="none"
        />
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="1000" height="600" fill="#1a1a2e" />

      {/* Portal Base Layer */}
      <g className="portal-container" transform="translate(500, 300)">
        {/* Outer Swirls */}
        {[...Array(8)].map((_, i) => (
          <g key={`swirl-${i}`} className={`swirl-group-${i}`}>
            <path
              d="M-200,-200 A282.84,282.84 0 0,1 200,-200 A282.84,282.84 0 0,1 200,200 A282.84,282.84 0 0,1 -200,200 A282.84,282.84 0 0,1 -200,-200"
              fill="none"
              stroke="url(#portalRim)"
              strokeWidth="2"
              transform={`rotate(${45 * i})`}
              className="portal-swirl"
            />
          </g>
        ))}

        {/* Inner Portal Core */}
        <circle r="150" fill="url(#portalCore)" className="portal-core">
          <animate
            attributeName="r"
            values="150;160;150"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Energy Rings */}
        {[1, 2, 3].map((i) => (
          <circle
            key={`ring-${i}`}
            r={50 * i}
            fill="none"
            stroke="#9933ff"
            strokeWidth="2"
            opacity="0.3"
            className={`energy-ring ring-${i}`}
          />
        ))}

        {/* Floating Particles */}
        <g className="particles">
          {[...Array(12)].map((_, i) => (
            <g key={`particle-group-${i}`} transform={`rotate(${30 * i})`}>
              <circle
                cx={120}
                cy={0}
                r="3"
                fill="#ffffff"
                className={`particle particle-${i}`}
              />
            </g>
          ))}
        </g>

        {/* Magic Runes */}
        {[...Array(8)].map((_, i) => (
          <text
            key={`rune-${i}`}
            x="0"
            y="0"
            fontSize="20"
            fill="#cc99ff"
            opacity="0.6"
            textAnchor="middle"
            transform={`translate(${180 * Math.cos(i * Math.PI / 4)}, ${180 * Math.sin(i * Math.PI / 4)})`}
            className={`rune rune-${i}`}
          >
            ⚡
          </text>
        ))}
      </g>

      {/* Ambient Magic Particles */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="600"
        fill="url(#magicParticles)"
        className="ambient-particles"
      />

      <style jsx>{`
        .portal-container {
          animation: portalPulse 5s infinite ease-in-out;
        }

        .portal-swirl {
          animation: rotate 20s infinite linear;
          transform-origin: center;
        }

        .energy-ring {
          animation: ringPulse 3s infinite ease-in-out;
          transform-origin: center;
        }

        .particle {
          animation: particleFloat 4s infinite ease-in-out;
        }

        .rune {
          animation: runeGlow 2s infinite alternate;
        }

        .ambient-particles {
          animation: particleDrift 20s infinite linear;
          opacity: 0.3;
        }

        @keyframes portalPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.2); }
        }

        @keyframes runeGlow {
          from { opacity: 0.3; }
          to { opacity: 0.8; }
        }

        @keyframes particleDrift {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }

        .ring-1 { animation-delay: 0s; }
        .ring-2 { animation-delay: -1s; }
        .ring-3 { animation-delay: -2s; }

        ${[...Array(12)].map((_, i) => `
          .particle-${i} {
            animation-delay: -${i * 0.3}s;
          }
        `).join('\n')}

        ${[...Array(8)].map((_, i) => `
          .rune-${i} {
            animation-delay: -${i * 0.25}s;
          }
        `).join('\n')}

        ${[...Array(8)].map((_, i) => `
          .swirl-group-${i} {
            animation-delay: -${i * 0.5}s;
          }
        `).join('\n')}
      `}</style>
    </svg>
  );
};

export default PortalBackground; 