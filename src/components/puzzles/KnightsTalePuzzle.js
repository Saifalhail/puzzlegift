import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import RiddleMessage from '../shared/RiddleMessage';
import SoundManager from '../../utils/SoundManager';
import Sparkles from '../shared/Sparkles';
import KnightPortrait from '../svg/KnightPortraits';
import PuzzleStepper from '../shared/PuzzleStepper';

// Define the puzzle options
const COLORS = ['Red', 'Blue', 'Green', 'Yellow'];
const WEAPONS = ['Sword', 'Axe', 'Lance', 'Mace'];
const BANNERS = ['Lion', 'Eagle', 'Stag', 'Boar'];

// Define the correct solution
const SOLUTION = [
  { color: 'Red', weapon: 'Lance', banner: 'Stag' },    // Sir Gawain
  { color: 'Yellow', weapon: 'Axe', banner: 'Lion' },   // Next to Red Knight
  { color: 'Blue', weapon: 'Sword', banner: 'Boar' },   // Blue Knight with Sword
  { color: 'Green', weapon: 'Mace', banner: 'Eagle' }   // Eagle not next to Yellow
];

// Add Lock SVG component
const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="lock-icon">
    <path
      d="M12,17 C13.1045695,17 14,16.1045695 14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 Z"
      fill="currentColor"
    />
    <path
      d="M18,8 L17,8 L17,6 C17,3.23857625 14.7614237,1 12,1 C9.23857625,1 7,3.23857625 7,6 L7,8 L6,8 C4.8954305,8 4,8.8954305 4,10 L4,20 C4,21.1045695 4.8954305,22 6,22 L18,22 C19.1045695,22 20,21.1045695 20,20 L20,10 C20,8.8954305 19.1045695,8 18,8 Z M9,6 C9,4.34314575 10.3431458,3 12,3 C13.6568542,3 15,4.34314575 15,6 L15,8 L9,8 L9,6 Z"
      fill="currentColor"
    />
  </svg>
);

