import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import Sparkles from '../shared/Sparkles';
import SoundManager from '../../utils/SoundManager';
import MagicalMapBackground from '../svg/MagicalMapBackground';
import FlippableTile from '../svg/FlippableTile';
import RiddleMessage from '../shared/RiddleMessage';
import ScrollIndicator from '../shared/ScrollIndicator';
import LondonMap from '../svg/LondonMap';

// Define the letter tiles for "LONDON" plus additional decoy tiles
const INITIAL_TILES = [
  // Core "LONDON" tiles
  { id: 'L1', letter: 'L', position: { x: 30, y: 40 } },
  { id: 'O1', letter: 'O', position: { x: 70, y: 35 } },
  { id: 'N1', letter: 'N', position: { x: 45, y: 60 } },
  { id: 'D1', letter: 'D', position: { x: 25, y: 55 } },
  { id: 'O2', letter: 'O', position: { x: 65, y: 65 } },
  { id: 'N2', letter: 'N', position: { x: 80, y: 45 } },
  // Decoy tiles (18 tiles to make total of 24)
  { id: 'P1', letter: 'P', position: { x: 35, y: 50 } },
  { id: 'A1', letter: 'A', position: { x: 75, y: 40 } },
  { id: 'R1', letter: 'R', position: { x: 40, y: 65 } },
  { id: 'I1', letter: 'I', position: { x: 20, y: 45 } },
  { id: 'S1', letter: 'S', position: { x: 60, y: 55 } },
  { id: 'B1', letter: 'B', position: { x: 85, y: 50 } },
  { id: 'M1', letter: 'M', position: { x: 50, y: 70 } },
  { id: 'E1', letter: 'E', position: { x: 30, y: 75 } },
  { id: 'T1', letter: 'T', position: { x: 70, y: 25 } },
  { id: 'H1', letter: 'H', position: { x: 40, y: 30 } },
  { id: 'C1', letter: 'C', position: { x: 55, y: 45 } },
  { id: 'K1', letter: 'K', position: { x: 65, y: 35 } },
  { id: 'W1', letter: 'W', position: { x: 45, y: 55 } },
  { id: 'Y1', letter: 'Y', position: { x: 35, y: 65 } },
  { id: 'F1', letter: 'F', position: { x: 25, y: 60 } },
  { id: 'G1', letter: 'G', position: { x: 75, y: 45 } },
  { id: 'U1', letter: 'U', position: { x: 55, y: 35 } },
  { id: 'X1', letter: 'X', position: { x: 45, y: 70 } }
].sort(() => Math.random() - 0.5); // Shuffle the tiles

const TARGET_WORD = 'LONDON';

