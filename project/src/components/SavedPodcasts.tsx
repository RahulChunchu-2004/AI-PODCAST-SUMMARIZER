import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { Heart } from 'lucide-react';
import { PodcastModal } from './PodcastModal'; 

interface Podcast {
  podcastId: string;
  title: string;
  transcription: string;
  summary: string;
  keywords: string[];
  createdAt: string;
  imageUrl: string;
  duration: string; 
}

interface SavedPodcastsProps {
  user: {
    result: {
      id: string;
    };
  } | null;
}

const Card = ({
  imageUrl,
  title,
  description,
  date,
  onClick,
}: {
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  onClick: () => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-md font-extrabold text-blue-600 mb-4 tracking-wide transform transition-all hover:scale-105">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description.slice(0, 100)}...</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="text-sm text-gray-600 font-medium">
            {new Date(date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                handleLike();
              }}
              className="flex items-center gap-1 transition-colors duration-200 hover:text-red-500"
            >
              <Heart 
  className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500 transform scale-110' : 'text-gray-500'} transition-all duration-300 ease-in-out`} 
/>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SavedPodcasts: React.FC<SavedPodcastsProps> = ({ user }) => {
  const [savedPodcasts, setSavedPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    if (user) {
      fetchSavedPodcasts();
    }
  }, [user]);

  const fetchSavedPodcasts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/saved_podcasts', {
        params: { userId: user?.result.id },
      });
      setSavedPodcasts(response.data.savedPodcasts);
    } catch (error) {
      console.error('Error fetching saved podcasts:', error);
      alert('Failed to fetch saved podcasts.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
  };

  const handleCloseModal = () => {
    setSelectedPodcast(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <Typography 
  className="text-9xl text-center p-4 font-bold text-white "
>
  Saved Podcasts
</Typography>

      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : savedPodcasts.length > 0 ? (
        <Grid container spacing={3}>
          {savedPodcasts.map((podcast) => (
            <Grid item xs={12} sm={6} md={4} key={podcast.podcastId}>
              <Card
                imageUrl={"https://img.freepik.com/free-vector/detailed-podcast-logo-template_23-2148786067.jpg?ga=GA1.2.227524804.1728997892&semt=ais_hybrid"}
                title={podcast.title}
                description={podcast.summary}
                date={new Date(podcast.createdAt).toLocaleDateString()}
                likes={10} // Placeholder for likes
                onClick={() => handleCardClick(podcast)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ color: 'gray', textAlign: 'center' }}>
          No saved podcasts found.
        </Typography>
      )}

      {/* Podcast Modal */}
      <PodcastModal podcast={selectedPodcast} onClose={handleCloseModal} isOpen={!!selectedPodcast} />
    </div>
  );
};

export default SavedPodcasts;
