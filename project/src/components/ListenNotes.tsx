import React, { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { LogOut, Music2, Save, Upload, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingDock from "./FloatingDock";

const ListenNotes: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const [episodeId, setEpisodeId] = useState("");
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDockExpanded, setIsDockExpanded] = useState<boolean>(false);

  const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    hi: "Hindi",
  };

  const handleSummarize = async () => {
    if (isSummarizing) return;
    setIsSummarizing(true);
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:5000/transcribe2", {
        episode_id: episodeId,
      });
      await fetchSummary();
    } catch (err) {
      console.error("Error summarizing the episode:", err);
      setError("Failed to summarize the episode. Please try again.");
    } finally {
      setIsSummarizing(false);
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/summaries");
      setSummary(response.data || null);
    } catch (err) {
      console.error("Error fetching summaries:", err);
      setError("Failed to fetch summaries. Please try again.");
    }
  };

  const handleSavePodcast = async () => {
    try {
      await axios.post("http://localhost:5000/api/save_podcast", {
        userId: user?.result.id || user?.result?.googleId,
        title: summary?.podcast_title || "Untitled Podcast",
        transcription: summary?.chapters.map((chapter: any) => chapter.summary).join("\n") || "",
        summary: summary?.chapters.map((chapter: any) => chapter.summary).join("\n") || "",
        keywords: [],
      });
      alert("Podcast saved successfully!");
    } catch (error) {
      console.error("Error saving podcast:", error);
      setError("Failed to save the podcast.");
    }
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.clear();
    // setUser(null);
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
      onClick:() => navigate('/spotify'),
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

  const handleTranslateAndTTS = async () => {
    if (!selectedLanguage) {
      alert("Please select a language for translation.");
      return;
    }
    setIsTranslating(true);

    try {
      const response = await axios.post("http://localhost:5000/translate-and-tts", {
        text: summary.chapters.map((chapter: any) => chapter.summary).join("\n"),
        language: selectedLanguage,
      });

      setTranslatedText(response.data.translated_text);

      setAudioUrl("");
      setTimeout(() => {
        setAudioUrl(response.data.audio_url);
      }, 100);
    } catch (error) {
      console.error("Error during translation:", error);
      setError("Translation and TTS failed.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-10">
      <h1 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Podcast Summarizer</h1>

      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Episode ID"
          value={episodeId}
          onChange={(e) => setEpisodeId(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSummarize}
          disabled={loading || !episodeId || isSummarizing}
          className={`ml-4 px-4 py-2 rounded-md ${
            loading || isSummarizing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading || isSummarizing ? "Loading..." : "Get Summary"}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4">{error}</div>}

      {isSummarizing && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {!summary && !isSummarizing && (
        <p className="text-center text-gray-600">No summary available. Start by summarizing a podcast episode.</p>
      )}

      {summary && (
        <div className="border border-gray-300 rounded-md p-4 shadow-sm mb-4">
          <img
            src={summary.thumbnail}
            alt="Podcast Thumbnail"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold">{summary.podcast_title} - {summary.episode_title}</h2>

          {translatedText ? (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-600">Translated Summary:</h3>
              <p>{translatedText}</p>
            </div>
          ) : (
            summary.chapters.map((chapter: any, index: number) => (
              <div key={index} className="mt-4">
                <p className="text-sm text-gray-500">Start: {Math.floor(chapter.start / 60000)}:{((chapter.start % 60000) / 1000).toFixed(0).padStart(2, "0")} mins</p>
                <p>{chapter.summary}</p>
              </div>
            ))
          )}
        </div>
      )}

<FloatingDock
        items={dockItems}
        isExpanded={isDockExpanded}
        onToggle={() => setIsDockExpanded(!isDockExpanded)}
      />

      {summary && (
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <label className="mr-2">Select Language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="">Select</option>
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleTranslateAndTTS}
            disabled={!selectedLanguage || isTranslating}
            className={`px-4 py-2 rounded-md ${
              isTranslating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isTranslating ? "Translating..." : "Translate & TTS"}
          </button>

          {audioUrl && (
            <ReactPlayer
              url={audioUrl}
              controls={true}
              className="mt-4"
            />
          )}

          <button
            onClick={handleSavePodcast}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Podcast
          </button>
        </div>
      )}
    </div>
  );
};

export default ListenNotes;
