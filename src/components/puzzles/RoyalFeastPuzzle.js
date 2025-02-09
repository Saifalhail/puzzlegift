import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import DraggableItem from '../shared/DraggableItem';
import DropZone from '../shared/DropZone';
import Sparkles from '../shared/Sparkles';
import SoundManager from '../../utils/SoundManager';
import BurgerIcon from '../svg/BurgerIcon';
import SashimiIcon from '../svg/SashimiIcon';
import TurkeyLegIcon from '../svg/TurkeyLegIcon';
import BreadCheeseIcon from '../svg/BreadCheeseIcon';
import MeadIcon from '../svg/MeadIcon';
import Portraits from '../svg/Portraits';
import '../../themes/medieval.css';
import RiddleMessage from '../shared/RiddleMessage';
import ScrollIndicator from '../shared/ScrollIndicator';

const ITEMS = {
  MEAD: { id: 'mead', type: 'drink', Icon: MeadIcon },
  SASHIMI: { id: 'sashimi', type: 'food', Icon: SashimiIcon },
  TURKEY: { id: 'turkey', type: 'food', Icon: TurkeyLegIcon },
  BREAD: { id: 'bread', type: 'food', Icon: BreadCheeseIcon },
  BURGER: { id: 'burger', type: 'food', Icon: BurgerIcon },
};

const SEATS = {
  HUSBAND: { 
    id: 'husband', 
    title: 'Husband', 
    accepts: ['burger'],
    Portrait: Portraits.Husband
  },
  WIFE: { 
    id: 'wife', 
    title: 'You', 
    accepts: ['sashimi'],
    Portrait: Portraits.Wife
  },
  KNIGHT: { 
    id: 'knight', 
    title: 'Knight', 
    accepts: ['turkey'],
    Portrait: Portraits.Knight
  },
  DUCHESS: { 
    id: 'duchess', 
    title: 'Duchess', 
    accepts: ['bread'],
    Portrait: Portraits.Duchess
  },
  WIZARD: { 
    id: 'wizard', 
    title: 'Wizard', 
    accepts: ['mead'],
    Portrait: Portraits.Wizard
  },
};

