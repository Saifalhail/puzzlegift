import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import RiddleMessage from '../shared/RiddleMessage';
import SoundManager from '../../utils/SoundManager';
import Sparkles from '../shared/Sparkles';
import PuzzleStepper from '../shared/PuzzleStepper';
import ThroneRoomBackground from '../svg/ThroneRoomBackground';

const RIDDLES = [
  {
    id: 'first_movie',
    text: "Which animated plumber starred in the very first movie you both watched together?",
    options: ['Sonic the Hedgehog', 'Mario Movie', 'Aladdin', 'Frozen'],
    correct: 'Mario Movie'
  },
  {
    id: 'first_date',
    text: "Where did you go on your first official date?",
    options: ['Marina Mall', 'The Dubai Mall', 'Mall of the Emirates', 'Yas Mall'],
    correct: 'Marina Mall'
  },
  {
    id: 'first_kiss',
    text: "In what location did your first kiss take place?",
    options: ["Wife's Range Rover", "Husband's G63", 'A movie theater lobby', 'A bench in a public park'],
    correct: "Wife's Range Rover"
  },
  {
    id: 'shared_mascot',
    text: "Which creature do you both adore as your shared mascot?",
    options: ['Lion', 'Eagle', 'Beaver', 'Dolphin'],
    correct: 'Beaver'
  },
  {
    id: 'dream_wedding',
    text: "Where do you dream of having your grand wedding ceremony?",
    options: ['Jawaher Halls', 'Al Falak Ballroom', 'The Ritz-Carlton', 'Atlantis the Palm'],
    correct: 'Jawaher Halls'
  },
  {
    id: 'children_names',
    text: "Which three names do you hold most dear for your children?",
    options: ['Thaani, Aljaazi, Lulwa', 'Maryam, Shamma, Hafsa', 'Aisha, Fatima, Meera', 'Hessa, Salama, Nora'],
    correct: 'Thaani, Aljaazi, Lulwa'
  },
  {
    id: 'dream_ring',
    text: "Which brand is the dream wedding ring for you?",
    options: ['Tiffany & Co.', 'Cartier', 'Choumet', 'Bvlgari'],
    correct: 'Choumet'
  },
  {
    id: 'future_plan',
    text: "What do you aspire to do together as your future plan and dream?",
    options: ['Move to a desert island', 'Retire in a countryside cottage', 'Settle outside together studying PhD', 'Become professional dancers'],
    correct: 'Settle outside together studying PhD'
  }
];

