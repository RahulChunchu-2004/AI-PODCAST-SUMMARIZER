import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullScreenModal from './FullScreenModal';
import { FileAudio, Upload } from 'lucide-react';
import FloatingDock from './FloatingDock';
import { LogOut, Music2, Save, Youtube } from 'lucide-react';

interface User {
  result: {
    id: string;
  };
}

interface DashboardProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const languageOptions = [
  { label: 'English', code: 'en' },
  { label: 'Telugu', code: 'te' },
  { label: 'Hindi', code: 'hi' },
  { label: 'Spanish', code: 'es' },
  { label: 'French', code: 'fr' },
  { label: 'German', code: 'de' },
];

const UploadMainPage: React.FC<DashboardProps> = ({ user, setUser }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [transcription, setTranscription] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  interface ModalTranslations {
    transcription: string;
    summary: string;
    keywords: string;
  }
  
  const [modalTranslations, setModalTranslations] = useState<ModalTranslations>({
    transcription: '',
    summary: '',
    keywords: '',
  });

  const navigate = useNavigate();

  const [isDockExpanded, setIsDockExpanded] = useState<boolean>(false);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(event.type === 'dragenter' || event.type === 'dragover');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an audio file first.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    const userId = user?.result.id;
    if (!userId) {
      alert('User not logged in');
      setIsLoading(false);
      return;
    }

    formData.append('userId', userId);
    formData.append('title', 'Sample Podcast Title');
    formData.append('language', selectedLanguage);

    try {
      const response = await axios.post('http://localhost:5000/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTranscription(response.data.data.transcription);
      setSummary(response.data.data.summary);
      setKeywords(response.data.data.keywords);
    } catch (error) {
      console.error('Error during transcription:', error);
      alert('Failed to transcribe the audio file.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (title: React.SetStateAction<string>, content: React.SetStateAction<string>) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTranslationUpdate = (newTranslation: string) => {
    setModalTranslations((prev) => ({
      ...prev,
      [modalTitle.toLowerCase()]: newTranslation,
    }));
  
    // Update main state based on modal title
    if (modalTitle === 'Transcription') setTranscription(newTranslation);
    if (modalTitle === 'Summary') setSummary(newTranslation);
    if (modalTitle === 'Keywords') setKeywords(newTranslation.split(', '));
  };
  

  const handleSavedPodcasts = () => {
    navigate('/saved-podcasts');
  };

  const savePodcast = async () => {
    try {
      await axios.post('http://localhost:5000/api/save_podcast', {
        userId: user?.result.id,
        title: selectedFile.name,
        transcription,
        summary,
        keywords,
      });
      alert('Podcast saved successfully!');
    } catch (error) {
      console.error('Error saving podcast:', error);
      alert('Failed to save the podcast.');
    }
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
      onClick: () => navigate('/spotify'),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Audio Transcription Dashboard
          </h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>

        {/* Language Dropdown */}
        <div className="mt-4">
          <label htmlFor="language-select" className="text-gray-700 font-medium">
            Select Language:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="ml-2 p-2 border rounded"
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Drag-and-Drop File Upload UI */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl mt-6">
          <div className="text-center mb-4">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-2">
              <FileAudio className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Audio File</h2>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-4 text-center transition-colors
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
              ${selectedFile ? 'bg-green-50 border-green-500' : 'hover:border-blue-400'}
            `}
          >
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileInput}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              {selectedFile ? (
                <span className="text-green-600 font-medium">{selectedFile.name}</span>
              ) : (
                <>
                  <span className="text-gray-600">Drop your audio file here</span>
                  <span className="text-sm text-gray-500">or click to browse</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Upload Button */}
        <button
          className={`mt-6 px-4 py-2 text-white rounded ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload and Transcribe'}
        </button>
        <br />

        <button
          className={`mt-6 px-4 py-2 text-white rounded ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={savePodcast}
          // disabled={isLoading}
        >
        Save Podcast
        </button>


        {/* Transcription and Summary Display */}
        {transcription && (
  <div className="flex gap-4 mt-6 flex-wrap">
    <div
      className="w-72 p-4 bg-gray-100 rounded cursor-pointer hover:shadow"
      onClick={() => openModal('Transcription', transcription)}
    >
      <h2 className="font-bold">Transcription:</h2>
      <p>{transcription.slice(0, 100)}...</p>
    </div>

    <div
      className="w-72 p-4 bg-gray-100 rounded cursor-pointer hover:shadow"
      onClick={() => openModal('Summary', summary)}
    >
      <h2 className="font-bold">Summary:</h2>
      <p>{summary.slice(0, 100)}...</p>
    </div>

    <div
      className="w-72 p-4 bg-gray-100 rounded cursor-pointer hover:shadow"
      onClick={() => openModal('Keywords', keywords.join(', '))}
    >
      <h2 className="font-bold">Keywords:</h2>
      <p>{keywords.slice(0, 5).join(', ')}...</p>
    </div>
  </div>
)}
      </div>

      {/* Floating Dock */}
      <FloatingDock
        isExpanded={isDockExpanded}
        onExpand={setIsDockExpanded}
        items={dockItems}
      />

      {/* Modal */}
      <FullScreenModal
        open={modalOpen}
        handleClose={closeModal}
        title={modalTitle}
        content={modalContent}
        onTranslationUpdate={handleTranslationUpdate}
        translations={modalTranslations}

      />
    </div>
  );
};

export default UploadMainPage;
