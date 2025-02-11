import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import ScrollIndicator from '../shared/ScrollIndicator';
import RiddleMessage from '../shared/RiddleMessage';
import SoundManager from '../../utils/SoundManager';
import Sparkles from '../shared/Sparkles';
import PuzzleStepper from '../shared/PuzzleStepper';
import ChangingRoomBackground from '../svg/ChangingRoomBackground';
import { PAGES } from '../../App';

const CORRECT_QUOTES = {
  quote1: {
    amount1: 'too much',
    item: 'boobs',
    amount2: 'too much',
    reaction: 'gahba'
  },
  quote2: {
    who: 'zizi',
    where: 'there'
  }
};

const WORD_OPTIONS = {
  quote1: {
    amount1: ['too much', 'so many', 'lots of', 'plenty of', 'very much'],
    item: ['boobs', 'shoes', 'bags', 'clothes', 'stuff'],
    amount2: ['too much', 'so many', 'lots of', 'plenty of', 'very much'],
    reaction: ['gahba', 'drama', 'chaos', 'fuss', 'noise', 'yalla']
  },
  quote2: {
    who: ['zizi', 'mama', 'baba', 'nana', 'teta', 'amto', 'khalto', 'sitto'],
    where: ['there', 'here', 'home', 'outside', 'inside', 'upstairs', 'downstairs', 'somewhere']
  }
};

