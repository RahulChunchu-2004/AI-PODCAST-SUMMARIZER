import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface FloatingDockProps {
  items: DockItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  isExpanded,
  onToggle,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg transition-all duration-300 ${
          isExpanded ? 'p-6' : 'p-4'
        }`}
      >
        

        <div
          className={`flex ${
            isExpanded
              ? 'flex-col items-stretch gap-4' // Increased gap for expanded state
              : 'items-end gap-2' // Increased gap for collapsed state
          }`}
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isNeighbor =
              hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

            return (
              <div
                key={index}
                className={`relative group ${
                  isExpanded ? 'w-full' : 'transition-all duration-200'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {!isExpanded && (
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                <button
                  onClick={item.onClick}
                  className={`
                    flex items-center gap-4 transition-all duration-200
                    ${
                      isExpanded
                        ? 'w-full px-6 py-3 hover:bg-gray-50 rounded-xl' // Increased padding for expanded buttons
                        : 'p-3 hover:bg-gray-50/50 rounded-xl' // Increased padding for collapsed buttons
                    }
                    ${
                      !isExpanded &&
                      'transform hover:shadow-lg ' +
                        (isHovered
                          ? 'scale-150 -translate-y-2 z-10'
                          : isNeighbor
                          ? 'scale-125 -translate-y-1 z-0'
                          : 'scale-100 z-0')
                    }
                  `}
                >
                  <div
                    className={`transition-colors duration-200 ${
                      isHovered ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {isExpanded && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingDock;
