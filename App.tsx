import React, { useState, useCallback, useEffect } from 'react';
import { URLInputForm } from './components/URLInputForm';
import { Loader } from './components/Loader';
import { ReportDisplay } from './components/ReportDisplay';
import { Leaderboard } from './components/Leaderboard';
import { generateUXReport } from './services/geminiService';
import type { UXReport, LeaderboardEntry } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [report, setReport] = useState<UXReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/leaderboard.csv');
        if (!response.ok) {
          throw new Error('Could not fetch leaderboard data.');
        }
        const csvText = await response.text();
        const entries: LeaderboardEntry[] = csvText
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => {
            const parts = line.split(',');
            if (parts.length < 3) return null; // Basic validation
            const [url, scoreStr, analyzedAt] = parts;
            const overallScore = parseInt(scoreStr, 10);
            if (isNaN(overallScore)) return null; // Score must be a number
            return { url, overallScore, analyzedAt };
          }).filter((entry): entry is LeaderboardEntry => entry !== null);
        
        const sortedLeaderboard = entries.sort((a, b) => b.overallScore - a.overallScore);
        setLeaderboard(sortedLeaderboard);
      } catch (e) {
        console.error("Failed to load or parse leaderboard.csv", e);
        // Silently fail or set an error state if leaderboard is critical
      }
    };

    fetchLeaderboard();
  }, []);

  const updateLeaderboard = (analyzedUrl: string, score: number) => {
    const newEntry: LeaderboardEntry = {
      url: analyzedUrl,
      overallScore: score,
      analyzedAt: new Date().toISOString(),
    };
    
    // NOTE: This updates the leaderboard for the current session only.
    // To make these changes persistent for all users, a backend service is required.
    // The frontend would send a POST request to an API endpoint,
    // and the server would handle writing the new entry to the leaderboard.csv file.

    setLeaderboard(prevLeaderboard => {
        const updatedLeaderboard = [...prevLeaderboard];
        const existingEntryIndex = updatedLeaderboard.findIndex(entry => entry.url === analyzedUrl);

        if (existingEntryIndex > -1) {
            if (updatedLeaderboard[existingEntryIndex].overallScore < score) {
                updatedLeaderboard[existingEntryIndex] = newEntry;
            } else {
                 updatedLeaderboard[existingEntryIndex].analyzedAt = newEntry.analyzedAt;
            }
        } else {
            updatedLeaderboard.push(newEntry);
        }

        const sortedLeaderboard = updatedLeaderboard
            .sort((a, b) => b.overallScore - a.overallScore)
            .slice(0, 10);

        return sortedLeaderboard;
    });
  };

  const handleAnalyze = useCallback(async (newUrl: string) => {
    if (!newUrl) {
      setError('Please enter a valid URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReport(null);
    setUrl(newUrl);

    try {
      const generatedReport = await generateUXReport(newUrl);
      setReport(generatedReport);
      updateLeaderboard(newUrl, generatedReport.overallScore);
    } catch (err) {
      console.error(err);
      setError('Failed to generate report. Please check the URL or try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setUrl('');
    setReport(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-light text-text-primary font-sans antialiased relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 lg:w-96 lg:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 lg:w-96 lg:h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 lg:w-96 lg:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>
      
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <svg className="w-8 h-8 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a6.375 6.375 0 0 0 6.375-6.375V12a6.375 6.375 0 0 0-6.375-6.375S5.625 5.625 5.625 12v.001A6.375 6.375 0 0 0 12 18.375Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 0 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            </svg>
            <h1 className="text-2xl font-bold text-brand-primary">UXScope</h1>
          </div>
          {report && (
             <button
              onClick={handleReset}
              className="px-5 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105"
            >
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 relative z-10">
        {!report && !isLoading && (
          <>
            <div className="text-center max-w-3xl mx-auto animate-fade-in pt-12 md:pt-16 pb-16 md:pb-20">
              <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary mb-6">
                Instant UX Audit
              </h2>
              <p className="text-lg md:text-xl text-text-secondary mb-10">
                Uncover insights. Elevate your website. Get an AI-powered analysis of any site's performance, accessibility, and design in seconds.
              </p>
              <URLInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>
            {leaderboard.length > 0 && <Leaderboard entries={leaderboard} />}
          </>
        )}
        
        {isLoading && <Loader />}
        
        {error && !isLoading && (
           <div className="text-center max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button onClick={handleReset} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Try again</button>
          </div>
        )}

        {report && !isLoading && (
          <ReportDisplay report={report} url={url} />
        )}
      </main>
      
      <footer className="text-center py-6 text-sm text-text-secondary relative z-10">
        <p>&copy; {new Date().getFullYear()} UXScope. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;