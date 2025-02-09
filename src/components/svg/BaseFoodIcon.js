import React from 'react';

const BaseFoodIcon = ({ children, className = '', size = 80 }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`food-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      {children}
      
      <style jsx>{`
        .food-icon {
          filter: url(#shadow);
          transition: transform 0.3s ease;
        }
        
        .food-icon:hover {
          transform: scale(1.1);
        }
      `}</style>
    </svg>
  );
};

export default BaseFoodIcon; 