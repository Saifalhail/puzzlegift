import React, { useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import PuzzleStepper from '../shared/PuzzleStepper';
import SoundManager from '../../utils/SoundManager';
import PortalBackground from '../svg/PortalBackground';

const UnlikelyMemoriesBuffer = ({ onComplete, onBack, previousPuzzle = 6 }) => {
  useEffect(() => {
    // Start with medieval music and transition to comedic
    SoundManager.startBackgroundMusic('medieval', 0.5);
    const timeout = setTimeout(() => {
      SoundManager.startBackgroundMusic('comedic', 0.5);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      SoundManager.stopBackgroundMusic();
    };
  }, []);

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        previousPuzzle={previousPuzzle}
      />

      <PuzzleStepper 
        currentPuzzle={5}
        totalPuzzles={8}
        onNavigate={onBack}
      />

      <div className="portal-container">
        <div className="background-wrapper">
          <PortalBackground className="portal-background" />
        </div>

        <div className="story-content">
          <div className="portal-frame">
            <div className="portal-inner">
              <h1 className="medieval-title">A Portal to Unlikely Memories</h1>
              
              <div className="story-text">
                <p>
                  My beloved wife-to-be, you've once again proven your ingenuity by completing the last challenge. 
                  Now, the castle beckons us onward through these winding corridors. But notice how the walls 
                  begin to shimmer with an unusual magic.
                </p>
                
                <p>
                  Stories say this passage can conjure visions of past escapades—memories that blend our 
                  medieval adventure with moments from our real-life travels. Suddenly, the corridor lights 
                  flicker, and the walls begin to resemble the mirrors and racks of a grand department store. 
                  Are we truly stepping into the past, or is this a playful illusion?
                </p>
                
                <p>
                  It seems we're on the threshold of a most unexpected memory: a changing room in a bustling 
                  London store, where laughter and surprise once reigned. Prepare yourself, my love, for the 
                  next challenge will transport us right back to that hilarious day…
                </p>
              </div>

              <button 
                className="medieval-button continue-button"
                onClick={onComplete}
                aria-label="Continue to next puzzle"
              >
                Step Through the Portal →
              </button>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator text="Scroll for more" />

      <style jsx>{`
        .portal-container {
          position: relative;
          max-width: 1000px;
          margin: 20px auto;
          min-height: 70vh;
          overflow: hidden;
        }

        .background-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .portal-background {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-content {
          position: relative;
          z-index: 2;
          padding: 20px;
        }

        .portal-frame {
          background: rgba(26, 26, 42, 0.8);
          border-radius: var(--radius-medium);
          padding: 3px;
          position: relative;
          overflow: hidden;
          animation: framePulse 3s infinite ease-in-out;
        }

        .portal-frame::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(153, 51, 255, 0.3),
            transparent,
            rgba(153, 51, 255, 0.3),
            transparent
          );
          animation: rotate 4s linear infinite;
        }

        .portal-inner {
          background: rgba(26, 26, 42, 0.95);
          border-radius: var(--radius-medium);
          padding: 30px;
          position: relative;
          z-index: 1;
        }

        .medieval-title {
          color: var(--color-gold);
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 30px;
          text-shadow: 0 0 10px rgba(153, 51, 255, 0.5);
          animation: titleGlow 2s infinite alternate;
        }

        .story-text {
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text);
          text-shadow: 0 0 5px rgba(153, 51, 255, 0.3);
        }

        .story-text p {
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .continue-button {
          display: block;
          margin: 40px auto 0;
          font-size: 1.2rem;
          padding: 15px 30px;
          background: linear-gradient(45deg, #9933ff, #6600cc);
          color: white;
          border: none;
          border-radius: var(--radius-medium);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: buttonPulse 2s infinite;
        }

        .continue-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(153, 51, 255, 0.5);
        }

        @keyframes framePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes titleGlow {
          from { text-shadow: 0 0 10px rgba(153, 51, 255, 0.3); }
          to { text-shadow: 0 0 20px rgba(153, 51, 255, 0.8); }
        }

        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(153, 51, 255, 0.5); }
          50% { box-shadow: 0 0 20px rgba(153, 51, 255, 0.8); }
        }

        @media (max-width: 768px) {
          .medieval-title {
            font-size: 2rem;
          }

          .story-text {
            font-size: 1.1rem;
          }

          .continue-button {
            font-size: 1.1rem;
            padding: 12px 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default UnlikelyMemoriesBuffer; 