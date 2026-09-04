import React from 'react';

interface SparklineProps {
  color: string;
  data: number[];
}

export const Sparkline: React.FC<SparklineProps> = ({ color, data }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const width = 60;
  const height = 20;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible opacity-80">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={color}
        style={{ filter: 'drop-shadow(0px 2px 4px currentColor)' }}
      />
    </svg>
  );
};
