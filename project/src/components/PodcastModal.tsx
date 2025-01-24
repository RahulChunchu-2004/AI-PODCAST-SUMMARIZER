import React from 'react';
import { X, Clock, Tag, FileText, BookOpen } from 'lucide-react';

interface Podcast {
  title: string;
  summary: string;
  transcription: string;
  keywords: string[];
  duration: string;
}

interface PodcastModalProps {
  podcast: Podcast | null;
  onClose: () => void;
  isOpen: boolean;
}

export function PodcastModal({ podcast, onClose, isOpen }: PodcastModalProps) {
  if (!podcast || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-white pr-8">{podcast.title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-white/80">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{podcast.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-8rem)]">
          <div className="p-6 space-y-6">
            {/* Summary Section */}
            <section>
              <div className="flex items-center gap-2 text-indigo-600 mb-3">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-semibold">Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {podcast.summary}
              </p>
            </section>

            {/* Keywords Section */}
            <section>
              <div className="flex items-center gap-2 text-indigo-600 mb-3">
                <Tag className="w-5 h-5" />
                <h3 className="font-semibold">Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {podcast.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>

            {/* Transcription Section */}
            <section>
              <div className="flex items-center gap-2 text-indigo-600 mb-3">
                <FileText className="w-5 h-5" />
                <h3 className="font-semibold">Transcription</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed">
                {podcast.transcription}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}