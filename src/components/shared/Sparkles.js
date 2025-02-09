import React, { useState, useEffect } from 'react';

const Sparkle = ({ style }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    style={{
      position: 'absolute',
      ...style,
    }}
  >
    <path
      d="M10 0L13.09 6.91L20 10L13.09 13.09L10 20L6.91 13.09L0 10L6.91 6.91L10 0Z"
      fill="var(--color-gold)"
      opacity="0.8"
    />
  </svg>
);

const Sparkles = ({ active }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (!active) {
      setSparkles([]);
      return;
    }

    const createSparkle = () => ({
      id: Math.random(),
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `sparkle ${1 + Math.random()}s linear forwards`,
      },
    });

    const interval = setInterval(() => {
      setSparkles(current => [...current, createSparkle()]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {sparkles.map(sparkle => (
        <Sparkle key={sparkle.id} style={sparkle.style} />
      ))}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Sparkles; 