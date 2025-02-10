import React, { useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import SoundManager from '../../utils/SoundManager';
import RoseCorridorScene from '../svg/RoseCorridorScene';
import PuzzleStepper from '../shared/PuzzleStepper';

const RoseCorridorStory = ({ onComplete, onBack, previousPuzzle }) => {
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

      <PuzzleStepper currentPuzzle={2} totalPuzzles={8} onNavigate={() => {}} />

      <div className="falling-roses">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`rose rose-${i}`}>🌹</div>
        ))}
      </div>

      <h1 className="medieval-title">Whispers of the Rose</h1>

      <div className="corridor-content">
        <RoseCorridorScene className="rose-scene" />
        
        <div className="story-scroll">
          <div className="scroll-content">
            <div className="heart-decoration">❦</div>
            <p className="story-text">
              As you walk through this corridor adorned with enchanted roses,
              each petal whispers tales of our love story. The air is sweet
              with memories of our first meeting, our shared dreams, and the
              countless moments that have made our journey magical.
            </p>
            <div className="heart-decoration">❦</div>
          </div>
        </div>

        <div className="button-container">
          <button 
            className="medieval-button continue-button"
            onClick={onComplete}
          >
            Continue Journey →
          </button>
        </div>
      </div>

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator />
      </div>

      <style jsx>{`
        .corridor-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: calc(100vh - 200px);
          padding: 20px;
          gap: 20px;
        }

        .rose-scene {
          width: 100%;
          max-width: 800px;
          height: auto;
          margin-bottom: 20px;
        }

        .story-scroll {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .scroll-content {
          background: linear-gradient(
            to bottom,
            rgba(34, 34, 59, 0.95),
            rgba(74, 78, 105, 0.95)
          );
          padding: 20px;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          text-align: center;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        }

        .story-text {
          font-size: 1.5rem;
          line-height: 1.6;
          color: var(--color-text);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          font-family: var(--font-text);
          margin: 0;
          letter-spacing: 0.5px;
        }

        .heart-decoration {
          color: var(--color-gold);
          font-size: 2rem;
          margin: 10px 0;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .button-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          position: relative;
          z-index: 2;
        }

        .continue-button {
          font-size: 1.2rem;
          padding: 12px 24px;
        }

        .scroll-indicator-wrapper {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
        }

        .falling-roses {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .rose {
          position: absolute;
          font-size: 1.5rem;
          opacity: 0.6;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        ${[...Array(12)].map((_, i) => `
          .rose-${i} {
            left: ${Math.random() * 100}vw;
            animation-duration: ${Math.random() * 10 + 10}s;
            animation-delay: -${Math.random() * 20}s;
          }
        `).join('')}

        @keyframes fall {
          0% {
            transform: translateY(-5vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .corridor-content {
            padding: 10px;
          }

          .story-scroll {
            max-width: 90%;
          }

          .story-text {
            font-size: 1.3rem;
          }

          .continue-button {
            font-size: 1rem;
            padding: 10px 20px;
          }

          .scroll-indicator-wrapper {
            bottom: 10px;
            right: 10px;
          }

          .rose {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RoseCorridorStory; 