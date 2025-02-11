import React, { useState, useEffect } from 'react';
import CastleGatePuzzle from './components/puzzles/CastleGatePuzzle';
import RoyalFeastPuzzle from './components/puzzles/RoyalFeastPuzzle';
import EnchantedMapPuzzle from './components/puzzles/EnchantedMapPuzzle';
import PuzzleStepper from './components/shared/PuzzleStepper';
import BackButton from './components/shared/BackButton';
import CastleCorridorScene from './components/svg/CastleCorridorScene';
import Header from './components/shared/Header';
import './themes/medieval.css';
import RoseCorridorStory from './components/puzzles/RoseCorridorStory';
import KnightsTalePuzzle from './components/puzzles/KnightsTalePuzzle';
import LadysTreasureVault from './components/puzzles/LadysTreasureVault';
import TwilightPassage from './components/puzzles/TwilightPassage';
import MagicalCarriageWorkshop from './components/puzzles/MagicalCarriageWorkshop';
import UnlikelyMemoriesBuffer from './components/puzzles/UnlikelyMemoriesBuffer';
import ChangingRoomCapers from './components/puzzles/ChangingRoomCapers';
import GrandFinaleBuffer from './components/puzzles/GrandFinaleBuffer';
import KingsGrandRiddle from './components/puzzles/KingsGrandRiddle';

// Define page constants
export const PAGES = {
  INTRODUCTION: 'INTRODUCTION',
  CASTLE_GATE: 'CASTLE_GATE',
  ROYAL_FEAST: 'ROYAL_FEAST',
  CASTLE_CORRIDOR: 'CASTLE_CORRIDOR',
  ENCHANTED_MAP: 'ENCHANTED_MAP',
  ROSE_CORRIDOR: 'ROSE_CORRIDOR',
  KNIGHTS_TALE: 'KNIGHTS_TALE',
  LADYS_TREASURE_VAULT: 'LADYS_TREASURE_VAULT',
  TWILIGHT_PASSAGE: 'TWILIGHT_PASSAGE',
  MAGICAL_CARRIAGE: 'MAGICAL_CARRIAGE',
  UNLIKELY_MEMORIES_BUFFER: 'UNLIKELY_MEMORIES_BUFFER',
  CHANGING_ROOM_CAPERS: 'CHANGING_ROOM_CAPERS',
  GRAND_FINALE_BUFFER: 'GRAND_FINALE_BUFFER',
  KINGS_GRAND_RIDDLE: 'KINGS_GRAND_RIDDLE'
};

// Update puzzle numbers for stepper
const PAGE_TO_PUZZLE_NUMBER = {
  [PAGES.CASTLE_GATE]: 0,
  [PAGES.ROYAL_FEAST]: 1,
  [PAGES.CASTLE_CORRIDOR]: 1, // Share same number as Royal Feast
  [PAGES.ENCHANTED_MAP]: 2,
  [PAGES.KNIGHTS_TALE]: 3,
  [PAGES.LADYS_TREASURE_VAULT]: 4,
  [PAGES.TWILIGHT_PASSAGE]: 4, // Buffer story
  [PAGES.MAGICAL_CARRIAGE]: 5,
  [PAGES.UNLIKELY_MEMORIES_BUFFER]: 5, // Share same number as Magical Carriage
  [PAGES.CHANGING_ROOM_CAPERS]: 6,
  [PAGES.GRAND_FINALE_BUFFER]: 6, // Share same number as Changing Room
  [PAGES.KINGS_GRAND_RIDDLE]: 7
};

