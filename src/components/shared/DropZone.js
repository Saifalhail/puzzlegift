import React from 'react';

const DropZone = ({ id, title, acceptedType, currentItem, onDrop, children }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      onDrop && onDrop(id, data);
    } catch (err) {
      console.error('Invalid drop data');
    }
  };

  return (
    <div
      className={`drop-zone ${currentItem ? 'filled' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="seat-title">{title}</div>
      <div className="drop-area">
        {children}
      </div>

      <style jsx>{`
        .drop-zone {
          width: 120px;
          min-height: 160px;
          background: var(--color-background);
          border: 2px solid var(--color-gold);
          border-radius: var(--radius-medium);
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow-medium);
          transition: all 0.3s ease;
        }

        .drop-zone:hover {
          box-shadow: var(--shadow-hard);
          transform: translateY(-2px);
        }

        .drop-zone.filled {
          border-color: var(--color-wood);
        }

        .seat-title {
          font-family: var(--font-medieval);
          color: var(--color-gold);
          font-size: 1.2rem;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .drop-area {
          flex: 1;
          width: 100%;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed var(--color-gold);
          border-radius: var(--radius-small);
          padding: 5px;
        }

        @media (max-width: 480px) {
          .drop-zone {
            width: 100px;
            min-height: 140px;
            padding: 8px;
          }

          .seat-title {
            font-size: 1rem;
          }

          .drop-area {
            min-height: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default DropZone; 