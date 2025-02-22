import React, { useState, useEffect, useRef } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import RiddleMessage from '../shared/RiddleMessage';
import SoundManager from '../../utils/SoundManager';
import Sparkles from '../shared/Sparkles';
import PuzzleStepper from '../shared/PuzzleStepper';
import TreasureVaultBackground from '../svg/TreasureVaultBackground';

const CORRECT_CODE = '2023';

// Combination Lock Component
const CombinationLock = ({ isOpen, onClose, onUnlock, onFail }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleDigitChange = (index, value) => {
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if a digit was entered
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit when all digits are filled
      if (newCode.every(digit => digit !== '')) {
        const enteredCode = newCode.join('');
        if (enteredCode === CORRECT_CODE) {
          onUnlock();
        } else {
          onFail();
          // Reset code after wrong attempt
          setCode(['', '', '', '']);
          // Focus first input after reset
          inputRefs.current[0]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      prevInput?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="combination-lock">
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            name={`digit-${index}`}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            autoFocus={index === 0}
          />
        ))}
      </div>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

// SVG Components for the chests
const TreasureChest = ({ number, color, pattern, isOpen, onClick, children }) => (
  <svg 
    width="200" 
    height="200" 
    viewBox="0 0 200 200" 
    onClick={onClick} 
    className={`treasure-chest ${isOpen ? 'open' : ''}`}
    style={{ cursor: 'pointer' }}
  >
    {/* Base/Bottom of chest */}
    <rect x="40" y="100" width="120" height="80" rx="10" 
      fill={color} 
      stroke="#8B4513" 
      strokeWidth="4"
      className="chest-base"
      pointerEvents="none"
    />
    
    {/* Lid of chest */}
    <g 
      className="chest-lid" 
      style={{ transform: isOpen ? 'rotate(-110deg)' : 'rotate(0deg)', transformOrigin: '160px 100px' }}
      pointerEvents="none"
    >
      <path d="M40 100 L160 100 L180 70 L20 70 Z" 
        fill={color} 
        stroke="#8B4513" 
        strokeWidth="4"
      />
      {pattern === 'dragon' && (
        <path d="M60 80 Q100 75 140 80 Q120 90 100 85 Q80 90 60 80" 
          fill="none" 
          stroke="#8B4513" 
          strokeWidth="2"
          className="dragon-pattern"
        />
      )}
      {/* Lock/Clasp */}
      <circle cx="100" cy="85" r="8" fill="#FFD700" stroke="#8B4513" strokeWidth="2" />
    </g>
    
    {/* Number label */}
    <text 
      x="180" 
      y="30" 
      fill="#FFD700" 
      fontSize="24" 
      fontFamily="medieval" 
      textAnchor="end"
      pointerEvents="none"
    >
      #{number}
    </text>
    
    {/* Content (only visible when open) */}
    {isOpen && children}
  </svg>
);

// SVG Component for the Pink Birkin
const PinkBirkin = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" className="pink-birkin">
    <path d="M20 30 L60 30 L70 60 L10 60 Z" 
      fill="#FFB6C8" 
      stroke="#FF69B4" 
      strokeWidth="2"
    />
    <path d="M30 30 C30 20 50 20 50 30" 
      fill="none" 
      stroke="#FF69B4" 
      strokeWidth="4"
      className="bag-handle"
    />
  </svg>
);

// SVG Component for No-Face Cameo
const NoFaceCameo = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" className="no-face-cameo">
    <circle cx="30" cy="30" r="25" fill="#333" />
    <path d="M20 25 Q30 35 40 25" fill="none" stroke="white" strokeWidth="2" />
    <circle cx="25" cy="20" r="2" fill="white" />
    <circle cx="35" cy="20" r="2" fill="white" />
  </svg>
);

