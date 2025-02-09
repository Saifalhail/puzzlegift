import React, { useState, useEffect } from 'react';
import CastleGate from '../../assets/CastleGate';
import Emblems from '../../assets/Emblems';
import Sparkles from '../shared/Sparkles';
import HintIcon from '../shared/HintIcon';
import SoundManager from '../../utils/SoundManager';
import '../../themes/medieval.css';
import ScrollIndicator from '../shared/ScrollIndicator';
import RiddleMessage from '../shared/RiddleMessage';
import BackButton from '../shared/BackButton';

const CastleGatePuzzle = ({ onComplete, onBack, isComplete: initialIsComplete = false }) => {
  const [sequence, setSequence] = useState([]);
  const [isGateOpen, setIsGateOpen] = useState(initialIsComplete);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const correctSequence = ['Crown', 'Lion', 'Rose', 'Dragon'];
  const puzzleHint = "Look closely at the words 'Royalty,' 'Courage,' 'Thorn,' and 'Fire.' Which symbols might they match?";
  const shuffledEmblems = ['Dragon', 'Rose', 'Crown', 'Lion'];

  useEffect(() => {
    SoundManager.startBackgroundMusic();
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setIsGateOpen(true);
      setIsComplete(true);
      setShowSuccess(true);
    }
  }, [initialIsComplete]);

  const handleEmblemClick = (emblem) => {
    if (isComplete) return;
    
    SoundManager.play('click');
    const newSequence = [...sequence, emblem];
    setSequence(newSequence);
    
    if (newSequence.length === correctSequence.length) {
      const isCorrect = newSequence.every(
        (item, index) => item === correctSequence[index]
      );
      
      if (isCorrect) {
        setShowSparkles(true);
        SoundManager.play('success');
        setTimeout(() => {
          setIsGateOpen(true);
          SoundManager.play('gateOpen');
          setTimeout(() => {
            setShowSuccess(true);
            setIsComplete(true);
          }, 1000);
        }, 1000);
      } else {
        setShowHint(true);
        setTimeout(() => {
          setSequence([]);
          setShowHint(false);
        }, 2000);
      }
    }
  };

  const handleContinue = () => {
    onComplete && onComplete();
  };

  const handleTouchStart = () => {
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = (e, emblem) => {
    e.preventDefault();
    if (Date.now() - touchStartTime < 500) {
      handleEmblemClick(emblem);
    }
  };

  return (
    <div className="medieval-container">
      <BackButton onBack={onBack} />
      <HintIcon hint={puzzleHint} />

      <h1 className="medieval-title">The Castle Gate</h1>

      <div className="gate-container">
        <CastleGate isOpen={isGateOpen} className="castle-gate" />
        <Sparkles active={showSparkles} />
        {isComplete && (
          <div className="gate-success-message">
            <p className="success-text">The Gate is open! Venture forth to discover the surprises within.</p>
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
        <>
          <div className="puzzle-section">
            <div className="puzzle-content">
              <div className="emblems-grid">
                {shuffledEmblems.map((name) => (
                  <div
                    key={name}
                    className="emblem-wrapper touch-target"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, name)}
                    onClick={() => handleEmblemClick(name)}
                    aria-label={`${name} Emblem`}
                  >
                    {React.createElement(Emblems[name], {
                      className: `emblem ${sequence.includes(name) ? 'emblem-selected' : ''}`
                    })}
                  </div>
                ))}
              </div>

              <div className="sequence-dots">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`sequence-dot ${sequence[index] ? 'filled' : ''}`}
                      aria-label={`Sequence slot ${index + 1}`}
                    >
                      {sequence[index] && (
                        <span className="sequence-number">{index + 1}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="scroll-arrow">
              <ScrollIndicator direction="down" />
            </div>
          </div>

          <RiddleMessage 
            riddle="When Royalty meets Courage and the Thorn meets Fire,
                   The Gate shall open to heart's desire."
            instructions={[
              "Tap on each icon in the correct order to unlock the gate"
            ]}
          />
        </>
      )}

      {showHint && (
        <div className="hint-popup">
          <div className="hint-content">
            <button className="close-button" onClick={() => setShowHint(false)}>×</button>
            <p className="puzzle-text">{puzzleHint}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .welcome-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(
            rgba(34, 34, 59, 0.9),
            rgba(34, 34, 59, 0.95)
          );
        }

        .welcome-content {
          width: 100%;
          max-width: 600px;
          text-align: center;
        }

        .birthday-title {
          font-size: 3rem;
          margin-bottom: 30px;
          text-shadow: 0 0 10px var(--color-gold);
          animation: glow 2s ease-in-out infinite alternate;
        }

        .welcome-scroll {
          margin-bottom: 30px;
          background: linear-gradient(
            45deg,
            #f4e4bc,
            #fff8e7
          );
        }

        .from-text {
          font-family: var(--font-medieval);
          font-size: 1.8rem;
          color: var(--color-wood);
          margin: 20px 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .message-content {
          font-size: 1.3rem;
          line-height: 1.7;
          margin: 20px 0;
        }

        .message-content p {
          margin-bottom: 15px;
        }

        .heart-decoration {
          font-size: 2.5rem;
          color: var(--color-wood);
          margin: 10px 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .start-button {
          font-size: 1.4rem;
          padding: 15px 30px;
          animation: float 3s ease-in-out infinite;
        }

        .intro-scroll {
          text-align: center;
          max-width: 600px;
          margin: 20px auto;
        }

        .intro-scroll .medieval-button {
          margin-top: 20px;
        }

        .riddle-scroll {
          max-width: 800px;
          margin: 15px auto 20px;
          padding: 15px;
        }

        .emblems-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding: 10px;
          max-width: 300px;
          margin: 0 auto;
        }

        .success-popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          padding: 20px;
          background: rgba(0, 0, 0, 0.7);
          animation: fadeIn 0.5s ease-out;
        }

        .success-content {
          background: linear-gradient(
            45deg,
            var(--color-gold),
            #ffd700,
            #ffed4a
          );
          padding: 30px;
          border-radius: var(--radius-medium);
          max-width: 90%;
          width: 500px;
          text-align: center;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          animation: scaleIn 0.5s ease-out;
          border: 3px solid var(--color-wood);
        }

        .success-text {
          font-size: 2.2rem;
          line-height: 1.4;
          color: var(--color-background);
          font-family: var(--font-medieval);
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .continue-button {
          font-size: 1.6rem;
          padding: 15px 30px;
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

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @media (max-width: 480px) {
          .success-content {
            padding: 20px;
          }

          .success-text {
            font-size: 1.8rem;
            margin-bottom: 20px;
          }

          .continue-button {
            font-size: 1.4rem;
            padding: 12px 24px;
          }
        }

        @media (min-width: 768px) {
          .emblems-grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 400px;
          }
        }

        .desktop-only {
          display: none;
        }

        .emblem-wrapper {
          width: 100%;
          aspect-ratio: 1;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .emblem {
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
        }

        .emblem-selected {
          opacity: 0.5;
        }

        .sequence-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 10px auto 5px;
          padding: 5px;
        }

        .sequence-dot {
          width: 36px;
          height: 36px;
          border: 2px solid var(--color-gold);
        }

        .sequence-dot.filled {
          background-color: var(--color-wood);
        }

        .sequence-number {
          font-size: 1.6rem;
        }

        .hint-popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          padding: 20px;
          background: rgba(0, 0, 0, 0.5);
          animation: fadeIn 0.3s ease-out;
        }

        .hint-content {
          background: linear-gradient(
            45deg,
            var(--color-gold),
            #ffd700,
            #ffed4a
          );
          padding: 30px 20px 20px;
          border-radius: var(--radius-medium);
          max-width: 90%;
          width: 400px;
          text-align: center;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          animation: scaleIn 0.3s ease-out;
          position: relative;
        }

        .hint-content .puzzle-text {
          color: var(--color-background);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 480px) {
          .riddle-text {
            font-size: 1.8rem;
          }

          .instruction-text {
            font-size: 1.2rem;
          }

          .sequence-dot {
            width: 32px;
            height: 32px;
          }

          .sequence-number {
            font-size: 1.4rem;
          }

          .medieval-title {
            font-size: 2rem;
            margin: 8px 0;
          }

          .emblems-grid {
            gap: 8px;
            padding: 8px;
          }
        }

        @media (hover: hover) {
          .emblem-wrapper:hover .emblem {
            transform: scale(1.1);
          }
        }

        .riddle-text {
          font-size: 2rem;
          line-height: 1.4;
          margin-bottom: 15px;
          color: var(--color-wood);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .puzzle-instructions {
          margin-top: 10px;
          text-align: center;
          background: rgba(74, 78, 105, 0.9);
          padding: 10px;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .instruction-text {
          font-size: 1.4rem;
          color: var(--color-text);
          margin: 5px 0;
          font-style: italic;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .puzzle-text {
          font-size: 2.2rem;
          line-height: 1.7;
          color: var(--color-wood);
        }

        .message-content {
          font-size: 2rem;
          line-height: 1.7;
          margin: 20px 0;
        }

        .from-text {
          font-family: var(--font-medieval);
          font-size: 2.4rem;
          color: var(--color-wood);
          margin: 20px 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .birthday-title {
          font-size: 2.4rem;
          margin: 10px 0;
          padding: 5px 0;
        }

        .hint-content p {
          font-size: 2rem;
          line-height: 1.7;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-background);
          color: var(--color-gold);
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid var(--color-gold);
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .close-button:hover {
          background: var(--color-gold);
          color: var(--color-background);
          transform: scale(1.1);
        }

        .scroll-arrow {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
        }

        .puzzle-section {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 20px;
          margin: 0 auto;
          max-width: 800px;
          padding: 0 20px;
          position: relative;
        }

        .puzzle-content {
          flex: 1;
          max-width: 400px;
        }

        @media (max-width: 480px) {
          .puzzle-section {
            flex-direction: column;
            align-items: center;
            padding: 0 10px;
          }

          .scroll-arrow {
            bottom: 10px;
            right: 10px;
          }

          .puzzle-content {
            margin-right: 0;
          }
        }

        .gate-success-message {
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
          padding: 20px;
          border-radius: var(--radius-medium);
          text-align: center;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          border: 3px solid var(--color-wood);
          max-width: 90%;
          width: 400px;
          z-index: 100;
        }

        .gate-success-message .success-text {
          font-size: 1.8rem;
          line-height: 1.4;
          color: var(--color-background);
          font-family: var(--font-medieval);
          margin-bottom: 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .gate-success-message .continue-button {
          font-size: 1.4rem;
          padding: 12px 24px;
          background: var(--color-background);
          color: var(--color-gold);
          border: 2px solid var(--color-wood);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .gate-success-message .continue-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(139, 69, 19, 0.4);
        }

        .gate-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        @media (max-width: 480px) {
          .gate-success-message {
            padding: 15px;
          }

          .gate-success-message .success-text {
            font-size: 1.5rem;
            margin-bottom: 15px;
          }

          .gate-success-message .continue-button {
            font-size: 1.2rem;
            padding: 10px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default CastleGatePuzzle; 