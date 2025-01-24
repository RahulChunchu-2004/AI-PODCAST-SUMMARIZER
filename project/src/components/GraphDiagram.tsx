import React from 'react';
import { Mic, Brain, Sparkles, Clock, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Input",
    subtitle: "Choose Podcast",
    color: "from-blue-500 to-purple-500",
    description: "Select any podcast episode"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Process",
    subtitle: "AI Analysis",
    color: "from-purple-500 to-pink-500",
    description: "Advanced AI processing"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Transform",
    subtitle: "Generate Summary",
    color: "from-pink-500 to-emerald-500",
    description: "Create concise summary"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Result",
    subtitle: "Save Time",
    color: "from-emerald-500 to-blue-500",
    description: "Get key insights fast"
  }
];

export default function GraphDiagram() {
  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex justify-between items-center">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform -translate-y-1/2 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 animate-pulse opacity-50"></div>
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Node */}
              <div className={`relative w-32 h-32 rounded-2xl bg-gradient-to-r ${step.color} p-1 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                  <div className="relative">
                    {step.icon}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-gray-400">
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                </div>
              )}

              {/* Label */}
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center w-32">
                <div className="font-bold text-lg mb-1">{step.title}</div>
                <div className={`text-sm bg-gradient-to-r ${step.color} text-transparent bg-clip-text font-medium`}>
                  {step.subtitle}
                </div>
              </div>

              {/* Floating Description */}
              <div className={`absolute -top-20 left-1/2 transform -translate-x-1/2 
                opacity-0 group-hover:opacity-100 transition-all duration-300
                bg-gray-800 text-white px-4 py-2 rounded-lg text-sm w-40 text-center
                shadow-xl pointer-events-none`}>
                {step.description}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                  border-8 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}