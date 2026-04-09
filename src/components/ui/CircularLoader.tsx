'use client';

import React from 'react';
import { useProgress } from '@react-three/drei';

interface CircularLoaderProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  className?: string;
}

/**
 * CircularLoader
 * A reusable circular progress component that automatically tracks
 * Three.js asset loading progress.
 */
export const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 120,
  strokeWidth = 8,
  color = '#f59e0b', // amber-500
  backgroundColor = '#27272a', // zinc-800
  showText = true,
  className = '',
}) => {
  const { progress, active } = useProgress();
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!active && progress === 100) {
      // Small delay for smooth transition
      const timeout = setTimeout(() => setIsLoaded(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  if (isLoaded) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`fixed inset-0 bg-zinc-950 flex items-center justify-center z-[100] transition-opacity duration-500 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG Circle Container */}
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.3s ease-out'
            }}
            strokeLinecap="round"
          />
        </svg>

        {/* Percentage Text in Center */}
        {showText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold tabular-nums" style={{ color }}>
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
