import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Initializing UX analysis...",
  "Evaluating performance metrics...",
  "Scanning for accessibility issues...",
  "Assessing design consistency...",
  "Checking SEO best practices...",
  "Compiling your report..."
];

export const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-in py-16">
      <div className="relative w-28 h-28">
         <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Background track */}
            <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e0f2fe"
                strokeWidth="8"
                fill="none"
            />
            
            {/* Animated spinner arc */}
            <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="210" /* Approx 3/4 of circumference */
                className="animate-spin"
                style={{ animationDuration: '1.5s', transformOrigin: '50% 50%' }}
            />

            {/* Center pulsing dot to represent focus/processing */}
            <circle
                cx="50"
                cy="50"
                r="12"
                fill="url(#gradient)"
                className="animate-pulse"
                style={{ animationDuration: '2.5s' }}
            />

            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
            </defs>
        </svg>
      </div>
      <p className="text-xl font-semibold text-brand-secondary transition-all duration-500 w-64">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};