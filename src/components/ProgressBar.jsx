import { useState, useEffect } from 'react';

const ProgressBar = ({ 
  progress = 0, 
  variant = 'linear', 
  showPercentage = true, 
  animated = true,
  className = '',
  size = 'md'
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (variant === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        {showPercentage && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm font-medium text-white">{Math.round(displayProgress)}%</span>
          </div>
        )}
        <div className={`w-full bg-surface rounded-full overflow-hidden ${sizeClasses[size]}`}>
          <div
            className={`${getProgressColor(displayProgress)} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
            style={{ width: `${Math.max(0, Math.min(100, displayProgress))}%` }}
          >
            {animated && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Circular variant
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        className="transform -rotate-90 w-24 h-24"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="hsl(220, 20%, 15%)"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="hsl(217, 91%, 60%)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{Math.round(displayProgress)}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
