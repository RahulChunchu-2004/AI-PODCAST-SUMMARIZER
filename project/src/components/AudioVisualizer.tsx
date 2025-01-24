import React from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying }) => {
  return (
    <div className="flex items-center justify-around h-full w-full px-2">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 bg-white/40 rounded-full transform transition-transform ${
            isPlaying ? 'animate-wave' : 'scale-y-[0.3]'
          }`}
          style={{
            height: '100%',
            animationDelay: `${i * 0.05}s`
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;