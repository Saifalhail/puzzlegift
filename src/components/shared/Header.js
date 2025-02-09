import React from 'react';
import BackButton from './BackButton';
import HintIcon from './HintIcon';

const Header = ({ onBack, hint, previousPuzzle }) => {
  return (
    <div className="header">
      <BackButton onBack={onBack} destination={previousPuzzle} />
      {hint && <HintIcon hint={hint} />}

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(
            to bottom,
            var(--color-background) 60%,
            transparent
          );
          z-index: 1001;
        }

        @media (max-width: 480px) {
          .header {
            height: 60px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header; 