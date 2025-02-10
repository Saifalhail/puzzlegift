import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import RiddleMessage from '../shared/RiddleMessage';
import SoundManager from '../../utils/SoundManager';
import Sparkles from '../shared/Sparkles';
import PuzzleStepper from '../shared/PuzzleStepper';
import HallBackground from '../svg/HallBackground';

const MEMORIES = [
  { id: 'london', title: 'London First Trip', icon: '🇬🇧' },
  { id: 'mario', title: 'Mario Movie Date', icon: '🎬' },
  { id: 'range_rover', title: 'First Kiss', icon: '🚙' },
  { id: 'food', title: 'Favorite Foods', icon: '🍔' },
  { id: 'drink', title: 'Virgin Marie', icon: '🍹' },
  { id: 'bentley', title: 'Pink Bentley', icon: '🚗' },
  { id: 'birkin', title: 'Pink Birkin', icon: '👜' },
  { id: 'selfridges', title: 'Selfridges Quotes', icon: '🗣️' },
  { id: 'spirited', title: 'Spirited Away', icon: '🎭' }
];

const HallOfMemories = ({ onComplete, onBack, previousPuzzle = 7, isComplete: initialIsComplete = false }) => {
  const [activatedWindows, setActivatedWindows] = useState(new Set());
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    SoundManager.startBackgroundMusic('finale');
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setActivatedWindows(new Set(MEMORIES.map(m => m.id)));
      setShowSuccess(true);
      setShowSparkles(true);
      setIsComplete(true);
    }
  }, [initialIsComplete]);

  const handleWindowClick = (memoryId) => {
    if (isComplete) return;

    const currentIndex = Array.from(activatedWindows).length;
    const correctMemory = MEMORIES[currentIndex];

    if (memoryId === correctMemory.id) {
      const newActivated = new Set(activatedWindows);
      newActivated.add(memoryId);
      setActivatedWindows(newActivated);
      SoundManager.play('chime');

      if (newActivated.size === MEMORIES.length) {
        handleSuccess();
      }
    } else {
      setErrorMessage('Our timeline is off. Reflect on which memory came first!');
      setTimeout(() => setErrorMessage(''), 3000);
      SoundManager.play('error');
    }
  };

  const handleSuccess = () => {
    setShowSparkles(true);
    setShowSuccess(true);
    setIsComplete(true);
    SoundManager.play('success');
  };

  const puzzleHint = "Remember our journey: From our first trip to London, to our movie date, our first kiss, our favorite meals together, and all the special moments that followed. Light them in order of when they happened!";

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        hint={puzzleHint}
        previousPuzzle={previousPuzzle}
      />

      <PuzzleStepper 
        currentPuzzle={8}
        totalPuzzles={8}
        onNavigate={onBack}
      />

      <h1 className="medieval-title">The Hall of Final Memories</h1>

      <div className="hall-container">
        <div className="background-wrapper">
          <HallBackground className="hall-background" />
        </div>

        <div className="windows-grid">
          {MEMORIES.map((memory) => (
            <div 
              key={memory.id}
              className={`memory-window ${activatedWindows.has(memory.id) ? 'activated' : ''}`}
              onClick={() => handleWindowClick(memory.id)}
            >
              <div className="window-content">
                <div className="memory-icon">{memory.icon}</div>
                <h3 className="memory-title">{memory.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {showSuccess && (
          <div className="success-container">
            <div className="success-content">
              <h2 className="success-title">All Our Memories Shine as One!</h2>
              <p className="success-message">
                Congratulations, My Love! We've relived our story from first kiss to 
                funniest mishap, from dream car to dream bag, from feasts to future 
                adventures. Thank you for sharing this journey with me. May our 
                memories—and new ones yet to come—forever brighten our days.
              </p>
              <button 
                className="medieval-button finish-button"
                onClick={onComplete}
                aria-label="Finish the adventure"
              >
                Complete Our Journey ✨
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </div>

      {!isComplete && (
        <div className="instructions-section">
          <RiddleMessage 
            riddle={`
              In these windows of stained glass bright,
              Our memories dance in magical light.
              From London's streets to Marina's show,
              Touch each moment in order they flow.
              First meetings, first kisses, dreams come true,
              Light them in sequence, just as they grew.
              From favorite meals to treasured things,
              To funny moments that made laughter ring.
              In proper order, touch each scene,
              To make our whole story gleam!
            `}
            instructions={[
              "1. Each window represents a special memory we share",
              "2. Tap the windows in the order these memories occurred",
              "3. The windows will light up when activated in the correct sequence",
              "4. Wrong order will reset the sequence - try again!",
              "5. Complete the sequence to reveal our final message"
            ]}
          />
        </div>
      )}

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for instructions" />
      </div>

      <style jsx>{`
        .hall-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          border: 3px solid var(--color-gold);
          border-radius: var(--radius-medium);
          min-height: 60vh;
          background: rgba(26, 26, 42, 0.7);
          overflow: hidden;
        }

        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.15;
          transition: opacity 0.5s ease;
        }

        .windows-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
          position: relative;
          z-index: 2;
        }

        .memory-window {
          aspect-ratio: 1;
          background: rgba(74, 78, 105, 0.9);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-medium);
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }

        .memory-window:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }

        .memory-window.activated {
          background: linear-gradient(45deg, #ffd700, #ffa500);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }

        .window-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
          padding: 20px;
        }

        .memory-icon {
          font-size: 3rem;
          margin-bottom: 10px;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        }

        .memory-title {
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          color: var(--color-text);
          margin: 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .success-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 600px;
          z-index: 1000;
          padding: 20px;
        }

        .success-content {
          background: linear-gradient(45deg, var(--color-gold), #ffd700, #ffed4a);
          padding: 30px;
          border-radius: var(--radius-medium);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          text-align: center;
        }

        .success-title {
          font-family: var(--font-medieval);
          font-size: 2rem;
          color: var(--color-background);
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .success-message {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-background);
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          font-family: var(--font-medieval);
        }

        .finish-button {
          font-size: 1.2rem;
          padding: 15px 30px;
          background: var(--color-background);
          color: var(--color-gold);
          border: 2px solid var(--color-wood);
          animation: pulse 2s infinite;
        }

        .error-message {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 69, 0, 0.2);
          color: var(--color-torch);
          padding: 8px 16px;
          border-radius: var(--radius-medium);
          text-align: center;
          font-family: var(--font-medieval);
          font-size: 1.1rem;
          border: 1px solid var(--color-torch);
          animation: fadeIn 0.3s ease-out;
          z-index: 1000;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
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
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .windows-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            padding: 15px;
          }

          .memory-icon {
            font-size: 2.5rem;
          }

          .memory-title {
            font-size: 1rem;
          }

          .success-title {
            font-size: 1.8rem;
          }

          .success-message {
            font-size: 1.1rem;
          }

          .finish-button {
            font-size: 1.1rem;
            padding: 12px 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default HallOfMemories; 