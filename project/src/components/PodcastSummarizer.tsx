import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import ReactPlayer from "react-player";
import FloatingDock from "./FloatingDock"; // Assume this is the dock component you've implemented
import { Modal } from "@mui/material";

interface Chapter {
  start: number;
  summary: string;
}

interface Summary {
  thumbnail: string;
  podcast_title: string;
  episode_title: string;
  chapters: Chapter[];
}

interface PodcastSummarizerProps {
  user: {
    result: {
      id?: string;
      googleId?: string;
    };
  };
}

const PodcastSummarizer: React.FC<PodcastSummarizerProps> = ({ user }) => {
  const [episodeId, setEpisodeId] = useState<string>("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const languages: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    hi: "Hindi",
  };

  const dockItems = [
    { id: "summarize", label: "Summarize Podcast", action: () => handleSummarize() },
    { id: "save", label: "Save Podcast", action: () => handleSavePodcast() },
    { id: "translate", label: "Translate & TTS", action: () => handleTranslateAndTTS() },
  ];

  const handleSummarize = async () => {
    if (isSummarizing) return;
    setIsSummarizing(true);
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/transcribe2", { episode_id: episodeId });
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
      const response = await axios.get<Summary>("http://localhost:5000/summaries");
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
        transcription: summary?.chapters.map((chapter) => chapter.summary).join("\n") || "",
        summary: summary?.chapters.map((chapter) => chapter.summary).join("\n") || "",
        keywords: [], // Placeholder for keywords
      });
      alert("Podcast saved successfully!");
    } catch (error) {
      console.error("Error saving podcast:", error);
      setError("Failed to save the podcast.");
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
        text: summary?.chapters.map((chapter) => chapter.summary).join("\n"),
        language: selectedLanguage,
      });

      setTranslatedText(response.data.translated_text);
      setAudioUrl(response.data.audio_url);
    } catch (error) {
      console.error("Error during translation:", error);
      setError("Translation and TTS failed.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Podcast Summarizer
      </Typography>

      {/* Input for Episode ID */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
        <TextField
          label="Enter Episode ID"
          variant="outlined"
          value={episodeId}
          onChange={(e) => setEpisodeId(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSummarize}
          disabled={loading || !episodeId || isSummarizing}
          style={{ marginLeft: "1rem" }}
        >
          {loading || isSummarizing ? <CircularProgress size={24} /> : "Get Summary"}
        </Button>
      </Box>

      {/* Error Alert */}
      {error && <Alert severity="error" style={{ marginBottom: "1rem" }}>{error}</Alert>}

      {/* Summary Display */}
      {summary ? (
        <Card variant="outlined" style={{ marginBottom: "1.5rem" }}>
          <CardMedia
            component="img"
            image={summary.thumbnail}
            alt="Podcast Thumbnail"
            height="200"
          />
          <CardContent>
            <Typography variant="h5">
              {summary.podcast_title} - {summary.episode_title}
            </Typography>
            {translatedText ? (
              <>
                <Typography variant="subtitle1" color="primary" style={{ marginTop: "10px" }}>
                  Translated Summary ({languages[selectedLanguage]}):
                </Typography>
                <Typography variant="body2">{translatedText}</Typography>
              </>
            ) : (
              summary.chapters.map((chapter, i) => (
                <Box key={i} mt={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Start: {Math.floor(chapter.start / 60000)}:
                    {(chapter.start % 60000) / 1000 < 10 ? "0" : ""}
                    {(chapter.start % 60000) / 1000} mins
                  </Typography>
                  <Typography variant="body2">{chapter.summary}</Typography>
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          No summary available. Start by summarizing a podcast episode.
        </Typography>
      )}

      {/* Translation & TTS */}
      {summary && (
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          <Box mb={2}>
            <label>
              Select Language:
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{ marginLeft: "10px" }}
              >
                <option value="">Select</option>
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTranslateAndTTS}
              disabled={!selectedLanguage || isTranslating}
              style={{ marginLeft: "10px" }}
            >
              {isTranslating ? "Translating..." : "Translate & TTS"}
            </Button>
          </Box>

          {audioUrl && (
            <ReactPlayer
              url={audioUrl}
              controls
              style={{ marginTop: "20px" }}
            />
          )}

          {/* Save Podcast button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSavePodcast}
            style={{ marginTop: "20px" }}
          >
            Save Podcast
          </Button>
        </Box>
      )}

      {/* Floating Dock */}
      <FloatingDock
        isExpanded={true}
        onExpand={() => {}}
        items={dockItems}
      />
    </Container>
  );
};

export default PodcastSummarizer;
