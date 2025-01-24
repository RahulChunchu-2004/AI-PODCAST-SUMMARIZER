import React, { useState } from 'react';
import { Youtube } from 'lucide-react';

interface YoutubeInputProps {
  onSubmit: (url: string) => void;
}

const YoutubeInput: React.FC<YoutubeInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateYoutubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    if (!validateYoutubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    setError('');
    onSubmit(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
      <div className="text-center mb-4">
        <div className="inline-block p-3 bg-red-50 rounded-full mb-2">
          <Youtube className="w-6 h-6 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">YouTube Link</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL here"
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              focus:outline-none focus:ring-2
              ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-red-100'}
            `}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg
            hover:bg-red-600 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          Process Video
        </button>
      </form>
    </div>
  );
}

export default YoutubeInput;