const EnchantedMapPuzzle = ({ onComplete, onBack, previousPuzzle, isComplete: initialIsComplete = false }) => {
  const [tiles, setTiles] = useState(INITIAL_TILES);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');
  const [nextExpectedLetter, setNextExpectedLetter] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const puzzleHint = "Remember our first grand adventure? The city of red buses and Big Ben awaits in these magical tiles! Find the letters in order";

  useEffect(() => {
    SoundManager.startBackgroundMusic();
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setFlippedTiles(INITIAL_TILES.filter(tile => TARGET_WORD.includes(tile.letter)).map(tile => tile.id));
      setIsComplete(true);
      setShowSuccess(true);
      setNextExpectedLetter(TARGET_WORD.length);
    }
  }, [initialIsComplete]);

  const handleTileClick = async (tileId) => {
    if (isComplete || isProcessing) return;
    
    const tile = tiles.find(t => t.id === tileId);
    if (!tile || flippedTiles.includes(tileId)) return;

    setIsProcessing(true);
    SoundManager.play('click');
    
    // Temporarily flip the tile
    setFlippedTiles(prev => [...prev, tileId]);
    
    // Check if this is the next expected letter in "LONDON"
    if (tile.letter === TARGET_WORD[nextExpectedLetter]) {
      setNextExpectedLetter(prev => prev + 1);
      setErrorMessage('');

      // Check if puzzle is complete
      if (nextExpectedLetter === TARGET_WORD.length - 1) {
        setShowSparkles(true);
        SoundManager.play('success');
        setTimeout(() => {
          setShowSuccess(true);
          setIsComplete(true);
        }, 1000);
      } else {
        // Keep the correct tile flipped, but reset processing after a delay
        setTimeout(() => {
          setIsProcessing(false);
        }, 500);
      }
    } else {
      SoundManager.play('error');
      setErrorMessage('That\'s not the next letter in our special city. Try another tile!');
      
      // Reset the flipped tile after a brief delay
      setTimeout(() => {
        setFlippedTiles(prev => prev.filter(id => id !== tileId));
        setIsProcessing(false);
        setTimeout(() => setErrorMessage(''), 1500);
      }, 1000);
    }
  };

  const handleContinue = () => {
    onComplete && onComplete();
  };

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        hint={puzzleHint}
        previousPuzzle={previousPuzzle}
      />

      <h1 className="medieval-title">The Enchanted Map</h1>

      <div className="map-container">
        <div className="map-area">
          <MagicalMapBackground className="map-background" />
          
          {/* Show either the puzzle or the London map based on completion status */}
          {!isComplete ? (
            <>
              {/* Word progress display */}
              <div className="word-progress">
                {TARGET_WORD.split('').map((letter, index) => (
                  <div 
                    key={index} 
                    className={`progress-slot ${index < nextExpectedLetter ? 'revealed' : ''}`}
                  >
                    {index < nextExpectedLetter ? letter : '_'}
                  </div>
                ))}
              </div>

              {/* Tiles grid */}
              <div className="tiles-grid">
                {tiles.map(tile => (
                  <FlippableTile
                    key={tile.id}
                    letter={tile.letter}
                    isFlipped={flippedTiles.includes(tile.id)}
                    isLocked={isComplete || isProcessing}
                    onClick={() => handleTileClick(tile.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <LondonMap className="london-map" />
              <div className="completed-word">
                {TARGET_WORD.split('').map((letter, index) => (
                  <div key={index} className="progress-slot revealed">
                    {letter}
                  </div>
                ))}
              </div>
            </>
          )}

          <Sparkles active={showSparkles} />
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {showSuccess && (
          <div className="success-message">
            <p className="success-text">
              Excellent Work! You've uncovered the place of our first big trip—London!
              The magical tiles have revealed our cherished memory.
            </p>
            <button 
              className="medieval-button continue-button" 
              onClick={handleContinue}
              aria-label="Continue to next puzzle"
            >
              Continue Journey →
            </button>
          </div>
        )}
      </div>

      {!isComplete && (
        <div className="instructions-section">
          <RiddleMessage 
            riddle={`
              On this enchanted map lies a memory,
              Of our first journey, across the sea.
              A city of royalty, bridges, and more,
              Where red buses pass by Big Ben's door.
              Flip the tiles in sequence with care,
              To reveal the city of our first affair!
            `}
            instructions={[
              "1. Each tile hides a letter - some are decoys!",
              "2. Tap a tile to reveal its letter",
              "3. Find the letters in the correct order",
              "4. Wrong letters will flip back down",
              "5. Only one tile can be flipped at a time"
            ]}
          />
        </div>
      )}

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for instructions" />
      </div>

      <style jsx>{`
        .map-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .map-area {
          position: relative;
          width: 100%;
          padding-bottom: 140%;  /* Reduced from 180% to 140% */
          background: var(--color-background);
          border: 3px solid var(--color-gold);
          border-radius: var(--radius-medium);
          box-shadow: var(--shadow-hard);
          overflow: hidden;
        }

        .map-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          object-fit: cover;  /* Ensure background covers the entire area */
        }

        .word-progress {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          padding: 15px 25px;
          background: rgba(74, 78, 105, 0.9);
          border-radius: var(--radius-medium);
          box-shadow: var(--shadow-medium);
          z-index: 3;  /* Increased to ensure it's above the tiles */
        }

        .progress-slot {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-small);
          font-family: var(--font-medieval);
          font-size: 1.8rem;
          color: var(--color-gold);
          transition: all 0.3s ease;
        }

        .progress-slot.revealed {
          background: var(--color-gold);
          color: var(--color-background);
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }

        .tiles-grid {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(6, 1fr);  /* Changed from 8 to 6 rows */
          gap: 15px;
          padding: 30px;
          border-radius: var(--radius-medium);
          width: 90%;
          max-width: 500px;
          height: 70%;  /* Reduced from 80% to 70% */
          z-index: 2;
        }

        .success-message {
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(
            45deg,
            var(--color-gold),
            #ffd700,
            #ffed4a
          );
          padding: 30px;
          border-radius: var(--radius-medium);
          text-align: center;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          border: 3px solid var(--color-wood);
          max-width: 90%;
          width: 400px;
          z-index: 100;
        }

        .success-message .success-text {
          font-size: 1.4rem;
          line-height: 1.4;
          color: var(--color-background);
          font-family: var(--font-medieval);
          margin-bottom: 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .success-message .continue-button {
          font-size: 1.2rem;
          padding: 12px 24px;
          background: var(--color-background);
          color: var(--color-gold);
          border: 2px solid var(--color-wood);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .success-message .continue-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(139, 69, 19, 0.4);
        }

        .error-message {
          position: absolute;
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
          z-index: 10;
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
        }

        @media (max-width: 768px) {
          .map-area {
            padding-bottom: 160%;  /* Reduced from 200% */
          }

          .tiles-grid {
            gap: 12px;
            padding: 25px;
            height: 75%;  /* Reduced from 85% */
            width: 95%;
          }
        }

        @media (max-width: 480px) {
          .map-area {
            padding-bottom: 180%;  /* Reduced from 220% */
          }

          .tiles-grid {
            top: 15%;
            gap: 10px;
            padding: 20px;
            width: 95%;
            height: 75%;  /* Reduced from 85% */
          }
        }

        .london-map {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: auto;
          z-index: 2;
          animation: fadeIn 1s ease-out;
        }

        .completed-word {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          padding: 15px 25px;
          background: rgba(74, 78, 105, 0.9);
          border-radius: var(--radius-medium);
          box-shadow: var(--shadow-medium);
          z-index: 3;
        }
      `}</style>
    </div>
  );
};

export default EnchantedMapPuzzle; 