import React, { useState } from 'react';

interface URLInputFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const URLInputForm: React.FC<URLInputFormProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAnalyze(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="relative flex items-center bg-white rounded-full shadow-2xl shadow-blue-500/10 p-2 focus-within:ring-4 focus-within:ring-brand-primary/20 transition-all duration-300">
        <div className="pl-3">
          <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="e.g. https://www.example.com"
          className="w-full px-4 py-3 text-lg text-gray-700 placeholder-gray-500 bg-transparent focus:outline-none"
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-brand-secondary to-brand-primary text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
};