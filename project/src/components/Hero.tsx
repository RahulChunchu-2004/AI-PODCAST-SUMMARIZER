import { Play, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 animate-gradient"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">New: AI-Powered Chapter Summaries</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text leading-tight">
            Your Podcast Library,<br />Brilliantly Summarized
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform hours of podcasts into minutes of actionable insights. Powered by advanced AI for busy professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20">
              <span className="flex items-center gap-2">
                Start Free Trial
                <Play className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold transition-all hover:bg-white/20 hover:scale-105">
              Watch Demo
            </button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              50K+ Active Users
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              4.9/5 Rating
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              1M+ Summaries
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}