const getRandomWord = (options) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const ChangingRoomCapers = ({ onComplete, onBack, previousPuzzle = PAGES.UNLIKELY_MEMORIES_BUFFER, isComplete: initialIsComplete = false }) => {
  const [selectedWords, setSelectedWords] = useState({
    quote1: {
      amount1: getRandomWord(WORD_OPTIONS.quote1.amount1),
      item: getRandomWord(WORD_OPTIONS.quote1.item),
      amount2: getRandomWord(WORD_OPTIONS.quote1.amount2),
      reaction: getRandomWord(WORD_OPTIONS.quote1.reaction)
    },
    quote2: {
      who: getRandomWord(WORD_OPTIONS.quote2.who),
      where: getRandomWord(WORD_OPTIONS.quote2.where)
    }
  });
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  const puzzleHint = "Remember that hilarious day in Selfridges! Think about what the ladies said about the outfit, and your playful search for somewhere special when trying to navigate.";

  useEffect(() => {
    SoundManager.startBackgroundMusic('comedic');
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      setSelectedWords({
        quote1: CORRECT_QUOTES.quote1,
        quote2: CORRECT_QUOTES.quote2
      });
      setShowSuccess(true);
      setShowSparkles(true);
      setIsComplete(true);
    }
  }, [initialIsComplete]);

  const cycleWord = (quote, word) => {
    const options = WORD_OPTIONS[quote][word];
    const currentIndex = options.indexOf(selectedWords[quote][word]);
    const nextIndex = (currentIndex + 1) % options.length;
    
    setSelectedWords(prev => ({
      ...prev,
      [quote]: {
        ...prev[quote],
        [word]: options[nextIndex]
      }
    }));
    
    setErrorMessage('');
  };

  const checkQuotes = () => {
    const isQuote1Correct = 
      selectedWords.quote1.amount1 === CORRECT_QUOTES.quote1.amount1 &&
      selectedWords.quote1.item === CORRECT_QUOTES.quote1.item &&
      selectedWords.quote1.amount2 === CORRECT_QUOTES.quote1.amount2 &&
      selectedWords.quote1.reaction === CORRECT_QUOTES.quote1.reaction;
    
    const isQuote2Correct = 
      selectedWords.quote2.who === CORRECT_QUOTES.quote2.who &&
      selectedWords.quote2.where === CORRECT_QUOTES.quote2.where;

    if (isQuote1Correct && isQuote2Correct) {
      handleSuccess();
    } else {
      setErrorMessage("That doesn't sound right—try another combination!");
      SoundManager.play('error');
    }
  };

  const handleSuccess = () => {
    setShowSparkles(true);
    setShowSuccess(true);
    setIsComplete(true);
    SoundManager.play('success');
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
        currentPuzzle={6}
        totalPuzzles={8}
        onNavigate={onBack}
      />

      <h1 className="medieval-title">The Changing Room Capers</h1>

      <div className="puzzle-container">
        <div className="background-wrapper">
          <ChangingRoomBackground className="changing-room-background" />
        </div>

        {showSuccess ? (
          <div className="success-container">
            <Sparkles active={showSparkles} />
            <div className="success-content">
              <h2 className="success-title">Hilarious!</h2>
              <p className="success-message">
                You've perfectly recalled our funniest changing room day.
              </p>
              <div className="quotes-display">
                <div className="quote">"{CORRECT_QUOTES.quote1.amount1} {CORRECT_QUOTES.quote1.item}, {CORRECT_QUOTES.quote1.amount2} {CORRECT_QUOTES.quote1.reaction}!"</div>
                <div className="quote">"Where is {CORRECT_QUOTES.quote2.who}? It's {CORRECT_QUOTES.quote2.where}!"</div>
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
          <div className="quotes-container">
            <div className="quote-section">
              <div className="quote-builder">
                <span className="quote-text">"</span>
                <button 
                  onClick={() => cycleWord('quote1', 'amount1')}
                  className="word-button"
                >
                  {selectedWords.quote1.amount1}
                </button>
                <span className="quote-text"> </span>
                <button 
                  onClick={() => cycleWord('quote1', 'item')}
                  className="word-button"
                >
                  {selectedWords.quote1.item}
                </button>
                <span className="quote-text">, </span>
                <button 
                  onClick={() => cycleWord('quote1', 'amount2')}
                  className="word-button"
                >
                  {selectedWords.quote1.amount2}
                </button>
                <span className="quote-text"> </span>
                <button 
                  onClick={() => cycleWord('quote1', 'reaction')}
                  className="word-button"
                >
                  {selectedWords.quote1.reaction}
                </button>
                <span className="quote-text">!"</span>
              </div>
            </div>

            <div className="quote-section">
              <div className="quote-builder">
                <span className="quote-text">"Where is </span>
                <button 
                  onClick={() => cycleWord('quote2', 'who')}
                  className="word-button"
                >
                  {selectedWords.quote2.who}
                </button>
                <span className="quote-text">? It's </span>
                <button 
                  onClick={() => cycleWord('quote2', 'where')}
                  className="word-button"
                >
                  {selectedWords.quote2.where}
                </button>
                <span className="quote-text">!"</span>
              </div>
            </div>

            <button 
              onClick={checkQuotes}
              className="medieval-button confirm-button"
            >
              Confirm Quotes
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
              Once in London, across the seas,
              We laughed so hard it brought us to our knees!
              Women behind us exclaimed in jest,
              Something about fullness, oh what a test!
              And all day we joked: 'Where is what?'
              The answer was simpler than we ever knew!
            `}
            instructions={[
              "1. Tap the highlighted words to cycle through options",
              "2. Match both quotes to recreate that hilarious memory",
              "3. The first quote was about someone's outfit",
              "4. The second quote was about finding a Place",
              "5. Click 'Confirm Quotes' when you think you have it right",
              "6. Don't worry about mistakes—keep trying until you get it!"
            ]}
          />
        </div>
      )}

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for instructions" />
      </div>

      <style jsx>{`
        .puzzle-container {
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
          opacity: 0.5;
        }

        .changing-room-background {
          width: 100%;
          height: 100%;
        }

        .quotes-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
          padding: 20px;
          background: rgba(26, 26, 42, 0.8);
          border-radius: var(--radius-medium);
          margin: 20px;
        }

        .quote-section {
          background: rgba(244, 228, 188, 0.1);
          padding: 20px;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
          width: 100%;
          max-width: 600px;
        }

        .quote-builder {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .word-button {
          background: var(--color-primary);
          color: var(--color-text);
          padding: 8px 16px;
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-small);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-medieval);
        }

        .word-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px var(--color-gold);
        }

        .quote-text {
          color: var(--color-text);
          font-family: var(--font-medieval);
        }

        .confirm-button {
          margin-top: 30px;
          font-size: 1.2rem;
          padding: 15px 30px;
        }

        .success-container {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 20px;
        }

        .success-content {
          background: linear-gradient(45deg, var(--color-gold), #ffd700);
          padding: 30px;
          border-radius: var(--radius-medium);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
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
          line-height: 1.6;
          color: var(--color-background);
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          font-family: var(--font-medieval);
        }

        .quotes-display {
          margin: 20px 0;
          font-size: 1.4rem;
          color: var(--color-background);
          background: rgba(0, 0, 0, 0.2);
          padding: 20px;
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-background);
        }

        .quote {
          margin: 10px 0;
          font-family: var(--font-medieval);
          color: var(--color-background);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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

        @keyframes pulse {
          0% { box-shadow: 0 0 15px var(--color-background); }
          50% { box-shadow: 0 0 25px var(--color-background); }
          100% { box-shadow: 0 0 15px var(--color-background); }
        }

        @media (max-width: 768px) {
          .quote-builder {
            font-size: 1rem;
          }

          .word-button {
            padding: 6px 12px;
          }

          .quotes-display {
            font-size: 1.2rem;
          }
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
      `}</style>
    </div>
  );
};

export default ChangingRoomCapers; 