import React from 'react';

interface ReportCardProps {
  title: string;
  score: number;
  summary: string;
  icon: React.ReactNode;
  animationDelay: number;
}

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

export const ReportCard: React.FC<ReportCardProps> = ({ title, score, summary, icon, animationDelay }) => {
  return (
    <div 
      className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-2xl shadow-blue-500/10 flex flex-col space-y-4 animate-reveal transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-brand-secondary to-brand-primary p-2 rounded-lg text-white shadow-lg">
            {icon}
          </div>
          <h4 className="text-lg font-bold text-text-primary">{title}</h4>
        </div>
        <ScoreCircle score={score} />
      </div>
      <p className="text-text-secondary text-sm flex-grow">{summary}</p>
    </div>
  );
};