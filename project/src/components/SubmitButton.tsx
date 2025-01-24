import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubmitButtonProps {
  children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg
                transition-all duration-200 flex items-center justify-center space-x-2 font-medium
                hover:from-violet-700 hover:to-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <span>{children}</span>
      <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}