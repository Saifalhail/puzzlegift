import React, { useState } from 'react';

const HintIcon = ({ hint, position = 'top-right' }) => {
  const [showHint, setShowHint] = useState(false);

  const handleClick = () => {
    setShowHint(true);
  };

  return (
    <>
      <div className={`hint-icon-container ${position}`}>
        <button 
          className="hint-icon-button" 
          onClick={handleClick}
          aria-label="Show hint"
        >
          <div className="hint-icon">?</div>
        </button>
      </div>

      {showHint && (
        <div className="hint-popup">
          <div className="hint-content">
            <button className="close-button" onClick={() => setShowHint(false)}>×</button>
            <p>{hint}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .hint-icon-container {
          position: fixed;
          z-index: 1000;
        }

        .hint-icon-container.top-right {
          top: 20px;
          right: 20px;
        }

        .hint-icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          animation: float 3s ease-in-out infinite;
        }

        .hint-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--color-gold);
          color: var(--color-background);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-medieval);
          font-size: 1.8rem;
          font-weight: bold;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          transition: all 0.3s ease;
        }

        .hint-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.7);
        }

        .hint-popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          padding: 20px;
          background: rgba(0, 0, 0, 0.5);
          animation: fadeIn 0.3s ease-out;
        }

        .hint-content {
          background: linear-gradient(
            45deg,
            var(--color-gold),
            #ffd700,
            #ffed4a
          );
          padding: 30px 20px 20px;
          border-radius: var(--radius-medium);
          max-width: 90%;
          width: 400px;
          text-align: center;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          animation: scaleIn 0.3s ease-out;
          position: relative;
        }

        .hint-content p {
          color: var(--color-background);
          font-size: 1.8rem;
          line-height: 1.7;
          margin: 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          font-family: var(--font-text);
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-background);
          color: var(--color-gold);
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid var(--color-gold);
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .close-button:hover {
          background: var(--color-gold);
          color: var(--color-background);
          transform: scale(1.1);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 480px) {
          .hint-icon-container.top-right {
            top: 10px;
            right: 10px;
          }

          .hint-icon {
            width: 40px;
            height: 40px;
            font-size: 1.6rem;
          }

          .hint-content p {
            font-size: 1.6rem;
          }

          .close-button {
            width: 36px;
            height: 36px;
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default HintIcon; 