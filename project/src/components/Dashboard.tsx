import React, { useState,FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut,Music2, Save,Upload,  Youtube } from 'lucide-react';
import FloatingDock from './FloatingDock';
import { FaYoutube, FaSpotify, FaUpload } from 'react-icons/fa'; 

interface User {
  result?: {
    id: string;
  };
}

interface DashboardProps {
  user: User;
  setUser: (user: User | string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const [isDockExpanded, setIsDockExpanded] = useState<boolean>(false);

  const navigate = useNavigate();


  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    localStorage.clear();
    setUser('');
    navigate('/');
  };


  const dockItems = [
    {
      icon: <Upload className="w-6 h-6" />,
      label: 'Upload File',
      onClick: () => navigate('/upload'),
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      label: 'YouTube',
      onClick: () => navigate('/youtubeSummarizer'),
    },
    {
      icon: <Music2 className="w-6 h-6" />,
      label: 'Spotify',
      nClick: () => navigate('/spotify'),
    },
    {
      icon: <Save className="w-6 h-6" />,
      label: 'Saved podcast',
      onClick: () => navigate('/saved-podcasts'),
    },
    {
      icon: <LogOut className="w-6 h-6" />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const AudioUpload = ({ onUpload }: { onUpload: (file: File) => void }) => {
    const navigate = useNavigate();
    return (
      <div
        onClick={() => navigate('/upload')}
        className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
      >
        <FaUpload className="text-4xl text-gray-700 mb-3" />
        <p className="text-center text-sm font-semibold text-gray-700">Upload Audio</p>
      </div>
    );
  };
  
  const YoutubeInput = ({ onSubmit }: { onSubmit: (url: string) => void }) => {
    const navigate = useNavigate();
    return (
      <div
        onClick={() => navigate('/youtubeSummarizer')}
        className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
      >
        <FaYoutube className="text-4xl text-red-600 mb-3" />
        <p className="text-center text-sm font-semibold text-gray-700">YouTube Input</p>
      </div>
    );
  };
  
  const SpotifyInput = ({ onSubmit }: { onSubmit: (id: string) => void }) => {
    const navigate = useNavigate();
    return (
      <div
        onClick={() => navigate('/spotify')}
        className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
      >
        <FaSpotify className="text-4xl text-green-600 mb-3" />
        <p className="text-center text-sm font-semibold text-gray-700">Spotify Input</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Audio Analysis Tool</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>

        {/* External components (Audio, YouTube, Spotify) */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <AudioUpload onUpload={(file) => console.log('Audio file uploaded:', file)} />
          <YoutubeInput onSubmit={(url) => console.log('YouTube URL submitted:', url)} />
          <SpotifyInput onSubmit={(id) => console.log('Spotify ID submitted:', id)} />
        </div>
      </div>

      <FloatingDock
        items={dockItems}
        isExpanded={isDockExpanded}
        onToggle={() => setIsDockExpanded(!isDockExpanded)}
      />
    </div>
  );
};

const CardComponent = ({
  title,
  content,
  onClick,
}: {
  title: string;
  content: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition"
  >
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-2 line-clamp-3">{content}</p>
  </div>
);

export default Dashboard;
