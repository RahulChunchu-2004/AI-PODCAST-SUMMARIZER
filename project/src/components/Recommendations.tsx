import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Play, 
  Clock, 
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const podcasts = [
  {
    id: 1,
    title: 'The Future of AI',
    host: 'Tech Insights Daily',
    duration: '45 min',
    summary: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'Startup Success Stories',
    host: 'Entrepreneur Weekly',
    duration: '60 min',
    summary: '7 min read',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    category: 'Business'
  },
  {
    id: 3,
    title: 'Mindfulness in Modern Life',
    host: 'Wellness Today',
    duration: '30 min',
    summary: '4 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    category: 'Health'
  },
  {
    id: 4,
    title: 'Science Breakthroughs',
    host: 'Discovery Channel',
    duration: '50 min',
    summary: '6 min read',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    category: 'Science'
  }
];

const Recommendations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const next = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= podcasts.length ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? podcasts.length - 1 : prev - 1
    );
  };

  const visiblePodcasts = podcasts.slice(currentIndex, currentIndex + 3);
  if (visiblePodcasts.length < 3) {
    visiblePodcasts.push(...podcasts.slice(0, 3 - visiblePodcasts.length));
  }

  return (
    <section id="recommendations" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Personalized{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Recommendations
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover podcasts tailored to your interests
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePodcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                  <div className="relative h-48">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    <button className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                      <Play className="h-4 w-4" />
                      <span className="text-sm">Play Summary</span>
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{podcast.title}</h3>
                        <p className="text-gray-400 text-sm">{podcast.host}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                        {podcast.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{podcast.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{podcast.summary}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;