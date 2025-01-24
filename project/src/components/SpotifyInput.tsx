import React, { useState } from 'react';
import { Music } from 'lucide-react';

interface SpotifyInputProps {
  onSubmit: (id: string) => void;
}

const SpotifyInput: React.FC<SpotifyInputProps> = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const validateSpotifyId = (id: string) => {
    // Basic validation for Spotify ID format
    const regex = /^[0-9A-Za-z]{22}$/;
    return regex.test(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) {
      setError('Please enter a Spotify ID');
      return;
    }
    if (!validateSpotifyId(id)) {
      setError('Please enter a valid Spotify ID');
      return;
    }
    setError('');
    onSubmit(id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
      <div className="text-center mb-4">
        <div className="inline-block p-3 bg-green-50 rounded-full mb-2">
          <Music className="w-6 h-6 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Spotify ID</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Spotify track/playlist ID"
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              focus:outline-none focus:ring-2
              ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-100'}
            `}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg
            hover:bg-green-600 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          Process Track
        </button>
      </form>
    </div>
  );
}

export default SpotifyInput;