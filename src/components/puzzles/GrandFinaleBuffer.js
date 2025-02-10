import React, { useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import SoundManager from '../../utils/SoundManager';
import PuzzleStepper from '../shared/PuzzleStepper';
import GrandRoseGateScene from '../svg/GrandRoseGateScene';

const GrandFinaleBuffer = ({ onComplete, onBack, previousPuzzle = 6 }) => {
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

      <h1 className="medieval-title">Toward the Grand Finale</h1>

      <div className="finale-buffer">
        <div className="background-scene">
          <GrandRoseGateScene className="gate-scene" />
        </div>

        <div className="buffer-content">
          <div className="story-scroll">
            <div className="scroll-content">
              <div className="heart-decoration">❦</div>
              <p className="story-text">
                My dearest wife, your laughter still echoes through these halls after recalling 
                our funniest memory. You've guided us through feasts, enchanted maps, knights, 
                and even the hidden Pink Birkin. Step by step, your wit and heart have unlocked 
                every secret this castle holds.
              </p>
              <p className="story-text">
                One final door stands before us—the Grand Rose Gate. Beyond it lies a Hall of 
                Memories, where all our cherished moments come together. Once you pass through, 
                you'll reach the end of this adventure… yet the beginning of another in our story.
              </p>
              <p className="story-text">
                Are you ready, my love, to see it all come full circle? Let us take the last 
                few steps hand in hand…
              </p>
              <div className="heart-decoration">❦</div>
            </div>
          </div>

          <button 
            className="medieval-button continue-button"
            onClick={onComplete}
            aria-label="Enter the Grand Rose Gate"
          >
            Enter the Grand Rose Gate →
          </button>
        </div>

        <div className="rose-petals">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`petal petal-${i + 1}`}>🌹</div>
          ))}
        </div>
      </div>

    

      <style jsx>{`
        .finale-buffer {
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

        .gate-scene {
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

        .rose-petals {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .petal {
          position: absolute;
          font-size: 1.2rem;
          opacity: 0.6;
          animation: float 10s ease-in-out infinite;
        }

        ${Array.from({ length: 12 }).map((_, i) => `
          .petal-${i + 1} {
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: -${Math.random() * 10}s;
            animation-duration: ${10 + Math.random() * 5}s;
          }
        `).join('\n')}

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, 20px) rotate(90deg);
          }
          50% {
            transform: translate(20px, 0) rotate(180deg);
          }
          75% {
            transform: translate(10px, -20px) rotate(270deg);
          }
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

          .petal {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GrandFinaleBuffer; 