const LadysTreasureVault = ({ onComplete, onBack, previousPuzzle = 3, isComplete: initialIsComplete = false }) => {
  const [openChest, setOpenChest] = useState(null);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showCombination, setShowCombination] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showDragonAnimation, setShowDragonAnimation] = useState(false);
  const [showLock, setShowLock] = useState(false);
  const [currentChest, setCurrentChest] = useState(null);

  const puzzleHint = "Remember: The Pink Birkin matches its chest's color, and the combination holds a special date - the year we first met! Also, beware of the chest with the dragon emblem!";

  useEffect(() => {
    SoundManager.startBackgroundMusic('medieval');
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setOpenChest(3);
      setIsComplete(true);
      setShowSuccess(true);
      setShowSparkles(true);
      setIsUnlocked(true);
    }
  }, [initialIsComplete]);

  const resetPuzzle = () => {
    setOpenChest(null);
    setShowSparkles(false);
    setShowSuccess(false);
    setErrorMessage('');
    setShowCombination(false);
    setIsUnlocked(false);
    setShowDragonAnimation(false);
    setShowLock(false);
    setCurrentChest(null);
  };

  const handleSuccess = () => {
    setShowSparkles(true);
    setShowSuccess(true);
    setIsComplete(true);
    setIsUnlocked(true);
  };

  const handleChestClick = (chestNumber) => {
    if (isComplete) return;
    
    // Set the current chest and open it
    setCurrentChest(chestNumber);
    setOpenChest(chestNumber);
    
    if (chestNumber === 3) {
      // Pink Birkin chest - show combination lock
      setShowLock(true);
    } else {
      // All other chests trigger dragon animation and fail
      setShowDragonAnimation(true);
      SoundManager.play('error');
      setTimeout(() => {
        resetPuzzle();
      }, 2000);
    }
  };

  const handleCombinationUnlock = () => {
    setShowLock(false);
    setOpenChest(3); // Keep the pink chest open
    setShowSparkles(true);
    setShowSuccess(true);
    setIsComplete(true);
    setIsUnlocked(true);
    SoundManager.play('success');
  };

  const handleCombinationFail = () => {
    setShowDragonAnimation(true);
    setShowLock(false);
    SoundManager.play('error');
    setTimeout(() => {
      setShowDragonAnimation(false);
      resetPuzzle();
    }, 2000);
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        hint={puzzleHint}
        previousPuzzle={previousPuzzle}
      />

      <PuzzleStepper 
        currentPuzzle={4}
        totalPuzzles={8}
        onNavigate={onBack}
      />

      <h1 className="medieval-title">The Lady's Treasure Vault</h1>

      <div className="vault-container">
        <div className="background-wrapper">
          <TreasureVaultBackground className="vault-background" />
        </div>
        <div className="chests-row">
          <div className="chest-wrapper">
            <TreasureChest 
              number={1} 
              color="#333333" 
              isOpen={openChest === 1}
              onClick={() => handleChestClick(1)}
            >
              <NoFaceCameo />
            </TreasureChest>
          </div>
          <div className="chest-wrapper">
            <TreasureChest 
              number={2} 
              color="#FFD700" 
              isOpen={openChest === 2}
              onClick={() => handleChestClick(2)}
            />
          </div>
          <div className="chest-wrapper">
            <TreasureChest 
              number={3} 
              color="#FFB6C8" 
              isOpen={openChest === 3}
              onClick={() => handleChestClick(3)}
            >
              <PinkBirkin />
            </TreasureChest>
          </div>
          <div className="chest-wrapper">
            <TreasureChest 
              number={4} 
              color="#2F4F4F" 
              pattern="dragon"
              isOpen={openChest === 4}
              onClick={() => handleChestClick(4)}
            />
          </div>
        </div>

        {showLock && (
          <CombinationLock
            isOpen={showLock}
            onClose={() => setShowLock(false)}
            onUnlock={handleCombinationUnlock}
            onFail={handleCombinationFail}
          />
        )}

        {showDragonAnimation && (
          <div className="dragon-animation">
            <div className="dragon">🐉</div>
          </div>
        )}

        <Sparkles active={showSparkles} />

        {showSuccess && (
          <div className="success-container">
            <Sparkles active={showSparkles} />
            <div className="success-content">
              <h2 className="success-title">Congratulations, My Love!</h2>
              <p className="success-message">
                You've unearthed the Pink Birkin from the vault. Click 'Next' to continue our adventure.
              </p>
              <button 
                className="medieval-button continue-button" 
                onClick={handleContinue}
                aria-label="Continue to next puzzle"
              >
                Continue Our Adventure →
              </button>
            </div>
            <div className="prize-display">
              <PinkBirkin />
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
              Deep within these treasure chests of old,
              Lies a special gift worth more than gold.
              No chest with dragon's mark holds your prize,
              Nor where warrior's gear quietly lies.
              A spirit's cameo, though precious and rare,
              Guards not the Birkin with gentle care.
              The chest that holds your cherished delight,
              Shares the same hue as the Birkin bright!
              
              But first, a lock you must undo,
              With numbers that mean much to me and you.
              The year we met, so sweet and fine,
              When Two Thousand and Twenty-Three aligned.
            `}
            instructions={[
              "1. Enter the correct combination to unlock the chests",
              "2. Each chest is numbered (1-4) for your guidance",
              "3. Tap a chest to open it and see what's inside",
              "4. Use the clues to deduce which chest holds the Pink Birkin",
              "5. Wrong choices will close automatically",
              "6. The correct chest will reveal your prize!"
            ]}
          />
        </div>
      )}

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for instructions" />
      </div>

      <style jsx>{`
        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: var(--radius-medium);
          opacity: 0.12;
        }

        .vault-background {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vault-container {
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

        .chests-row {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          margin: 20px 0;
        }

        .chest-wrapper {
          flex: 1;
          min-width: 200px;
          max-width: 250px;
          margin: 10px;
          transition: transform 0.3s ease;
        }

        .chest-wrapper:hover {
          transform: scale(1.05);
        }

        .treasure-chest {
          width: 100%;
          height: auto;
          cursor: pointer;
        }

        .chest-lid {
          transition: transform 0.5s ease;
        }

        .treasure-chest.open .chest-lid {
          transform: rotate(-110deg);
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

        @media (max-width: 768px) {
          .chest-wrapper {
            min-width: 150px;
          }

          .success-title {
            font-size: 2rem;
          }

          .continue-button {
            font-size: 1.1rem;
            padding: 10px 20px;
          }
        }

        @media (max-width: 480px) {
          .chest-wrapper {
            min-width: 120px;
          }

          .success-title {
            font-size: 1.8rem;
          }

          .continue-button {
            font-size: 1rem;
            padding: 8px 16px;
          }
        }

        .dragon-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .dragon {
          font-size: 5rem;
          animation: dragonAttack 2s ease-out;
        }

        .combination-lock {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(34, 34, 59, 0.95);
          padding: 2rem;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          z-index: 1000;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .code-inputs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .code-inputs input {
          width: 40px;
          height: 40px;
          text-align: center;
          font-size: 1.5rem;
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          color: var(--color-gold);
          border-radius: var(--radius-small);
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--color-background);
          color: var(--color-gold);
          border: 2px solid var(--color-gold);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        @keyframes dragonAttack {
          0% {
            transform: scale(0.1) translateY(100vh);
          }
          50% {
            transform: scale(2) translateY(0);
          }
          100% {
            transform: scale(3) translateY(-100vh);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LadysTreasureVault; 