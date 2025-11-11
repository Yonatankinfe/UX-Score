
export interface ScoreCategory {
  score: number;
  summary: string;
}

export interface UXReport {
  overallScore: number;
  performance: ScoreCategory;
  accessibility: ScoreCategory;
  seo: ScoreCategory;
  designConsistency: ScoreCategory;
  strengths: string[];
  suggestions: string[];
}

export interface LeaderboardEntry {
  url: string;
  overallScore: number;
  analyzedAt: string; // ISO string
}
