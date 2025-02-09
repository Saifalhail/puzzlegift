import React from 'react';

const DraggableItem = ({ id, type, isLocked, onDragStart, children }) => {
  const handleDragStart = (e) => {
    if (isLocked) return;
    e.dataTransfer.setData('text/plain', JSON.stringify({ id, type }));
    onDragStart && onDragStart(id);
  };

  return (
    <div
      className={`draggable-item ${isLocked ? 'locked' : ''}`}
      draggable={!isLocked}
      onDragStart={handleDragStart}
    >
      {children}

      <style jsx>{`
        .draggable-item {
          width: 80px;
          height: 80px;
          cursor: grab;
          transition: all 0.3s ease;
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-medium);
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-medium);
        }

        .draggable-item:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-hard);
        }

        .draggable-item.locked {
          cursor: default;
          opacity: 0.6;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 480px) {
          .draggable-item {
            width: 60px;
            height: 60px;
            padding: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default DraggableItem; 