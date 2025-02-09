import React from 'react';

const ScrollIndicator = ({ text = 'Scroll for more', direction = 'down' }) => {
  const getArrow = () => {
    switch(direction) {
      case 'down': return '↓';
      case 'up': return '↑';
      case 'left': return '←';
      case 'right': return '→';
      default: return '↓';
    }
  };

  return (
    <div className="scroll-indicator">
      <div className="arrow">{getArrow()}</div>
      <p className="scroll-text">{text}</p>

      <style jsx>{`
        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: float 2s ease-in-out infinite;
        }

        .arrow {
          color: var(--color-gold);
          font-size: 2.5rem;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          animation: bounce 1s ease-in-out infinite;
        }

        .scroll-text {
          color: var(--color-gold);
          font-size: 1.2rem;
          margin-top: 5px;
          font-family: var(--font-medieval);
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
          white-space: nowrap;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        @media (max-width: 480px) {
          .arrow {
            font-size: 2rem;
          }

          .scroll-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollIndicator; 