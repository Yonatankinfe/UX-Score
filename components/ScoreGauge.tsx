import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const getScoreColor = (value: number) => {
    if (value >= 90) return '#10b981'; // Green-500
    if (value >= 70) return '#0ea5e9'; // Sky-500
    if (value >= 50) return '#f59e0b'; // Amber-500
    if (value >= 30) return '#f97316'; // Orange-500
    return '#ef4444'; // Red-500
  };

  const color = getScoreColor(score);
  const data = [{ name: 'score', value: score, fill: color }];

  return (
    <div className="w-48 h-48 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
          barSize={15}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: '#e0f2fe' }}
            dataKey="value"
            cornerRadius={10}
            angleAxisId={0}
            data={data}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-extrabold" style={{ color: color }}>
          {score}
        </span>
      </div>
    </div>
  );
};