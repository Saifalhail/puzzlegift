import React, { useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import SoundManager from '../../utils/SoundManager';
import PuzzleStepper from '../shared/PuzzleStepper';
import TwilightCorridorScene from '../svg/TwilightCorridorScene';
import { PAGES } from '../../App';

const TwilightPassage = ({ onComplete, onBack, previousPuzzle = PAGES.LADYS_TREASURE_VAULT }) => {
  useEffect(() => {
    // Start ambient sound
    SoundManager.startBackgroundMusic('harp');
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        previousPuzzle={previousPuzzle}
      />

      <PuzzleStepper 
        currentPuzzle={4}
        totalPuzzles={8}
        onNavigate={onBack}
      />

      <div className="twilight-passage">
        <div className="background-scene">
          <TwilightCorridorScene className="corridor-scene" />
        </div>

        <div className="passage-content">
          <h1 className="medieval-title">A Twilight Passage</h1>
          
          <div className="story-text">
            <p>
              My dearest wife-to-be, you have skillfully uncovered treasures beyond compare—your 
              cherished Pink Birkin among them. Now, under the soft light of dusk, let us 
              slip away from the vault and step into the quiet corridors once more. Ahead 
              lies an unexpected marvel: a workshop said to fuse modern dreams with ancient magic.
            </p>
            <p>
              The castle's whispers speak of a legendary carriage that defies time and 
              tradition. Shall we discover whether it's real—or just another castle legend? 
              Come, my love, let our footsteps guide us to the next mystery.
            </p>
          </div>

          <button 
            className="medieval-button continue-button"
            onClick={onComplete}
            aria-label="Continue to next puzzle"
          >
            Continue to Puzzle→
          </button>
        </div>

        <div className="twilight-fog">
          {/* Fog layers */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={`fog-layer fog-layer-${index + 1}`} />
          ))}
        </div>

        <div className="lanterns">
          {/* Lantern elements with flickering effect */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`lantern lantern-${index + 1}`}>
              <div className="flame" />
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for more" />
      </div>

      <style jsx>{`
        .twilight-passage {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          margin-top: 20px;
          padding: 20px;
          min-height: 80vh;
          border: 3px solid var(--color-gold);
          border-radius: var(--radius-medium);
          overflow: hidden;
        }

        .background-scene {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .corridor-scene {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .passage-content {
          position: relative;
          z-index: 2;
          padding: 20px;
          background: rgba(26, 26, 42, 0.7);
          backdrop-filter: blur(4px);
          border-radius: var(--radius-medium);
          margin: 20px;
        }

        .story-text {
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text);
          margin: 30px 0;
          text-align: justify;
          max-width: 600px;
          margin: 30px auto;
        }

        .story-text p {
          margin-bottom: 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .continue-button {
          display: block;
          margin: 40px auto;
          font-size: 1.2rem;
          padding: 15px 30px;
          background: var(--color-gold);
          color: var(--color-background);
          border: 2px solid var(--color-wood);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .continue-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
        }

        /* Twilight Fog Animation */
        .twilight-fog {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
          mix-blend-mode: screen;
        }

        .fog-layer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            rgba(147, 112, 219, 0.2) 4%,
            rgba(138, 43, 226, 0.2) 8%,
            rgba(221, 160, 221, 0.2) 12%,
            transparent 16%
          );
          animation: fogSlide 20s linear infinite;
          backdrop-filter: blur(4px);
        }

        /* Generate different speeds and positions for fog layers */
        ${Array.from({ length: 6 }).map((_, i) => `
          .fog-layer-${i + 1} {
            animation-duration: ${25 + i * 10}s;
            animation-delay: -${i * 4}s;
            top: ${i * 15}%;
            height: 35%;
            opacity: ${0.8 - i * 0.1};
            background: repeating-linear-gradient(
              90deg,
              transparent,
              rgba(147, 112, 219, ${0.3 - i * 0.03}) 4%,
              rgba(138, 43, 226, ${0.3 - i * 0.03}) 8%,
              rgba(221, 160, 221, ${0.25 - i * 0.03}) 12%,
              transparent 16%
            );
            transform: translateX(${i % 2 === 0 ? '0' : '-50%'});
            filter: blur(${3 + i}px);
          }
        `).join('\n')}

        @keyframes fogSlide {
          0% {
            transform: translateX(0%) translateY(0%);
          }
          50% {
            transform: translateX(25%) translateY(2%);
          }
          100% {
            transform: translateX(50%) translateY(0%);
          }
        }

        /* Add a subtle glow effect to the fog */
        .fog-layer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(147, 112, 219, 0.2),
            transparent 70%
          );
          mix-blend-mode: screen;
        }

        /* Lanterns */
        .lanterns {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
        }

        .lantern {
          position: absolute;
          width: 30px;
          height: 40px;
          background: rgba(255, 200, 100, 0.2);
          border-radius: 5px;
        }

        .flame {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: #ffd700;
          border-radius: 50%;
          animation: flicker 3s infinite;
        }

        /* Position lanterns */
        .lantern-1 { top: 20%; left: 10%; }
        .lantern-2 { top: 30%; right: 10%; }
        .lantern-3 { bottom: 30%; left: 15%; }
        .lantern-4 { bottom: 20%; right: 15%; }

        @keyframes flicker {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.9); }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 15px var(--color-torch); }
          50% { box-shadow: 0 0 25px var(--color-torch); }
          100% { box-shadow: 0 0 15px var(--color-torch); }
        }

        .scroll-indicator-wrapper {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
        }

        @media (max-width: 768px) {
          .story-text {
            font-size: 1.1rem;
            padding: 0 15px;
          }

          .continue-button {
            font-size: 1.1rem;
            padding: 12px 24px;
          }
        }

        @media (max-width: 480px) {
          .story-text {
            font-size: 1rem;
            padding: 0 10px;
          }

          .continue-button {
            font-size: 1rem;
            padding: 10px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default TwilightPassage; 