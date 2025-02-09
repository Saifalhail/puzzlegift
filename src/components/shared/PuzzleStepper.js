import React from 'react';

const PuzzleStepper = ({ currentPuzzle, totalPuzzles, onNavigate }) => {
  return (
    <div className="stepper-container">
      <div className="stepper">
        {Array.from({ length: totalPuzzles }, (_, index) => (
          <div
            key={index}
            className={`step ${currentPuzzle === index ? 'active' : ''} 
                       ${currentPuzzle > index ? 'completed' : ''}`}
            onClick={() => currentPuzzle > index && onNavigate(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <style jsx>{`
        .stepper-container {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 20px;
        }

        .stepper {
          display: flex;
          gap: 4px;
          align-items: center;
          background: transparent;
        }

        .step {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--color-gold);
          border-radius: 4px;
          font-family: var(--font-medieval);
          font-size: 0.9rem;
          color: var(--color-gold);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          opacity: 0.7;
        }

        .step:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 2px;
          background: var(--color-gold);
          opacity: 0.7;
        }

        .step.active {
          background: var(--color-gold);
          color: var(--color-background);
          opacity: 1;
          transform: scale(1.1);
        }

        .step.completed {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-background);
          opacity: 1;
        }

        .step:not(.completed):not(.active) {
          cursor: default;
        }

        @media (max-width: 768px) {
          .stepper-container {
            top: 70px;
            padding: 0 15px;
          }

          .step {
            width: 22px;
            height: 22px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .stepper-container {
            top: 65px;
            padding: 0 10px;
          }

          .step {
            width: 20px;
            height: 20px;
            font-size: 0.8rem;
          }

          .step:not(:last-child)::after {
            width: 6px;
            right: -5px;
          }
        }
      `}</style>
    </div>
  );
};

export default PuzzleStepper; 