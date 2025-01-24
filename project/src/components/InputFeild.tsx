import React from 'react';
import { motion } from 'framer-motion';

interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
}

export default function InputField({ icon, type, placeholder }: InputFieldProps) {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                 transition-all duration-200 hover:bg-white/70"
      />
    </motion.div>
  );
}