const KingsGrandRiddle = ({ onComplete, onBack, previousPuzzle = 7, isComplete: initialIsComplete = false }) => {
  const [answers, setAnswers] = useState(new Array(RIDDLES.length).fill(null));
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGiftLock, setShowGiftLock] = useState(false);
  const [giftUnlocked, setGiftUnlocked] = useState(false);
  const [lockCode, setLockCode] = useState('');

  useEffect(() => {
    SoundManager.startBackgroundMusic('finale');
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setAnswers(RIDDLES.map(riddle => riddle.correct));
      setShowSuccess(true);
      setShowSparkles(true);
      setIsComplete(true);
      setGiftUnlocked(true);
    }
  }, [initialIsComplete]);

  const handleAnswerSelect = (riddleIndex, answer) => {
    if (isComplete) return;

    const newAnswers = [...answers];
    newAnswers[riddleIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      setErrorMessage('Please answer all riddles before submitting.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const allCorrect = answers.every((answer, index) => answer === RIDDLES[index].correct);

    if (allCorrect) {
      setShowSparkles(true);
      setShowSuccess(true);
      setIsComplete(true);
      SoundManager.play('success');
    } else {
      setErrorMessage('Some answers do not please the King. Try reviewing your choices!');
      setTimeout(() => setErrorMessage(''), 3000);
      SoundManager.play('error');
    }
  };

  const puzzleHint = "Think about our journey: from our first movie date watching Mario, to our special moments at Marina Mall, our first kiss, our beloved beaver mascot, our dream wedding venue, our future children's names, your dream ring, and our shared PhD aspirations. Each answer reflects a cherished memory or dream we share.";

  const handleGiftReveal = () => {
    setShowGiftLock(true);
  };

  const handleLockSubmit = () => {
    if (lockCode === '1202') {
      setGiftUnlocked(true);
      setShowGiftLock(false);
      SoundManager.play('success');
      onComplete && onComplete();
    } else {
      setErrorMessage('Incorrect code. Try again!');
      setTimeout(() => setErrorMessage(''), 3000);
      SoundManager.play('error');
    }
  };

  const handleComplete = () => {
    onComplete && onComplete();
    // Refresh the page
    window.location.reload();
  };

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

      <h1 className="medieval-title">The King's Grand Riddle</h1>

      <div className="throne-room">
        <div className="background-wrapper">
          <ThroneRoomBackground className="throne-background" />
        </div>

        {!showSuccess && (
          <div className="riddles-container">
            {RIDDLES.map((riddle, index) => (
              <div key={riddle.id} className="riddle-scroll">
                <div className="riddle-text">{riddle.text}</div>
                <div className="options-grid">
                  {riddle.options.map((option) => (
                    <button
                      key={option}
                      className={`option-button ${answers[index] === option ? 'selected' : ''}`}
                      onClick={() => handleAnswerSelect(index, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <button 
              className="medieval-button submit-button"
              onClick={handleSubmit}
              aria-label="Submit answers to the King"
            >
              Present Answers to the King
            </button>
          </div>
        )}

        {showSuccess && (
          <div className="success-container">
            <Sparkles active={showSparkles} />
            <div className="success-content">
              <h2 className="success-title">A Knight's Final Riddle to His Future Bride</h2>
              <div className="final-poem">
                <p>From puzzle gates to hidden lore, each challenge I did weave with care,<br/>
                My every clue a token for the heart you hold so fair.</p>
                <p>Though fortune's winds blow lean on me, and distance keeps us far apart,<br/>
                My promise stands in every verse: you reign within my heart.</p>
                <p>Soon shall our wedding bells resound, our vows in glory sealed,<br/>
                This puzzle realm I made to show the depth of love revealed.</p>
                <p>One humble gift awaits you now—click yon shining button to see,<br/>
                A small token for you to spend, yet the start of all I'll be.</p>
              </div>
              {!giftUnlocked && !showGiftLock && (
                <button 
                  className="medieval-button reveal-button"
                  onClick={handleGiftReveal}
                  aria-label="Reveal your gift"
                >
                  Unveil Your Gift 🎁
                </button>
              )}
              {showGiftLock && (
                <div className="gift-lock">
                  <h3>Enter the Secret Code</h3>
                  <p className="code-hint">Hint: Your special day (DDMM)</p>
                  <input
                    type="password"
                    maxLength="4"
                    value={lockCode}
                    onChange={(e) => setLockCode(e.target.value)}
                    placeholder="Enter 4-digit code"
                    className="lock-input"
                  />
                  <button 
                    className="medieval-button unlock-button"
                    onClick={handleLockSubmit}
                  >
                    Unlock
                  </button>
                </div>
              )}
              {giftUnlocked && (
                <div className="gift-card">
                  <div className="gift-card-content">
                    <h3>Collect Your Gift! 🎁</h3>
                    <div className="collection-details">
                      <h4>Mall Gift Card - Mall of the Emirates</h4>
                      <p>Ground Floor</p>
                      <div className="timing-info">
                        <p><strong>Weekdays:</strong> 10:00 - 23:00</p>
                        <p><strong>Weekends:</strong> 10:00 - 00:00</p>
                      </div>
                      <div className="order-number">
                        <p><strong>Order Number</strong></p>
                        <p className="number">#726755494020109</p>
                      </div>
                    </div>
                    <p className="collection-reminder">
                      🔔 Visit the Mall Gift Card counter to collect your gift card!<br/>
                      P.S under your name and phone number.
                    </p>
                  </div>
                </div>
              )}
              {giftUnlocked && (
                <button 
                  className="medieval-button finish-button"
                  onClick={handleComplete}
                  aria-label="Finish the adventure"
                >
                  End Journey ✨
                </button>
              )}
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {!isComplete && (
          <div className="instructions-section">
            <RiddleMessage 
              riddle="The King's riddles test your recall of our special memories and dreams. 
                     Each question holds a piece of our story, from our first adventures to our shared dreams 
                     and future plans. Choose wisely, for in these answers lies the key to our journey's end."
              instructions={[
                "1. Read each riddle carefully - they reference our special memories",
                "2. Select one answer for each riddle by tapping it",
                "3. You can change your answers freely before submitting",
                "4. Submit all answers to the King when ready",
                "5. If any answers are incorrect, you can try again"
              ]}
            />
          </div>
        )}
      </div>

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator />
      </div>

      <style jsx>{`
        .throne-room {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          min-height: 70vh;
        }

        .background-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .throne-background {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.2;
        }

        .riddles-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .riddle-scroll {
          background: rgba(244, 228, 188, 0.1);
          backdrop-filter: blur(4px);
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          padding: 20px;
          animation: fadeIn 0.5s ease-out;
        }

        .riddle-text {
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          color: var(--color-gold);
          text-align: center;
          margin-bottom: 20px;
          white-space: pre-line;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin-top: 15px;
        }

        .option-button {
          background: rgba(34, 34, 59, 0.8);
          border: 1px solid var(--color-gold);
          color: var(--color-text);
          padding: 12px;
          border-radius: var(--radius-small);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-medieval);
          font-size: 1rem;
        }

        .option-button:hover {
          background: rgba(244, 228, 188, 0.2);
          transform: translateY(-2px);
        }

        .option-button.selected {
          background: var(--color-gold);
          color: var(--color-background);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .submit-button {
          margin: 30px auto;
          font-size: 1.2rem;
          padding: 15px 30px;
          background: var(--color-gold);
          color: var(--color-background);
          animation: pulse 2s infinite;
        }

        .success-container {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 40px 20px;
          background: rgba(34, 34, 59, 0.9);
          border-radius: var(--radius-medium);
          border: 3px solid var(--color-gold);
          max-width: 800px;
          margin: 0 auto;
        }

        .success-title {
          color: var(--color-gold);
          font-size: 2rem;
          margin-bottom: 20px;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .success-message {
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: 30px;
        }

        .finish-button {
          font-size: 1.3rem;
          padding: 15px 40px;
          background: linear-gradient(45deg, var(--color-gold), #ffd700);
          color: var(--color-background);
          border: none;
          animation: glow 2s infinite;
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

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
        }

        @media (max-width: 768px) {
          .riddle-text {
            font-size: 1.1rem;
          }

          .option-button {
            font-size: 0.9rem;
            padding: 10px;
          }

          .submit-button,
          .finish-button {
            font-size: 1.1rem;
            padding: 12px 24px;
          }

          .success-title {
            font-size: 1.8rem;
          }

          .success-message {
            font-size: 1.1rem;
          }
        }

        .scroll-indicator-wrapper {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .scroll-indicator-wrapper {
            bottom: 15px;
            right: 15px;
          }
        }

        .final-poem {
          font-family: var(--font-medieval);
          font-size: 1.2rem;
          line-height: 1.8;
          color: var(--color-gold);
          margin: 30px 0;
          padding: 20px;
          background: rgba(34, 34, 59, 0.9);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-medium);
          text-align: center;
        }

        .reveal-button {
          font-size: 1.3rem;
          padding: 15px 30px;
          margin: 20px 0;
          background: linear-gradient(45deg, var(--color-gold), #ffd700);
          border: 2px solid var(--color-wood);
          animation: glow 2s infinite;
          color: var(--color-background);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .gift-lock {
          background: rgba(34, 34, 59, 0.95);
          padding: 30px;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          margin: 20px 0;
        }

        .lock-input {
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          color: var(--color-gold);
          font-family: var(--font-medieval);
          font-size: 1.5rem;
          padding: 10px;
          width: 120px;
          text-align: center;
          margin: 15px 0;
          border-radius: var(--radius-small);
        }

        .unlock-button {
          font-size: 1.1rem;
          padding: 10px 20px;
          margin-top: 10px;
        }

        .gift-card {
          background: linear-gradient(45deg, #f8f4e8, #fff);
          padding: 30px;
          border-radius: var(--radius-medium);
          border: 3px solid var(--color-gold);
          margin: 20px 0;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
        }

        .gift-card-content {
          text-align: center;
          color: #22223b;
        }

        .gift-card-content h3 {
          font-size: 1.8rem;
          color: #22223b;
          margin-bottom: 20px;
        }

        .collection-details {
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: var(--radius-small);
          margin: 20px 0;
        }

        .collection-details h4 {
          font-size: 1.4rem;
          color: #22223b;
          margin-bottom: 10px;
        }

        .timing-info {
          margin: 15px 0;
          color: #22223b;
        }

        .timing-info p {
          margin: 5px 0;
        }

        .order-number {
          margin-top: 20px;
          padding: 10px;
          background: rgba(34, 34, 59, 0.1);
          border-radius: var(--radius-small);
        }

        .order-number .number {
          font-size: 1.3rem;
          font-weight: bold;
          color: #22223b;
          margin-top: 5px;
        }

        .collection-reminder {
          font-size: 1.1rem;
          color: #22223b;
          margin-top: 15px;
          font-style: italic;
        }

        .code-hint {
          color: var(--color-gold);
          font-size: 1rem;
          margin: 10px 0;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default KingsGrandRiddle;