const TOTAL_PUZZLES = 8;

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.INTRODUCTION);
  const [puzzleHistory, setPuzzleHistory] = useState([]);
  const [completedPuzzles, setCompletedPuzzles] = useState(new Set());

  // Handle mobile viewport height issues
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Convert page to puzzle number (for stepper)
  const getCurrentPuzzleNumber = () => {
    return PAGE_TO_PUZZLE_NUMBER[currentPage] ?? -1;
  };

  const handlePuzzleComplete = () => {
    setPuzzleHistory(prev => [...prev, currentPage]);
    setCompletedPuzzles(prev => new Set([...prev, currentPage]));
    
    switch (currentPage) {
      case PAGES.INTRODUCTION:
        setCurrentPage(PAGES.CASTLE_GATE);
        break;
      case PAGES.CASTLE_GATE:
        setCurrentPage(PAGES.ROYAL_FEAST);
        break;
      case PAGES.ROYAL_FEAST:
        setCurrentPage(PAGES.CASTLE_CORRIDOR);
        break;
      case PAGES.CASTLE_CORRIDOR:
        setCurrentPage(PAGES.ENCHANTED_MAP);
        break;
      case PAGES.ENCHANTED_MAP:
        setCurrentPage(PAGES.ROSE_CORRIDOR);
        break;
      case PAGES.ROSE_CORRIDOR:
        setCurrentPage(PAGES.KNIGHTS_TALE);
        break;
      case PAGES.KNIGHTS_TALE:
        setCurrentPage(PAGES.LADYS_TREASURE_VAULT);
        break;
      case PAGES.LADYS_TREASURE_VAULT:
        setCurrentPage(PAGES.TWILIGHT_PASSAGE);
        break;
      case PAGES.TWILIGHT_PASSAGE:
        setCurrentPage(PAGES.MAGICAL_CARRIAGE);
        break;
      case PAGES.MAGICAL_CARRIAGE:
        setCurrentPage(PAGES.UNLIKELY_MEMORIES_BUFFER);
        break;
      case PAGES.UNLIKELY_MEMORIES_BUFFER:
        setCurrentPage(PAGES.CHANGING_ROOM_CAPERS);
        break;
      case PAGES.CHANGING_ROOM_CAPERS:
        setCurrentPage(PAGES.GRAND_FINALE_BUFFER);
        break;
      case PAGES.GRAND_FINALE_BUFFER:
        setCurrentPage(PAGES.KINGS_GRAND_RIDDLE);
        break;
      case PAGES.KINGS_GRAND_RIDDLE:
        // Show final thank you or celebration screen
        // For now, we'll keep them on the same page with the gift card revealed
        break;
      default:
        break;
    }
  };

  // Helper function to check if a puzzle is completed
  const isPuzzleCompleted = (page) => {
    return completedPuzzles.has(page);
  };

  const handleBack = (destination) => {
    if (typeof destination === 'string') {
      setCurrentPage(destination);
      return;
    }

    switch (currentPage) {
      case PAGES.ROYAL_FEAST:
        setCurrentPage(PAGES.CASTLE_GATE);
        break;
      case PAGES.CASTLE_CORRIDOR:
        setCurrentPage(PAGES.ROYAL_FEAST);
        break;
      case PAGES.ENCHANTED_MAP:
        setCurrentPage(PAGES.CASTLE_CORRIDOR);
        break;
      case PAGES.ROSE_CORRIDOR:
        setCurrentPage(PAGES.ENCHANTED_MAP);
        break;
      case PAGES.KNIGHTS_TALE:
        setCurrentPage(PAGES.ROSE_CORRIDOR);
        break;
      case PAGES.LADYS_TREASURE_VAULT:
        setCurrentPage(PAGES.KNIGHTS_TALE);
        break;
      case PAGES.TWILIGHT_PASSAGE:
        setCurrentPage(PAGES.LADYS_TREASURE_VAULT);
        break;
      case PAGES.MAGICAL_CARRIAGE:
        setCurrentPage(PAGES.TWILIGHT_PASSAGE);
        break;
      case PAGES.UNLIKELY_MEMORIES_BUFFER:
        setCurrentPage(PAGES.MAGICAL_CARRIAGE);
        break;
      case PAGES.CHANGING_ROOM_CAPERS:
        setCurrentPage(PAGES.UNLIKELY_MEMORIES_BUFFER);
        break;
      case PAGES.GRAND_FINALE_BUFFER:
        setCurrentPage(PAGES.CHANGING_ROOM_CAPERS);
        break;
      case PAGES.KINGS_GRAND_RIDDLE:
        setCurrentPage(PAGES.GRAND_FINALE_BUFFER);
        break;
      default:
        setCurrentPage(PAGES.INTRODUCTION);
    }
  };

  const handleStepperNavigate = (puzzleNumber) => {
    const currentNumber = getCurrentPuzzleNumber();
    if (puzzleNumber <= currentNumber) {
      switch (puzzleNumber) {
        case 0:
          setCurrentPage(PAGES.CASTLE_GATE);
          break;
        case 1:
          setCurrentPage(PAGES.ROYAL_FEAST);
          break;
        case 2:
          setCurrentPage(PAGES.ENCHANTED_MAP);
          break;
        case 3:
          setCurrentPage(PAGES.KNIGHTS_TALE);
          break;
        case 4:
          setCurrentPage(PAGES.LADYS_TREASURE_VAULT);
          break;
        case 5:
          setCurrentPage(PAGES.MAGICAL_CARRIAGE);
          break;
        case 6:
          setCurrentPage(PAGES.CHANGING_ROOM_CAPERS);
          break;
        case 7:
          setCurrentPage(PAGES.KINGS_GRAND_RIDDLE);
          break;
        default:
          break;
      }
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case PAGES.INTRODUCTION:
        return (
          <div className="medieval-container welcome-screen">
            <div className="welcome-content">
              <h1 className="medieval-title birthday-title">Happy Birthday Afra!</h1>
              
              <div className="medieval-scroll welcome-scroll">
                <div className="scroll-content">
                  <div className="heart-decoration">❦</div>
                  <p className="from-text">
                    From Your Beloved Future-Husband
                  </p>
                  <div className="message-content">
                    <p>
                      My dearest Afra, on this special day, I've created a magical journey just for you.
                      Beyond these castle gates lies a world of puzzles, memories, and surprises,
                      each one crafted with love and care, just like our story together.
                    </p>
                    <p>
                      As you venture through this enchanted castle, you'll discover pieces of our journey,
                      moments we've shared, and the beautiful future that awaits us.
                      Each puzzle holds a special meaning, a memory we cherish, or a dream we share.
                    </p>
                    <p>
                      Are you ready to begin this magical adventure?
                    </p>
                    <div className="hint-tip">
                      <span className="tip-icon">💡</span>
                      <p>
                        Throughout your journey, look for the floating hint icon (?) in the top-right corner.
                        It will guide you when you need help solving the puzzles.
                      </p>
                    </div>
                  </div>
                  <div className="heart-decoration">❦</div>
                </div>
              </div>

              <button className="medieval-button start-button" onClick={handlePuzzleComplete}>
                Begin Journey
              </button>
            </div>
          </div>
        );
      case PAGES.CASTLE_GATE:
        return (
          <CastleGatePuzzle 
            onComplete={handlePuzzleComplete} 
            onBack={() => setCurrentPage(PAGES.INTRODUCTION)}
            isComplete={isPuzzleCompleted(PAGES.CASTLE_GATE)}
          />
        );
      case PAGES.ROYAL_FEAST:
        return (
          <RoyalFeastPuzzle
            onComplete={handlePuzzleComplete}
            onBack={() => setCurrentPage(PAGES.CASTLE_GATE)}
            previousPuzzle={PAGES.CASTLE_GATE}
            isComplete={isPuzzleCompleted(PAGES.ROYAL_FEAST)}
          />
        );
      case PAGES.CASTLE_CORRIDOR:
        return (
          <div className="medieval-container corridor-screen">
            <div className="corridor-background">
              <CastleCorridorScene className="corridor-scene" />
            </div>
            <div className="welcome-content">
              <BackButton onBack={() => setCurrentPage(PAGES.ROYAL_FEAST)} />
              
              <div className="medieval-scroll welcome-scroll">
                <div className="scroll-content">
                  <div className="heart-decoration">❦</div>
                  <div className="message-content">
                    <p>
                      My dearest wife-to-be, you've dazzled everyone at the Royal Feast. 
                      Now, let us quietly walk through these dimly lit corridors. 
                      Ahead, we'll find a hidden library where an enchanted map may 
                      spark memories of our first grand adventure. Onward, my love!
                    </p>
                  </div>
                  <div className="heart-decoration">❦</div>
                </div>
              </div>

              <button className="medieval-button continue-button" onClick={handlePuzzleComplete}>
                Continue to the Next Puzzle
              </button>
            </div>
          </div>
        );
      case PAGES.ENCHANTED_MAP:
        return (
          <EnchantedMapPuzzle
            onComplete={handlePuzzleComplete}
            onBack={() => setCurrentPage(PAGES.CASTLE_CORRIDOR)}
            previousPuzzle={PAGES.CASTLE_CORRIDOR}
            isComplete={isPuzzleCompleted(PAGES.ENCHANTED_MAP)}
          />
        );
      case PAGES.ROSE_CORRIDOR:
        return (
          <RoseCorridorStory
            onComplete={handlePuzzleComplete}
            onBack={() => setCurrentPage(PAGES.ENCHANTED_MAP)}
            previousPuzzle={PAGES.ENCHANTED_MAP}
          />
        );
      case PAGES.KNIGHTS_TALE:
        return (
          <KnightsTalePuzzle
            onComplete={handlePuzzleComplete}
            onBack={() => setCurrentPage(PAGES.ROSE_CORRIDOR)}
            previousPuzzle={PAGES.ROSE_CORRIDOR}
            isComplete={isPuzzleCompleted(PAGES.KNIGHTS_TALE)}
          />
        );
      case PAGES.LADYS_TREASURE_VAULT:
        return (
          <LadysTreasureVault
            onComplete={() => {
              setCompletedPuzzles(prev => new Set([...prev, PAGES.LADYS_TREASURE_VAULT]));
              setCurrentPage(PAGES.TWILIGHT_PASSAGE);
            }}
            onBack={() => setCurrentPage(PAGES.KNIGHTS_TALE)}
            previousPuzzle={PAGES.KNIGHTS_TALE}
            isComplete={isPuzzleCompleted(PAGES.LADYS_TREASURE_VAULT)}
          />
        );
      case PAGES.TWILIGHT_PASSAGE:
        return (
          <TwilightPassage
            onComplete={() => {
              setCompletedPuzzles(prev => new Set([...prev, PAGES.TWILIGHT_PASSAGE]));
              setCurrentPage(PAGES.MAGICAL_CARRIAGE);
            }}
            onBack={() => setCurrentPage(PAGES.LADYS_TREASURE_VAULT)}
            previousPuzzle={PAGES.LADYS_TREASURE_VAULT}
          />
        );
      case PAGES.MAGICAL_CARRIAGE:
        return (
          <MagicalCarriageWorkshop
            onComplete={() => {
              setCompletedPuzzles(prev => new Set([...prev, PAGES.MAGICAL_CARRIAGE]));
              setCurrentPage(PAGES.UNLIKELY_MEMORIES_BUFFER);
            }}
            onBack={() => setCurrentPage(PAGES.TWILIGHT_PASSAGE)}
            previousPuzzle={PAGES.TWILIGHT_PASSAGE}
            isComplete={isPuzzleCompleted(PAGES.MAGICAL_CARRIAGE)}
          />
        );
      case PAGES.UNLIKELY_MEMORIES_BUFFER:
        return (
          <UnlikelyMemoriesBuffer
            onComplete={() => {
              setCompletedPuzzles(prev => new Set([...prev, PAGES.UNLIKELY_MEMORIES_BUFFER]));
              setCurrentPage(PAGES.CHANGING_ROOM_CAPERS);
            }}
            onBack={() => setCurrentPage(PAGES.MAGICAL_CARRIAGE)}
            previousPuzzle={PAGES.MAGICAL_CARRIAGE}
          />
        );
      case PAGES.CHANGING_ROOM_CAPERS:
        return (
          <ChangingRoomCapers
            onComplete={() => {
              setCompletedPuzzles(prev => new Set([...prev, PAGES.CHANGING_ROOM_CAPERS]));
              setCurrentPage(PAGES.GRAND_FINALE_BUFFER);
            }}
            onBack={() => setCurrentPage(PAGES.UNLIKELY_MEMORIES_BUFFER)}
            previousPuzzle={PAGES.UNLIKELY_MEMORIES_BUFFER}
            isComplete={isPuzzleCompleted(PAGES.CHANGING_ROOM_CAPERS)}
          />
        );
      case PAGES.GRAND_FINALE_BUFFER:
        return (
          <GrandFinaleBuffer
            onComplete={() => {
              setCompletedPuzzles(prev => new Set([...prev, PAGES.GRAND_FINALE_BUFFER]));
              setCurrentPage(PAGES.KINGS_GRAND_RIDDLE);
            }}
            onBack={() => setCurrentPage(PAGES.CHANGING_ROOM_CAPERS)}
            previousPuzzle={PAGES.CHANGING_ROOM_CAPERS}
          />
        );
      case PAGES.KINGS_GRAND_RIDDLE:
        return (
          <KingsGrandRiddle
            onComplete={() => {
              setCompletedPuzzles(prev => new Set([...prev, PAGES.KINGS_GRAND_RIDDLE]));
              // Show final thank you or celebration screen
              // For now, we'll keep them on the same page with the gift card revealed
            }}
            onBack={() => setCurrentPage(PAGES.GRAND_FINALE_BUFFER)}
            previousPuzzle={PAGES.GRAND_FINALE_BUFFER}
            isComplete={isPuzzleCompleted(PAGES.KINGS_GRAND_RIDDLE)}
          />
        );
      default:
        return null;
    }
  };

  // Show stepper for all pages except introduction
  const showStepper = currentPage !== PAGES.INTRODUCTION;

  return (
    <div className="App">
      {showStepper && (
        <PuzzleStepper
          currentPuzzle={getCurrentPuzzleNumber()}
          totalPuzzles={TOTAL_PUZZLES}
          onNavigate={handleStepperNavigate}
          completedPuzzles={completedPuzzles}
        />
      )}

      {renderCurrentPage()}

      <style jsx global>{`
        .App {
          min-height: 100vh;
          min-height: calc(var(--vh, 1vh) * 100);
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          background-color: var(--color-background);
          padding-top: ${showStepper ? '120px' : '0'};
        }

        .welcome-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(
            rgba(34, 34, 59, 0.9),
            rgba(34, 34, 59, 0.95)
          ),
          url('/images/castle-corridor.jpg') center/cover;
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
          padding: 30px;
        }

        .from-text {
          font-family: var(--font-medieval);
          font-size: 1.8rem;
          color: var(--color-wood);
          margin: 20px 0;
        }

        .message-content {
          font-size: 1.3rem;
          line-height: 1.7;
          margin: 20px 0;
        }

        .heart-decoration {
          font-size: 2.5rem;
          color: var(--color-wood);
          margin: 10px 0;
        }

        .start-button {
          font-size: 1.4rem;
          padding: 15px 30px;
          animation: float 3s ease-in-out infinite;
        }

        .continue-button {
          font-size: 1.4rem;
          padding: 15px 30px;
          animation: float 3s ease-in-out infinite;
          margin-top: 30px;
        }

        @keyframes glow {
          from { text-shadow: 0 0 10px var(--color-gold); }
          to { text-shadow: 0 0 20px var(--color-gold), 0 0 30px var(--color-gold); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .App {
            padding-top: ${showStepper ? '100px' : '0'};
          }

          .birthday-title {
            font-size: 2.5rem;
          }

          .from-text {
            font-size: 1.5rem;
          }

          .message-content {
            font-size: 1.2rem;
          }

          .start-button {
            font-size: 1.2rem;
            padding: 12px 24px;
          }
        }

        .hint-tip {
          margin-top: 20px;
          padding: 15px;
          background: rgba(255, 215, 0, 0.1);
          border-radius: var(--radius-medium);
          border: 2px solid var(--color-gold);
        }

        .tip-icon {
          font-size: 1.5rem;
          margin-right: 10px;
          vertical-align: middle;
        }

        .hint-tip p {
          display: inline;
          color: var(--color-wood);
          font-style: italic;
        }

        @media (max-width: 480px) {
          .hint-tip {
            padding: 12px;
            margin-top: 15px;
          }

          .tip-icon {
            font-size: 1.3rem;
          }
        }

        .corridor-screen {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden;
        }

        .corridor-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .corridor-scene {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .welcome-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 600px;
          text-align: center;
        }

        .welcome-scroll {
          background: rgba(244, 228, 188, 0.95);
          backdrop-filter: blur(4px);
          margin-bottom: 30px;
          padding: 30px;
        }
      `}</style>
    </div>
  );
}

export default App;
