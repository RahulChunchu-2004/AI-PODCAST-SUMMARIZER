import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialLogin() {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="flex items-center justify-center space-x-2 py-2.5 border border-gray-200 
                   rounded-lg hover:bg-gray-50 transition-colors relative group overflow-hidden"
      >
        <Github size={20} />
        <span>Github</span>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
      </motion.button>
      
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="flex items-center justify-center space-x-2 py-2.5 border border-gray-200 
                   rounded-lg hover:bg-gray-50 transition-colors relative group overflow-hidden"
      >
        <Twitter size={20} />
        <span>Twitter</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
      </motion.button>
    </div>
  );
}