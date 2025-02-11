import React, { useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import SoundManager from '../../utils/SoundManager';
import PuzzleStepper from '../shared/PuzzleStepper';
import CourtyardScene from '../svg/CourtyardScene';

const GrandFinaleBuffer = ({ onComplete, onBack, previousPuzzle = 7 }) => {
  useEffect(() => {
    // Start with orchestral music
    SoundManager.startBackgroundMusic('harp', 0.5);
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        previousPuzzle={previousPuzzle}
      />

      <PuzzleStepper 
        currentPuzzle={7}
        totalPuzzles={8}
        onNavigate={onBack}
      />

      <h1 className="medieval-title">A Summons to the Royal Court</h1>

      <div className="courtyard-buffer">
        <div className="background-scene">
          <CourtyardScene className="courtyard-scene" />
        </div>

        <div className="buffer-content">
          <div className="story-scroll">
            <div className="scroll-content">
              <div className="heart-decoration">❦</div>
              <p className="story-text">
                My beloved wife-to-be, you have conquered every trial this enchanted castle set before you: 
                unlocking gates, indulging feasts, mapping out memories, guiding knights, uncovering 
                hidden treasures, crafting dream carriages, and even recreating hilarious changing-room moments.
              </p>
              <p className="story-text">
                Now, a royal herald calls from the courtyard. The King himself has summoned us to the 
                Great Hall for a final audience—a test of wit and remembrance to prove our worth.
              </p>
              <p className="story-text">
                Step through these grand doors and stand before the High Court. Let this be our last 
                chapter in this castle's story—where your clever mind shall shine one final time!
              </p>
              <div className="heart-decoration">❦</div>
            </div>
          </div>

          <button 
            className="medieval-button continue-button"
            onClick={onComplete}
            aria-label="Enter the Great Hall"
          >
            Enter the Great Hall →
          </button>
        </div>

        <div className="torches">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`torch torch-${i + 1}`}>
              <div className="flame">🔥</div>
            </div>
          ))}
        </div>

        <div className="banners">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`banner banner-${i + 1}`}>⚜️</div>
          ))}
        </div>
      </div>

      <ScrollIndicator />

      <style jsx>{`
        .courtyard-buffer {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          border: 3px solid var(--color-gold);
          border-radius: var(--radius-medium);
          min-height: 60vh;
          background: rgba(26, 26, 42, 0.7);
          overflow: hidden;
        }

        .background-scene {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.15;
          transition: opacity 0.5s ease;
        }

        .courtyard-scene {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .buffer-content {
          position: relative;
          z-index: 2;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .story-scroll {
          background: rgba(244, 228, 188, 0.1);
          backdrop-filter: blur(4px);
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          margin: 20px 0;
          padding: 30px;
        }

        .scroll-content {
          text-align: center;
        }

        .story-text {
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: 1.5rem;
          text-align: justify;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .heart-decoration {
          color: var(--color-gold);
          font-size: 2rem;
          margin: 20px 0;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
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

        .torches {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .torch {
          position: absolute;
          font-size: 2rem;
          animation: flicker 2s infinite;
        }

        .torch-1 { top: 10%; left: 5%; }
        .torch-2 { top: 10%; right: 5%; }
        .torch-3 { bottom: 10%; left: 5%; }
        .torch-4 { bottom: 10%; right: 5%; }

        .banners {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .banner {
          position: absolute;
          font-size: 3rem;
          animation: wave 6s ease-in-out infinite;
        }

        .banner-1 { top: 15%; left: 50%; transform: translateX(-50%); }
        .banner-2 { top: 25%; left: 20%; }
        .banner-3 { top: 25%; right: 20%; }

        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 15px var(--color-torch); }
          50% { box-shadow: 0 0 25px var(--color-torch); }
          100% { box-shadow: 0 0 15px var(--color-torch); }
        }

        @media (max-width: 768px) {
          .story-text {
            font-size: 1.1rem;
          }

          .continue-button {
            font-size: 1.1rem;
            padding: 12px 24px;
          }

          .torch {
            font-size: 1.5rem;
          }

          .banner {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default GrandFinaleBuffer; 