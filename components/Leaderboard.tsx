import React from 'react';
import type { LeaderboardEntry } from '../types';

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `just now`;

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  
  return Math.floor(seconds) + " seconds ago";
}

const Rank: React.FC<{ rank: number }> = ({ rank }) => {
  const rankClasses = [
    'text-yellow-400 font-extrabold', // 1st
    'text-slate-400 font-bold',     // 2nd
    'text-orange-400 font-semibold',  // 3rd
  ];
  const className = rankClasses[rank - 1] || 'text-slate-500 font-medium';

  const MedalIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.927 0l-7.5 4.25a.75.75 0 0 0 0 1.332l7.5 4.25a.75.75 0 0 0 1.927 0l7.5-4.25a.75.75 0 0 0 0-1.332l-7.5-4.25ZM11.25 12.332v6.167l-5.25-2.981V9.351l5.25 2.981Zm1.5 0 5.25-2.981v6.167l-5.25 2.981V12.332Z" clipRule="evenodd" />
    </svg>
  );

  if (rank <= 3) {
    return (
        <div className="flex items-center justify-center w-12 flex-shrink-0">
            <MedalIcon className={`w-8 h-8 ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-slate-400' : 'text-orange-400'}`} />
        </div>
    )
  }

  return (
    <div className={`text-xl ${className} w-12 text-center flex-shrink-0`}>
      {rank}
    </div>
  );
};


const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
    const getScoreColor = (value: number) => {
        if (value >= 90) return 'bg-green-100 text-green-800 ring-green-200';
        if (value >= 70) return 'bg-sky-100 text-sky-800 ring-sky-200';
        if (value >= 50) return 'bg-yellow-100 text-yellow-800 ring-yellow-200';
        if (value >= 30) return 'bg-orange-100 text-orange-800 ring-orange-200';
        return 'bg-red-100 text-red-800 ring-red-200';
    };

    return (
        <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold ring-4 ${getScoreColor(score)}`}>
            {score}
        </div>
    );
}

export const Leaderboard: React.FC<{ entries: LeaderboardEntry[] }> = ({ entries }) => {
  return (
    <section className="max-w-4xl mx-auto animate-reveal" style={{animationDelay: '400ms'}}>
      <h3 className="text-3xl font-bold text-center mb-8 text-text-primary">Top Audits Leaderboard</h3>
      <div className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-2xl shadow-blue-500/10">
        <ul className="space-y-4">
          {entries.map((entry, index) => (
            <li 
              key={`${entry.url}-${index}`} 
              className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{ animation: 'slideUp 0.5s ease-out forwards', animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
              <Rank rank={index + 1} />
              <div className="flex-grow min-w-0">
                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary truncate hover:underline" title={entry.url}>
                  {entry.url}
                </a>
                <p className="text-sm text-text-secondary">{timeAgo(entry.analyzedAt)}</p>
              </div>
              <ScoreCircle score={entry.overallScore} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};