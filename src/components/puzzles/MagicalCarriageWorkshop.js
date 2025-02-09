import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import RiddleMessage from '../shared/RiddleMessage';
import SoundManager from '../../utils/SoundManager';
import Sparkles from '../shared/Sparkles';
import PuzzleStepper from '../shared/PuzzleStepper';
import WorkshopBackground from '../svg/WorkshopBackground';
import CarriagePreview from '../svg/CarriagePreview';

const CARRIAGE_OPTIONS = {
  wheels: ['wooden', 'modern'],
  color: ['silver', 'black', 'pink', 'gold'],
  ornament: ['dragon', 'horse', 'bentley']
};

const CORRECT_COMBINATION = {
  wheels: 'modern',
  color: 'pink',
  ornament: 'bentley'
};

const MagicalCarriageWorkshop = ({ onComplete, onBack, previousPuzzle, isComplete: initialIsComplete = false }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    wheels: CARRIAGE_OPTIONS.wheels[0],
    color: CARRIAGE_OPTIONS.color[0],
    ornament: CARRIAGE_OPTIONS.ornament[0]
  });
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  const puzzleHint = "Think about your dream car - a modern luxury vehicle with a distinctive 'B' emblem. The color should match your favorite!";

  useEffect(() => {
    SoundManager.startBackgroundMusic('workshop');
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setSelectedOptions(CORRECT_COMBINATION);
      setShowSuccess(true);
      setShowSparkles(true);
      setIsComplete(true);
    }
  }, [initialIsComplete]);

  const handleOptionChange = (type, value) => {
    const newOptions = { ...selectedOptions, [type]: value };
    setSelectedOptions(newOptions);
    setErrorMessage('');

    // Check if the combination is correct
    if (Object.entries(newOptions).every(([key, value]) => value === CORRECT_COMBINATION[key])) {
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    setShowSparkles(true);
    setShowSuccess(true);
    setIsComplete(true);
    SoundManager.play('success');
    onComplete && onComplete();
  };

  const handleContinue = () => {
    onComplete && onComplete();
  };

  const cycleOption = (type) => {
    const options = CARRIAGE_OPTIONS[type];
    const currentIndex = options.indexOf(selectedOptions[type]);
    const nextIndex = (currentIndex + 1) % options.length;
    handleOptionChange(type, options[nextIndex]);
  };

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        hint={puzzleHint}
        previousPuzzle={previousPuzzle}
      />

      <PuzzleStepper 
        currentPuzzle={6}
        totalPuzzles={10}
        onNavigate={onBack}
      />

      <h1 className="medieval-title">The Magical Carriage Workshop</h1>

      <div className="workshop-container">
        <div className="background-wrapper">
          <WorkshopBackground className="workshop-background" />
        </div>

        {showSuccess ? (
          <div className="success-container">
            <Sparkles active={showSparkles} />
            <div className="success-content">
              <h2 className="success-title">Amazing!</h2>
              <p className="success-message">
                You've crafted the perfect Pink Bentley—your dream car in all its glory.
              </p>
              <button 
                className="medieval-button continue-button"
                onClick={handleContinue}
                aria-label="Continue to next puzzle"
              >
                Continue Our Adventure →
              </button>
            </div>
          </div>
        ) : (
          <div className="carriage-customizer">
            <div className="options-container">
              <div className="option-group">
                <h3>Wheels</h3>
                <button onClick={() => cycleOption('wheels')}>
                  {selectedOptions.wheels}
                </button>
              </div>
              <div className="option-group">
                <h3>Color</h3>
                <button onClick={() => cycleOption('color')}>
                  {selectedOptions.color}
                </button>
              </div>
              <div className="option-group">
                <h3>Hood Ornament</h3>
                <button onClick={() => cycleOption('ornament')}>
                  {selectedOptions.ornament}
                </button>
              </div>
            </div>

            <div className="carriage-display">
              <CarriagePreview
                wheels={selectedOptions.wheels}
                color={selectedOptions.color}
                ornament={selectedOptions.ornament}
              />
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
              In this workshop where magic meets steel,
              A carriage awaits, with modern appeal.
              No wooden wheels can match your pace,
              Modern rims set a luxurious grace.
              A proud letter stands where horses once led,
              'B' for the beauty that lies ahead.
              Pink as your dreams, this chariot gleams,
              Transform this coach beyond what it seems.
            `}
            instructions={[
              "1. Tap each option to cycle through choices",
              "2. Match the wheels, color, and ornament to your dream car",
              "3. The correct combination will trigger the transformation",
              "4. Think modern luxury with a personal touch",
              "5. Your favorite color holds the key",
              "6. The right emblem marks true elegance"
            ]}
          />
        </div>
      )}

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for instructions" />
      </div>

      <style jsx>{`
        .workshop-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          border: 3px solid var(--color-gold);
          border-radius: var(--radius-medium);
          min-height: 60vh;
          overflow: hidden;
          background: rgba(26, 26, 42, 0.7);
        }

        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.3;
        }

        .carriage-customizer {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding: 20px;
        }

        .options-container {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 20px;
        }

        .option-group {
          background: rgba(26, 26, 42, 0.8);
          padding: 20px;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          text-align: center;
          min-width: 150px;
        }

        .option-group h3 {
          color: var(--color-gold);
          margin-bottom: 10px;
          font-family: var(--font-medieval);
        }

        .option-group button {
          background: var(--color-primary);
          color: var(--color-text);
          padding: 10px 20px;
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-small);
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: capitalize;
          min-width: 120px;
        }

        .option-group button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }

        .carriage-display {
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0;
          padding: 20px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
        }

        .success-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
          z-index: 10;
          animation: fadeIn 1s ease-out;
        }

        .success-content {
          background: linear-gradient(45deg, var(--color-gold), #ffd700, #ffed4a);
          padding: 30px;
          border-radius: var(--radius-medium);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          max-width: 600px;
          margin: 20px auto;
          position: relative;
          z-index: 2;
        }

        .success-title {
          font-family: var(--font-medieval);
          font-size: 2.5rem;
          color: var(--color-background);
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .success-message {
          font-size: 1.4rem;
          line-height: 1.4;
          color: var(--color-background);
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
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 15px var(--color-torch); }
          50% { box-shadow: 0 0 25px var(--color-torch); }
          100% { box-shadow: 0 0 15px var(--color-torch); }
        }

        @media (max-width: 768px) {
          .option-group {
            padding: 15px;
            min-width: 120px;
          }

          .option-group button {
            min-width: 100px;
            padding: 8px 16px;
          }

          .success-title {
            font-size: 2rem;
          }

          .success-message {
            font-size: 1.2rem;
          }

          .continue-button {
            font-size: 1.1rem;
            padding: 10px 20px;
          }
        }

        @media (max-width: 480px) {
          .option-group {
            padding: 10px;
            min-width: 100px;
          }

          .option-group button {
            min-width: 80px;
            padding: 6px 12px;
          }

          .success-title {
            font-size: 1.8rem;
          }

          .success-message {
            font-size: 1.1rem;
          }

          .continue-button {
            font-size: 1rem;
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default MagicalCarriageWorkshop;