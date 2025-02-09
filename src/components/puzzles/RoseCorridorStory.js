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

      <PuzzleStepper 
        currentPuzzle={2}
        totalPuzzles={10}
        onNavigate={onBack}
      />

      <div className="rose-corridor">
        <div className="background-scene">
          <RoseCorridorScene className="corridor-scene" />
        </div>

        <div className="corridor-content">
          <h1 className="medieval-title">Whispers of the Rose Corridor</h1>
          
          <div className="story-text">
            <p>
              My dearest wife-to-be, you have once again showcased your cleverness by uncovering 
              the hidden letters of our first trip—London. As we leave the Grand Study behind, 
              follow me down this quiet corridor. Notice the scent of roses in the air and 
              the gentle glow of lanterns guiding our steps.
            </p>
            <p>
              Beyond these arches lies the Hall of Knights, where steadfast guardians of 
              the realm keep their vigil. Prepare yourself for a challenge that will test 
              your wits and honor—a puzzle that calls upon courage, precision, and a keen mind.
            </p>
            <p>
              Let our footsteps echo through these ancient halls as we continue this journey 
              of memories, love, and curiosity. Forward we go, my love, into the unknown 
              mysteries that await us.
            </p>
          </div>

          <button 
            className="medieval-button continue-button"
            onClick={onComplete}
            aria-label="Continue to next puzzle"
          >
            Continue to the Hall of Knights →
          </button>
        </div>

        <div className="rose-petals">
          {/* Rose petals animation elements */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={`petal petal-${index + 1}`} />
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
        .content-wrapper {
          position: relative;
          padding-top: 120px;
          width: 100%;
        }

        .rose-corridor {
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

        .corridor-content {
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

        /* Rose petals animation */
        .rose-petals {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
        }

        .petal {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle at 30% 30%, #ff6b6b, #ff1f1f);
          border-radius: 50% 0 50% 50%;
          opacity: 0;
          animation: fall 10s linear infinite;
        }

        /* Generate different positions and delays for petals */
        ${Array.from({ length: 12 }).map((_, i) => `
          .petal-${i + 1} {
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
          }
        `).join('\n')}

        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Lanterns */
        .lanterns {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
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
          .content-wrapper {
            padding-top: 100px;
          }

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
          .content-wrapper {
            padding-top: 90px;
          }

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

export default RoseCorridorStory; 