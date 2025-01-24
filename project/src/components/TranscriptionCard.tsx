import React from 'react';

interface TranscriptionCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const TranscriptionCard: React.FC<TranscriptionCardProps> = ({
  title,
  content,
  icon,
}) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-indigo-600 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 line-clamp-4 leading-relaxed">{content}</p>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View Full Content
        </button>
      </div>
    </div>
  );
};

export default TranscriptionCard;