import { FastForward, BookMarked, Share2, Brain, Headphones, Star } from 'lucide-react';

const features = [
  {
    icon: <FastForward className="w-6 h-6" />,
    title: "Smart Summaries",
    description: "Get key insights in minutes with AI-powered summaries",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Personalized Learning",
    description: "AI adapts summaries to your interests and goals",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <BookMarked className="w-6 h-6" />,
    title: "Smart Bookmarks",
    description: "Save and organize insights with intelligent tagging",
    color: "from-emerald-500 to-blue-500"
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Team Sharing",
    description: "Collaborate and share insights with your team",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Audio Highlights",
    description: "Listen to key moments from episodes",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Premium Content",
    description: "Access exclusive podcast analysis and insights",
    color: "from-yellow-500 to-orange-500"
  }
];

export default function Features() {
  return (
    <section id = "features" className="py-32 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 text-transparent bg-clip-text">
              {" "}Power Listeners
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to transform your podcast listening experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}