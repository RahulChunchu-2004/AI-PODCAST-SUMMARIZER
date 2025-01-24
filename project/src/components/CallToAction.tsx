import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
          
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
          </div>

          <div className="relative px-8 py-16 md:px-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Saving Time Today
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Join thousands of professionals who are already getting more from their podcast listening experience.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold 
                           flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
                >
                  <Zap className="h-5 w-5" />
                  <span>Start Free Trial</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold 
                           flex items-center justify-center space-x-2 hover:bg-white/10 transition-colors"
                >
                  <span>Schedule Demo</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>

              <p className="mt-6 text-sm text-gray-300">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;