const RoyalFeastPuzzle = ({ onComplete, onBack, previousPuzzle, isComplete: initialIsComplete = false }) => {
  const [seatItems, setSeatItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [errorMessage, setErrorMessage] = useState('');

  const puzzleHint = "Remember: Your husband loves burgers, while you prefer sashimi. The Knight favors turkey leg, the Duchess enjoys bread, and the Wizard seeks mead!";

  useEffect(() => {
    SoundManager.startBackgroundMusic();
    return () => SoundManager.stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (initialIsComplete) {
      const completedState = {
        husband: [ITEMS.BURGER],
        wife: [ITEMS.SASHIMI],
        knight: [ITEMS.TURKEY],
        duchess: [ITEMS.BREAD],
        wizard: [ITEMS.MEAD]
      };
      setSeatItems(completedState);
      setIsComplete(true);
      setShowSuccess(true);
    }
  }, [initialIsComplete]);

  const handleItemClick = (item) => {
    if (isComplete) return;
    
    try {
      SoundManager.play('click');
      setSelectedItem(selectedItem?.id === item.id ? null : item);
      setErrorMessage('');
    } catch (error) {
      console.error('Error handling item click:', error);
    }
  };

  const getSeatItems = (seatId) => {
    return seatItems[seatId.toLowerCase()] || [];
  };

  const canAddItemToSeat = (seat, item) => {
    if (!seat || !item) return false;
    
    try {
      const currentItems = getSeatItems(seat.id);
      const maxItems = seat.maxItems || 1;
      
      // Check if seat is full
      if (currentItems.length >= maxItems) {
        return false;
      }

      // Check if item is accepted
      if (!seat.accepts.includes(item.id)) {
        return false;
      }
      
      // Check if item is already in the seat
      return !currentItems.some(existingItem => existingItem.id === item.id);
    } catch (error) {
      console.error('Error in canAddItemToSeat:', error);
      return false;
    }
  };

  const handleSeatClick = (seatId) => {
    if (isComplete) return;
    if (!selectedItem) return;

    try {
      const seat = SEATS[seatId.toUpperCase()];
      if (!seat) {
        console.error('Invalid seat:', seatId);
        return;
      }

      const currentItems = getSeatItems(seatId);

      if (canAddItemToSeat(seat, selectedItem)) {
        SoundManager.play('click');
        
        const updatedItems = [...currentItems, selectedItem];
        
        setSeatItems(prev => {
          const newState = {
            ...prev,
            [seatId]: updatedItems
          };
          
          // Check completion in the next tick
          setTimeout(() => {
            const allSeatsCorrect = Object.entries(SEATS).every(([id, seat]) => {
              const items = newState[id.toLowerCase()] || [];
              return items.length === 1 && seat.accepts.includes(items[0].id);
            });

            if (allSeatsCorrect && !showSuccess) {
              setShowSparkles(true);
              SoundManager.play('success');
              setTimeout(() => {
                setShowSuccess(true);
                setIsComplete(true);
              }, 1000);
            }
          }, 0);
          
          return newState;
        });
        
        setSelectedItem(null);
        setErrorMessage('');
      } else {
        SoundManager.play('error');
        const isFull = currentItems.length >= 1;
        const isWrongItem = !seat.accepts.includes(selectedItem.id);
        const isDuplicate = currentItems.some(item => item.id === selectedItem.id);
        
        let errorMsg = 'This item cannot be placed here.';
        if (isFull) {
          errorMsg = `${seat.title}'s seat already has an item!`;
        } else if (isWrongItem) {
          errorMsg = `This item doesn't belong in ${seat.title}'s seat!`;
        } else if (isDuplicate) {
          errorMsg = 'This item is already placed here!';
        }
        
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error('Error in handleSeatClick:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleContinue = () => {
    onComplete && onComplete();
  };

  const renderItem = (item, isLocked = false, isSelected = false) => {
    const IconComponent = item.Icon;
    return (
      <div className={`item-wrapper ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}>
        <IconComponent size={isLocked ? 60 : 80} />
      </div>
    );
  };

  const renderSeatContent = (seatId, seat) => {
    try {
      const items = getSeatItems(seatId);
      const item = items[0];
      const isEmpty = !item;
      const PortraitComponent = seat.Portrait;
      
      return (
        <div className="seat-content">
          <div className="portrait-container">
            <PortraitComponent size={50} />
          </div>
          <div 
            className={`item-slot ${isEmpty && selectedItem ? 'highlight' : ''} ${item ? 'filled' : ''}`}
          >
            {item && (
              <div className="placed-item">
                {renderItem(ITEMS[item.id.toUpperCase()], true)}
              </div>
            )}
          </div>
        </div>
      );
    } catch (error) {
      console.error('Error in renderSeatContent:', error);
      return null;
    }
  };

  return (
    <div className="medieval-container">
      <Header 
        onBack={onBack}
        hint={puzzleHint}
        previousPuzzle={previousPuzzle}
      />

      <h1 className="medieval-title">The Royal Feast</h1>

      <div className="banquet-hall">
        <div className="table-section">
          <div className="seats-container">
            {Object.entries(SEATS).map(([id, seat]) => (
              <div
                key={id}
                className="seat-zone"
                onClick={() => handleSeatClick(id.toLowerCase())}
              >
                <div className="seat-title">{seat.title}</div>
                {renderSeatContent(id, seat)}
                <Sparkles active={showSparkles} />
              </div>
            ))}
          </div>
        </div>

        {showSuccess && (
          <div className="feast-success-message">
            <p className="success-text">
              A feast fit for royalty! You've arranged the perfect meal for everyone.
              Let us take a stroll through the castle corridors to continue our journey.
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

        {!isComplete && (
          <div className="items-tray">
            {Object.values(ITEMS).map(item => {
              const isUsed = Object.values(seatItems).flat().some(
                seatItem => seatItem && seatItem.id === item.id
              );
              if (!isUsed) {
                return (
                  <div
                    key={item.id}
                    className="item-button"
                    onClick={() => handleItemClick(item)}
                  >
                    {renderItem(item, false, selectedItem?.id === item.id)}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {!isComplete && (
        <div className="instructions-section">
          <RiddleMessage 
            riddle={`
              Your husband craves modern fare with zest,
              While sashimi suits you best.
              The Knight yearns for a leg of meat to feast,
              The Duchess favors bread, a simple treat.
              And the Wizard seeks mead, a magical drink indeed!
            `}
            instructions={[
              "1. Click any food or drink item to select it (it will glow red)",
              "2. Empty slots will highlight when you have an item selected",
              "3. Click a highlighted slot to place the item",
              "4. Match each guest with their preferred food"
            ]}
          />
        </div>
      )}

      <div className="scroll-indicator-wrapper">
        <ScrollIndicator text="Scroll for instructions" />
      </div>

      <style jsx>{`
        .medieval-title {
          text-align: center;
          margin: 20px auto;
          transform: translateX(-20px);
        }

        .banquet-hall {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
        }

        .instruction-scroll {
          max-width: 600px;
          margin: 10px auto;
          padding: 12px;
          text-align: center;
        }

        .instruction-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .main-instruction {
          font-size: 1.4rem;
          color: var(--color-wood);
          margin: 0;
          font-family: var(--font-medieval);
        }

        .mechanics-guide {
          background: rgba(74, 78, 105, 0.9);
          border-radius: var(--radius-medium);
          padding: 8px;
          border: 1px solid var(--color-gold);
        }

        .mechanics-title {
          font-size: 1.1rem;
          color: var(--color-gold);
          margin: 0 0 4px 0;
          font-family: var(--font-medieval);
        }

        .mechanics-steps {
          margin: 0;
          padding-left: 20px;
          font-size: 0.9rem;
          color: var(--color-text);
          text-align: left;
        }

        .mechanics-steps li {
          margin: 2px 0;
        }

        .highlight-text {
          color: var(--color-gold);
        }

        .table-section {
          position: relative;
          background: linear-gradient(
            rgba(74, 78, 105, 0.9),
            rgba(34, 34, 59, 0.95)
          );
          border-radius: var(--radius-large);
          padding: 30px;
          box-shadow: var(--shadow-hard);
          width: 100%;
        }

        .seats-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin: 0 auto;
          max-width: 800px;
        }

        .seat-zone {
          width: 120px;
          padding: 10px;
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-medium);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow-medium);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .seat-zone:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hard);
        }

        .seat-title {
          font-family: var(--font-medieval);
          color: var(--color-gold);
          font-size: 1.2rem;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .seat-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .item-slot {
          width: 70px;
          height: 70px;
          border: 2px dashed var(--color-gold);
          border-radius: var(--radius-small);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          background: rgba(0, 0, 0, 0.2);
        }

        .item-slot.highlight {
          border-color: var(--color-torch);
          box-shadow: 0 0 15px var(--color-torch);
          animation: pulse 1.5s infinite;
        }

        .item-slot.filled {
          border-style: solid;
          background: rgba(139, 69, 19, 0.1);
          opacity: 1 !important;
        }

        .items-tray {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          padding: 15px;
          background: var(--color-primary);
          border-radius: var(--radius-medium);
          box-shadow: var(--shadow-medium);
        }

        .item-button {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .item-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-medium);
          padding: 8px;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-medium);
        }

        .item-wrapper.selected {
          border-color: var(--color-torch);
          box-shadow: 0 0 15px var(--color-torch);
          transform: scale(1.1);
        }

        .item-wrapper.locked {
          opacity: 1;
          cursor: default;
          transform: none;
          box-shadow: none;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 15px var(--color-torch); }
          50% { box-shadow: 0 0 25px var(--color-torch); }
          100% { box-shadow: 0 0 15px var(--color-torch); }
        }

        @media (max-width: 768px) {
          .banquet-hall {
            padding: 10px;
            gap: 20px;
          }

          .table-section {
            padding: 20px;
          }

          .seats-container {
            gap: 15px;
          }

          .items-tray {
            gap: 10px;
            padding: 10px;
          }

          .seat-zone {
            width: 100px;
            min-height: 140px;
          }

          .item-wrapper {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .instruction-scroll {
            margin: 8px auto;
            padding: 10px;
          }

          .main-instruction {
            font-size: 1.2rem;
          }

          .mechanics-title {
            font-size: 1rem;
          }

          .mechanics-steps {
            font-size: 0.85rem;
          }

          .item-slot {
            width: 50px;
            height: 50px;
          }

          .error-message {
            font-size: 1rem;
            padding: 6px;
            margin: 8px auto;
          }

          .medieval-title {
            transform: translateX(-10px);
          }

          .banquet-hall {
            padding: 10px;
          }

          .feast-success-message {
            padding: 15px 20px;
          }

          .feast-success-message .success-text {
            font-size: 1.2rem;
          }
        }

        .error-message {
          background: rgba(255, 69, 0, 0.2);
          color: var(--color-torch);
          padding: 8px;
          border-radius: var(--radius-medium);
          text-align: center;
          margin: 10px auto;
          max-width: 600px;
          font-family: var(--font-medieval);
          font-size: 1.1rem;
          border: 1px solid var(--color-torch);
        }

        .feast-success-message {
          width: 100%;
          background: linear-gradient(
            45deg,
            var(--color-gold),
            #ffd700,
            #ffed4a
          );
          padding: 20px 30px;
          border-radius: var(--radius-medium);
          text-align: center;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          border: 3px solid var(--color-wood);
        }

        .feast-success-message .success-text {
          font-size: 1.4rem;
          line-height: 1.4;
          color: var(--color-background);
          font-family: var(--font-medieval);
          margin-bottom: 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          padding: 0 10px;
        }

        .feast-success-message .continue-button {
          font-size: 1.2rem;
          padding: 12px 24px;
          background: var(--color-background);
          color: var(--color-gold);
          border: 2px solid var(--color-wood);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .feast-success-message .continue-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(139, 69, 19, 0.4);
        }

        .instructions-section {
          max-width: 800px;
          margin: 20px auto;
          padding: 0 20px;
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

        @media (max-width: 480px) {
          .instructions-section {
            padding: 0 10px;
            margin: 15px auto;
          }

          .scroll-indicator-wrapper {
            bottom: 10px;
            right: 10px;
          }

          .feast-success-message {
            padding: 15px 20px;
          }

          .feast-success-message .success-text {
            font-size: 1.2rem;
            padding: 0 5px;
          }
        }

        .placed-item {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          opacity: 1 !important;
        }

        .portrait-container {
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default RoyalFeastPuzzle; 