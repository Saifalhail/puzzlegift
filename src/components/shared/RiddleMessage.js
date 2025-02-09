import React from 'react';

const RiddleMessage = ({ riddle, instructions = [] }) => {
  return (
    <div className="medieval-scroll riddle-scroll">
      <div className="scroll-content">
        <p className="puzzle-text riddle-text" style={{ textAlign: 'center', fontStyle: 'italic' }}>
          {riddle}
        </p>
        {instructions.length > 0 && (
          <div className="puzzle-instructions">
            {instructions.map((instruction, index) => (
              <p key={index} className="instruction-text">
                [{instruction}]
              </p>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .riddle-scroll {
          max-width: 800px;
          margin: 15px auto 20px;
          padding: 15px;
        }

        .riddle-text {
          font-size: 2rem;
          line-height: 1.4;
          margin-bottom: 15px;
          color: var(--color-wood);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .puzzle-instructions {
          margin-top: 10px;
          text-align: center;
          background: rgba(74, 78, 105, 0.9);
          padding: 10px;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .instruction-text {
          font-size: 1.4rem;
          color: var(--color-text);
          margin: 5px 0;
          font-style: italic;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 480px) {
          .riddle-text {
            font-size: 1.8rem;
          }

          .instruction-text {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RiddleMessage; 