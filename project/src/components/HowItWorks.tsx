import GraphDiagram from "./GraphDiagram";


export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-30 animate-blob"
            style={{
              backgroundColor: ['#8B5CF6', '#10B981', '#3B82F6'][i],
              top: ['20%', '60%', '40%'][i],
              left: ['20%', '60%', '40%'][i],
              width: '30rem',
              height: '30rem',
              animation: `blob ${15 + i * 2}s infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 text-transparent bg-clip-text">
              {" "}It Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform any podcast into actionable insights in four simple steps
          </p>
        </div>

        {/* Graph Diagram */}
        <GraphDiagram />

        <div className="mt-20 text-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-xl font-semibold transition-all hover:scale-105">
            Try It Now - It's Free
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </section>
  );
}