const KnightsTalePuzzle = ({ onComplete, onBack, previousPuzzle, isComplete: initialIsComplete = false }) => {
  const [knights, setKnights] = useState(Array(4).fill().map(() => ({
    color: COLORS[0],
    weapon: WEAPONS[0],
    banner: BANNERS[0]
  })));
  
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(true);

  useEffect(() => {
    SoundManager.startBackgroundMusic('medieval');
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setKnights(SOLUTION);
      setIsComplete(true);
      setShowSuccess(true);
    }
  }, [initialIsComplete]);

  const handleAttributeClick = (knightIndex, attribute) => {
    if (isComplete) return;

    const newKnights = [...knights];
    const currentValue = newKnights[knightIndex][attribute];
    const options = attribute === 'color' ? COLORS :
                   attribute === 'weapon' ? WEAPONS :
                   BANNERS;
    
    const currentIndex = options.indexOf(currentValue);
    const nextIndex = (currentIndex + 1) % options.length;
    newKnights[knightIndex][attribute] = options[nextIndex];
    
    setKnights(newKnights);
  };

  const checkSolution = (currentKnights) => {
    const isCorrect = currentKnights.every((knight, index) => 
      knight.color === SOLUTION[index].color &&
      knight.weapon === SOLUTION[index].weapon &&
      knight.banner === SOLUTION[index].banner
    );

    if (isCorrect) {
      SoundManager.play('success');
      setShowSparkles(true);
      setTimeout(() => {
        setShowSuccess(true);
        setIsComplete(true);
      }, 1000);
    } else {
      setErrorMessage('Some knights are mismatched—keep trying!');
      setTimeout(() => setErrorMessage(''), 2000);
    }
  };

  const handleContinue = () => {
    onComplete && onComplete();
  };

  const puzzleHint = "Remember: Knight 1 is Sir Gawain with his Lance and Stag banner, Knight 2 wields an Axe under the Lion banner and stands beside the Red Knight, Knight 3 is the Blue Knight with a Sword, and Knight 4 with the Eagle banner must not be next to the Yellow Knight!";

  // Add confirm handler
  const handleConfirm = () => {
    checkSolution(knights);
  };

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        hint={puzzleHint}
        previousPuzzle={previousPuzzle}
      />

      <PuzzleStepper 
        currentPuzzle={3}
        totalPuzzles={10}
        onNavigate={onBack}
      />

      <h1 className="medieval-title">A Knight's Tale</h1>

      <div className="knights-hall">
        <div className="knights-row">
          {knights.map((knight, index) => (
            <div key={index} className="knight-container">
              <div className={`knight ${isComplete ? 'complete' : ''}`}>
                <KnightPortrait 
                  color={knight.color}
                  weapon={knight.weapon}
                  banner={knight.banner}
                  isComplete={isComplete}
                  number={index + 1}
                />
                <div 
                  className={`attribute color ${knight.color.toLowerCase()}`}
                  onClick={() => handleAttributeClick(index, 'color')}
                >
                  {knight.color}
                </div>
                <div 
                  className="attribute weapon"
                  onClick={() => handleAttributeClick(index, 'weapon')}
                >
                  {knight.weapon}
                </div>
                <div 
                  className="attribute banner"
                  onClick={() => handleAttributeClick(index, 'banner')}
                >
                  {knight.banner}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isComplete && showConfirmButton && (
          <button 
            className="confirm-button medieval-button"
            onClick={handleConfirm}
            aria-label="Confirm knight positions"
          >
            <LockIcon />
            <span>Confirm Positions</span>
          </button>
        )}

        <Sparkles active={showSparkles} />

        {showSuccess && (
          <div className="success-message">
            <p className="success-text">
              Bravo! You've equipped the knights perfectly. 
              Their colors shine true, their weapons gleam bright, 
              and their banners wave proudly in the castle breeze!
            </p>
            <button 
              className="medieval-button continue-button" 
              onClick={handleContinue}
              aria-label="Continue to next puzzle"
            >
              Continue to the Lady's Treasure Vault →
            </button>
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
              First stands Sir Gawain in crimson red,
              With Lance in hand and Stag overhead.
              Second comes Yellow with Axe held high,
              The Lion banner beside Red does lie.
              Third, the Blue Knight with Sword so bright,
              And fourth with Eagle takes final height.
              But heed this warning clear and true:
              Eagle and Yellow must bid adieu!
            `}
            instructions={[
              "1. Each knight is numbered (1-4) for your guidance",
              "2. Tap each attribute (Color, Weapon, Banner) to cycle through options",
              "3. Match each knight with their correct combination",
              "4. Use the clues in the riddle to solve the puzzle",
              "5. The order of the knights matters - pay attention to their numbers!"
            ]}
          />
        </div>
      )}

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for instructions" />
      </div>

      <style jsx>{`
        .knights-hall {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          background: linear-gradient(
            to bottom,
            var(--color-background-dark),
            var(--color-background)
          );
          border: 3px solid var(--color-gold);
          border-radius: var(--radius-medium);
          min-height: 60vh;
        }

        .knights-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin: 20px 0;
        }

        .knight-container {
          flex: 1;
          min-width: 200px;
          max-width: 250px;
          margin: 10px;
        }

        .knight {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 20px;
          background: rgba(74, 78, 105, 0.9);
          border-radius: var(--radius-medium);
          box-shadow: var(--shadow-medium);
          transition: all 0.3s ease;
        }

        .knight.complete {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }

        .attribute {
          padding: 12px;
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-small);
          text-align: center;
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          color: var(--color-text);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .attribute:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }

        .color {
          font-weight: bold;
        }

        .color.red { color: #cc0000; }
        .color.blue { color: #0044cc; }
        .color.green { color: #006600; }
        .color.yellow { color: #cccc00; }

        .success-message {
          position: absolute;
          top: 50%;
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

        .success-text {
          font-size: 1.4rem;
          line-height: 1.4;
          color: var(--color-background);
          font-family: var(--font-medieval);
          margin-bottom: 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .continue-button {
          font-size: 1.2rem;
          padding: 12px 24px;
          background: var(--color-background);
          color: var(--color-gold);
          border: 2px solid var(--color-wood);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .continue-button:hover {
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

        .confirm-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 30px auto;
          padding: 15px 30px;
          font-size: 1.2rem;
          background: linear-gradient(45deg, #8B4513, #A0522D);
          color: var(--color-gold);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-medium);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .confirm-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          background: linear-gradient(45deg, #A0522D, #8B4513);
        }

        .confirm-button:active {
          transform: translateY(1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .lock-icon {
          color: var(--color-gold);
          transition: all 0.3s ease;
        }

        .confirm-button:hover .lock-icon {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .knight-container {
            min-width: 150px;
          }

          .attribute {
            font-size: 1.1rem;
            padding: 10px;
          }

          .success-text {
            font-size: 1.2rem;
          }

          .continue-button {
            font-size: 1.1rem;
            padding: 10px 20px;
          }

          .confirm-button {
            padding: 12px 24px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .knight-container {
            min-width: 120px;
          }

          .attribute {
            font-size: 1rem;
            padding: 8px;
          }

          .success-text {
            font-size: 1.1rem;
          }

          .continue-button {
            font-size: 1rem;
            padding: 8px 16px;
          }

          .confirm-button {
            padding: 10px 20px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default KnightsTalePuzzle; 