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
  wheels: ['classic', 'sport', 'luxury', 'modern'],
  color: ['silver', 'black', 'pink', 'gold'],
  ornament: ['crown', 'star', 'bentley', 'dragon'],
  trim: ['chrome', 'gold', 'black', 'matching'],
  emblem: ['wings', 'shield', 'crest', 'bentley']
};

const CORRECT_COMBINATION = {
  wheels: 'modern',
  color: 'pink',
  ornament: 'bentley',
  trim: 'chrome',
  emblem: 'bentley'
};

const MagicalCarriageWorkshop = ({ onComplete, onBack, previousPuzzle, isComplete: initialIsComplete = false }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    wheels: CARRIAGE_OPTIONS.wheels[0],
    color: CARRIAGE_OPTIONS.color[0],
    ornament: CARRIAGE_OPTIONS.ornament[0],
    trim: CARRIAGE_OPTIONS.trim[0],
    emblem: CARRIAGE_OPTIONS.emblem[0]
  });
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  const puzzleHint = "Think about your dream car - a modern luxury vehicle with a distinctive 'B' emblem, chrome accents, and the right ornaments. The color should match your favorite!";

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
  };

  const handleConfirm = () => {
    // Check if the combination is correct
    if (Object.entries(selectedOptions).every(([key, value]) => value === CORRECT_COMBINATION[key])) {
      handleSuccess();
    } else {
      setErrorMessage('Not quite right... Keep trying!');
      SoundManager.play('error');
    }
  };

  const handleSuccess = () => {
    setShowSparkles(true);
    setShowSuccess(true);
    setIsComplete(true);
    setSelectedOptions(CORRECT_COMBINATION);
    SoundManager.play('success');
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
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
        currentPuzzle={5}
        totalPuzzles={8}
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
              <div className="completed-car">
                <CarriagePreview
                  wheels={CORRECT_COMBINATION.wheels}
                  color={CORRECT_COMBINATION.color}
                  ornament={CORRECT_COMBINATION.ornament}
                  trim={CORRECT_COMBINATION.trim}
                  emblem={CORRECT_COMBINATION.emblem}
                />
              </div>
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
                <button onClick={() => cycleOption('wheels')} className="option-button">
                  {selectedOptions.wheels}
                </button>
              </div>
              <div className="option-group">
                <h3>Color</h3>
                <button onClick={() => cycleOption('color')} className="option-button">
                  {selectedOptions.color}
                </button>
              </div>
              <div className="option-group">
                <h3>Hood Ornament</h3>
                <button onClick={() => cycleOption('ornament')} className="option-button">
                  {selectedOptions.ornament}
                </button>
              </div>
              <div className="option-group">
                <h3>Trim Style</h3>
                <button onClick={() => cycleOption('trim')} className="option-button">
                  {selectedOptions.trim}
                </button>
              </div>
              <div className="option-group">
                <h3>Side Emblem</h3>
                <button onClick={() => cycleOption('emblem')} className="option-button">
                  {selectedOptions.emblem}
                </button>
              </div>
            </div>

            <div className="carriage-display">
              <CarriagePreview
                wheels={selectedOptions.wheels}
                color={selectedOptions.color}
                ornament={selectedOptions.ornament}
                trim={selectedOptions.trim}
                emblem={selectedOptions.emblem}
              />
            </div>

            <div className="confirm-section">
              <button 
                onClick={handleConfirm}
                className="medieval-button confirm-button"
              >
                Confirm Design
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
              In this workshop where magic meets steel,
              A carriage awaits, with modern appeal.
              Modern wheels, not classic or old,
              With chrome accents bright and bold.
              A proud letter stands where horses once led,
              'B' for the beauty that lies ahead.
              Pink as your dreams, this chariot gleams,
              With matching emblems that catch moonbeams.
              When all is set just as it should be,
              Confirm your choice and set magic free!
            `}
            instructions={[
              "1. Tap each option to cycle through choices",
              "2. Match the wheels, color, ornaments, trim, and emblems",
              "3. All elements should match your dream luxury car",
              "4. Think modern elegance with a personal touch",
              "5. Your favorite color holds the key",
              "6. The right emblems mark true luxury",
              "7. Click 'Confirm Design' when ready"
            ]}
          />
        </div>
      )}

      <ScrollIndicator text="Scroll for instructions" />

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

        .option-button {
          background: var(--color-primary);
          color: var(--color-text);
          padding: 10px 20px;
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-small);
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: capitalize;
          font-family: var(--font-medieval);
        }

        .option-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px var(--color-gold);
        }

        .confirm-section {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .confirm-button {
          font-size: 1.2rem;
          padding: 15px 30px;
          background: var(--color-gold);
          color: var(--color-background);
          border: none;
          border-radius: var(--radius-medium);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-medieval);
        }

        .confirm-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px var(--color-gold);
        }

        .error-message {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 0, 0, 0.2);
          color: var(--color-torch);
          padding: 10px 20px;
          border-radius: var(--radius-medium);
          border: 1px solid var(--color-torch);
          z-index: 1000;
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
          max-width: 800px;
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
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          font-family: var(--font-medieval);
        }

        .completed-car {
          width: 100%;
          max-width: 600px;
          margin: 0 auto 30px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-medium);
          padding: 20px;
          border: 2px solid var(--color-background);
        }

        .continue-button {
          font-size: 1.2rem;
          padding: 15px 30px;
          background: var(--color-background);
          color: var(--color-gold);
          border: 2px solid var(--color-background);
          border-radius: var(--radius-medium);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-medieval);
          animation: pulse 2s infinite;
        }

        .continue-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 15px var(--color-background); }
          50% { box-shadow: 0 0 25px var(--color-background); }
          100% { box-shadow: 0 0 15px var(--color-background); }
        }

        @media (max-width: 768px) {
          .option-group {
            min-width: 120px;
          }
          
          .option-button {
            padding: 8px 16px;
            font-size: 0.9rem;
          }

          .success-title {
            font-size: 2rem;
          }

          .success-message {
            font-size: 1.2rem;
          }

          .completed-car {
            padding: 10px;
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

export default MagicalCarriageWorkshop;