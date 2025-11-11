import React from 'react';
import type { UXReport } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { ReportCard } from './ReportCard';

// Icons
const CheckCircleIcon: React.FC<{className: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const LightBulbIcon: React.FC<{className: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.42 0-2.798.342-4.047.962a7.5 7.5 0 0 1-4.047-.962M12 15.75a3 3 0 0 1 3-3V4.5a3 3 0 1 0-6 0v8.25a3 3 0 0 1 3 3Z" />
  </svg>
);

const PerformanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const AccessibilityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const SeoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const DesignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const getScoreDescriptor = (score: number) => {
    if (score >= 90) return { text: 'Excellent', className: 'text-green-500' };
    if (score >= 70) return { text: 'Great', className: 'text-sky-500' };
    if (score >= 50) return { text: 'Good', className: 'text-yellow-500' };
    if (score >= 30) return { text: 'Needs Improvement', className: 'text-orange-500' };
    return { text: 'Poor', className: 'text-red-500' };
};

// Fix: Add props type definition for ReportDisplay component.
interface ReportDisplayProps {
  report: UXReport;
  url: string;
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, url }) => {
  const scoreDescriptor = getScoreDescriptor(report.overallScore);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="text-center animate-reveal">
        <p className="text-lg text-text-secondary">UX Report for:</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary hover:underline truncate inline-block max-w-full">{url}</a>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-2xl shadow-blue-500/10 animate-reveal">
          <h3 className="text-2xl font-bold mb-2 text-text-primary">Overall UX Score</h3>
          <ScoreGauge score={report.overallScore} />
          <p className={`text-2xl font-bold mt-2 ${scoreDescriptor.className}`}>{scoreDescriptor.text}</p>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
           <ReportCard title="Performance" score={report.performance.score} summary={report.performance.summary} icon={<PerformanceIcon />} animationDelay={100} />
           <ReportCard title="Accessibility" score={report.accessibility.score} summary={report.accessibility.summary} icon={<AccessibilityIcon />} animationDelay={200} />
           <ReportCard title="SEO" score={report.seo.score} summary={report.seo.summary} icon={<SeoIcon />} animationDelay={300} />
           <ReportCard title="Design" score={report.designConsistency.score} summary={report.designConsistency.summary} icon={<DesignIcon />} animationDelay={400} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-2xl shadow-blue-500/10 animate-reveal" style={{ animationDelay: '500ms' }}>
          <h3 className="text-xl font-bold flex items-center mb-4">
            <CheckCircleIcon className="w-7 h-7 mr-2 text-green-500" />
            Key Strengths
          </h3>
          <ul className="space-y-3">
            {report.strengths.map((item, index) => (
              <li key={index} className="flex items-start bg-green-500/10 p-3 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-2xl shadow-blue-500/10 animate-reveal" style={{ animationDelay: '600ms' }}>
          <h3 className="text-xl font-bold flex items-center mb-4">
            <LightBulbIcon className="w-7 h-7 mr-2 text-yellow-500" />
            Improvement Suggestions
          </h3>
          <ul className="space-y-3">
            {report.suggestions.map((item, index) => (
              <li key={index} className="flex items-start bg-yellow-500/10 p-3 rounded-lg">
                 <LightBulbIcon className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                 <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};