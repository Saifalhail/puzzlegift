import React from 'react';

const BackButton = ({ onBack, destination = 'previous', className = '' }) => {
  const handleClick = () => {
    onBack && onBack(destination);
  };

  return (
    <div className={`navigation-controls ${className}`}>
      <button 
        className="medieval-button nav-button" 
        onClick={handleClick}
        aria-label="Go back"
      >
        ← Back
      </button>

      <style jsx>{`
        .navigation-controls {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 100;
        }

        .nav-button {
          font-size: 1rem;
          padding: 8px 16px;
          min-width: 90px;
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          transform: translateX(-5px);
        }

        @media (max-width: 480px) {
          .navigation-controls {
            top: 10px;
            left: 10px;
          }

          .nav-button {
            font-size: 0.9rem;
            padding: 6px 12px;
            min-width: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default BackButton; 