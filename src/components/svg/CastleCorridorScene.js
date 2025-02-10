import React from 'react';

const CastleCorridorScene = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Stone Wall Pattern */}
        <pattern id="stonePattern" patternUnits="userSpaceOnUse" width="100" height="60">
          {/* Large stones */}
          <rect width="50" height="30" fill="#2a2a3a" stroke="#1a1a2e" strokeWidth="2" />
          <rect x="50" y="30" width="50" height="30" fill="#2a2a3a" stroke="#1a1a2e" strokeWidth="2" />
          {/* Smaller stones */}
          <rect x="50" y="0" width="25" height="30" fill="#252535" stroke="#1a1a2e" strokeWidth="2" />
          <rect x="75" y="0" width="25" height="30" fill="#2f2f3f" stroke="#1a1a2e" strokeWidth="2" />
          <rect x="0" y="30" width="25" height="30" fill="#2f2f3f" stroke="#1a1a2e" strokeWidth="2" />
          <rect x="25" y="30" width="25" height="30" fill="#252535" stroke="#1a1a2e" strokeWidth="2" />
        </pattern>

        {/* Enhanced Torch Glow Gradient */}
        <radialGradient id="torchGlow">
          <stop offset="0%" stopColor="#ff8533" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#ff6600" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
        </radialGradient>

        {/* Candle Glow Gradient */}
        <radialGradient id="candleGlow">
          <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffcc00" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
        </radialGradient>

        {/* Lightning Effect Gradient */}
        <radialGradient id="lightningGlow">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#9999ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#6666ff" stopOpacity="0" />
        </radialGradient>

        {/* Floor Pattern */}
        <pattern id="floorPattern" patternUnits="userSpaceOnUse" width="80" height="80">
          <rect width="80" height="80" fill="#1a1a2e" />
          <rect width="40" height="40" fill="#252535" />
          <rect x="40" y="40" width="40" height="40" fill="#252535" />
        </pattern>

        {/* Spider Web Pattern */}
        <pattern id="spiderWebPattern" patternUnits="userSpaceOnUse" width="100" height="100">
          <path
            d="M0 0 L100 100 M0 100 L100 0 M50 0 L50 100 M0 50 L100 50"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity="0.1"
          />
        </pattern>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="1000" height="600" fill="#0f0f1a" />

      {/* Floor */}
      <path
        d="M200 300 L800 300 L900 600 L100 600 Z"
        fill="url(#floorPattern)"
        opacity="0.7"
      />

      {/* Left Wall */}
      <path
        d="M200 0 L200 300 L100 600 L0 600 L0 0 Z"
        fill="url(#stonePattern)"
      />

      {/* Right Wall */}
      <path
        d="M800 0 L800 300 L900 600 L1000 600 L1000 0 Z"
        fill="url(#stonePattern)"
      />

      {/* Ceiling */}
      <path
        d="M200 0 L800 0 L800 100 Q500 150 200 100 Z"
        fill="url(#stonePattern)"
      />

      {/* Spider Webs in Corners */}
      <path
        d="M0 0 L200 0 L200 200 Z"
        fill="url(#spiderWebPattern)"
      />
      <path
        d="M800 0 L1000 0 L1000 200 L800 200 Z"
        fill="url(#spiderWebPattern)"
      />

      {/* Wall Sconces - Left Side */}
      {[1, 2, 3].map((i) => (
        <g key={`left-sconce-${i}`} className="sconce" transform={`translate(150, ${150 + i * 100})`}>
          <path d="M-10 0 L10 0 L5 10 L-5 10 Z" fill="#4a3a2a" />
          <circle cx="0" cy="0" r="30" fill="url(#candleGlow)" className="sconce-glow" />
          <path
            className="candle-flame"
            d="M0 -5 Q2 -10 3 -15 Q4 -10 5 -5 Q2 -2 0 -5"
            fill="#ffcc00"
          >
            <animate
              attributeName="d"
              dur="0.8s"
              repeatCount="indefinite"
              values="
                M0 -5 Q2 -10 3 -15 Q4 -10 5 -5 Q2 -2 0 -5;
                M0 -5 Q2 -12 3 -17 Q4 -12 5 -5 Q2 -2 0 -5;
                M0 -5 Q2 -10 3 -15 Q4 -10 5 -5 Q2 -2 0 -5
              "
            />
          </path>
        </g>
      ))}

      {/* Wall Sconces - Right Side */}
      {[1, 2, 3].map((i) => (
        <g key={`right-sconce-${i}`} className="sconce" transform={`translate(850, ${150 + i * 100})`}>
          <path d="M-10 0 L10 0 L5 10 L-5 10 Z" fill="#4a3a2a" />
          <circle cx="0" cy="0" r="30" fill="url(#candleGlow)" className="sconce-glow" />
          <path
            className="candle-flame"
            d="M0 -5 Q2 -10 3 -15 Q4 -10 5 -5 Q2 -2 0 -5"
            fill="#ffcc00"
          >
            <animate
              attributeName="d"
              dur="0.8s"
              repeatCount="indefinite"
              values="
                M0 -5 Q2 -10 3 -15 Q4 -10 5 -5 Q2 -2 0 -5;
                M0 -5 Q2 -12 3 -17 Q4 -12 5 -5 Q2 -2 0 -5;
                M0 -5 Q2 -10 3 -15 Q4 -10 5 -5 Q2 -2 0 -5
              "
            />
          </path>
        </g>
      ))}

      {/* Main Torches */}
      <g className="torch left-torch">
        <rect x="100" y="200" width="10" height="30" fill="#4a3a2a" />
        <path
          d="M95 200 Q100 190 105 200 L105 190 Q100 185 95 190 Z"
          fill="#654321"
        />
        <path
          className="flame"
          d="M100 190 Q103 180 105 175 Q108 185 110 190 Q105 195 100 190"
          fill="#ff6600"
        >
          <animate
            attributeName="d"
            dur="0.5s"
            repeatCount="indefinite"
            values="
              M100 190 Q103 180 105 175 Q108 185 110 190 Q105 195 100 190;
              M100 190 Q103 175 105 170 Q108 180 110 190 Q105 195 100 190;
              M100 190 Q103 180 105 175 Q108 185 110 190 Q105 195 100 190
            "
          />
        </path>
        <circle
          cx="100"
          cy="190"
          r="50"
          fill="url(#torchGlow)"
          className="torch-glow"
        />
      </g>

      <g className="torch right-torch">
        <rect x="890" y="200" width="10" height="30" fill="#4a3a2a" />
        <path
          d="M885 200 Q890 190 895 200 L895 190 Q890 185 885 190 Z"
          fill="#654321"
        />
        <path
          className="flame"
          d="M890 190 Q893 180 895 175 Q898 185 900 190 Q895 195 890 190"
          fill="#ff6600"
        >
          <animate
            attributeName="d"
            dur="0.5s"
            repeatCount="indefinite"
            values="
              M890 190 Q893 180 895 175 Q898 185 900 190 Q895 195 890 190;
              M890 190 Q893 175 895 170 Q898 180 900 190 Q895 195 890 190;
              M890 190 Q893 180 895 175 Q898 185 900 190 Q895 195 890 190
            "
          />
        </path>
        <circle
          cx="890"
          cy="190"
          r="50"
          fill="url(#torchGlow)"
          className="torch-glow"
        />
      </g>

      {/* Lightning Effects around text area */}
      <g className="lightning-container">
        {[1, 2, 3, 4].map((i) => (
          <circle
            key={`lightning-${i}`}
            cx={250 + i * 150}
            cy="150"
            r="40"
            fill="url(#lightningGlow)"
            className={`lightning-glow lightning-${i}`}
          />
        ))}
      </g>

      {/* Shadows */}
      <path
        d="M200 300 L800 300 L900 600 L100 600 Z"
        fill="#000000"
        opacity="0.3"
        className="floor-shadow"
      />

      {/* Atmospheric Fog */}
      <g className="fog">
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M${200 + i * 150} 100 
                Q${500} ${150 + i * 30} ${800 - i * 150} 100
                Q${500} ${200 + i * 30} ${200 + i * 150} 100`}
            fill="#aaaaff"
            opacity="0.03"
            className={`fog-layer fog-${i}`}
          />
        ))}
      </g>

      <style jsx>{`
        .torch-glow {
          animation: flicker 2s infinite alternate;
        }

        .sconce-glow {
          animation: candleFlicker 1.5s infinite alternate;
        }

        .flame, .candle-flame {
          transform-origin: center bottom;
          animation: sway 1s infinite alternate;
        }

        .lightning-glow {
          animation: lightningPulse 3s infinite;
          opacity: 0;
        }

        .fog-layer {
          animation: drift 20s infinite alternate;
        }

        @keyframes flicker {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.5; }
          75% { opacity: 0.3; }
        }

        @keyframes candleFlicker {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }

        @keyframes sway {
          from { transform: rotate(-5deg); }
          to { transform: rotate(5deg); }
        }

        @keyframes lightningPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.2; }
        }

        @keyframes drift {
          from { transform: translateX(-20px) translateY(0); }
          to { transform: translateX(20px) translateY(-10px); }
        }

        .lightning-1 { animation-delay: 0s; }
        .lightning-2 { animation-delay: -1s; }
        .lightning-3 { animation-delay: -2s; }
        .lightning-4 { animation-delay: -3s; }

        .fog-0 { animation-delay: 0s; }
        .fog-1 { animation-delay: -4s; }
        .fog-2 { animation-delay: -8s; }
        .fog-3 { animation-delay: -12s; }
        .fog-4 { animation-delay: -16s; }
      `}</style>
    </svg>
  );
};

export default CastleCorridorScene; 