import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { LogOut,Music2, Save,Upload,  Youtube } from 'lucide-react';
import FloatingDock from './FloatingDock';
import AudioPlayer from "./AudioPlayer";

interface User {
  result?: {
    id: string;
  };
}

interface YoutubeSummarizerProps {
  user: User;
  setUser: (user: User | string) => void;
}

const YoutubeSummarizer: React.FC<YoutubeSummarizerProps> = ({ user , setUser}) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [transcription, setTranscription] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const [translatedText, setTranslatedText] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

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

  const languages: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    hi: "Hindi",
  };

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/youtube_summarize", { video_url: videoUrl });
      setSummary(response.data.summary);
      console.log(response)
      setTranscription(response.data.transcription);
      setKeywords(response.data.keywords);
    } catch (err) {
      console.error(err);
      setError("Failed to get the summary. Please check the URL or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTranslateAndTTS = async () => {
    if (!selectedLanguage) {
      alert("Please select a language for translation.");
      return;
    }
    setIsTranslating(true);

    try {
      const response = await axios.post("http://localhost:5000/translate-and-tts", {
        text: summary,
        language: selectedLanguage,
      });

      setAudioUrl(""); 
      setTimeout(() => setAudioUrl(response.data.audio_url), 100); 
      setSummary(response.data.translated_text); 
    } catch (error) {
      console.error("Error during translation:", error);
      setError("Translation and TTS failed.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSaveSummary = async () => {
    if (!summary) {
      alert("No summary to save.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/save_podcast", {
        userId: user?.result.id || user?.result?.googleId,
        title: "Youtube Podcast",
        transcription: transcription || "",
        summary: summary || "",
        keywords,
      });
      alert("Podcast saved successfully!");
    } catch (error) {
      console.error("Error saving podcast:", error);
      setError("Failed to save the podcast.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 p-10  ">Youtube Summarizer Dashboard</h1>
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mb-12">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">YouTube Video Summarizer</h1>

      <form onSubmit={handleSummarize} className="space-y-4">
        <input
          type="text"
          placeholder="Enter YouTube video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </form>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      {summary && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Summary:</h2>
          <p className="mt-2 text-gray-600">{summary}</p>

          <div className="mt-6">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Select Language
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Choose a language</option>
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <button
              onClick={handleTranslateAndTTS}
              className={`mt-4 w-full py-2 px-4 bg-green-600 text-white font-semibold rounded ${
                isTranslating ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
              }`}
              disabled={isTranslating}
            >
              {isTranslating ? "Translating..." : "Translate & Convert to Speech"}
            </button>

            {audioUrl && (
              <div className="mt-6">
                <AudioPlayer url={audioUrl} />
              </div>
            )}
          </div>

          <button
            onClick={handleSaveSummary}
            className="mt-6 w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700"
          >
            Save Summary
          </button>

        </div>
      )}
      <FloatingDock
        items={dockItems}
        isExpanded={isDockExpanded}
        onToggle={() => setIsDockExpanded(!isDockExpanded)}
      />
    </div>
    </div>
  );
};

export default YoutubeSummarizer;
