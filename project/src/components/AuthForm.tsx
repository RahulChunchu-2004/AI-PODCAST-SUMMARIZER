import React, { useState } from 'react';
import LoginForm from './Login';
import SocialLogin from './SocialLogin';
import { motion, AnimatePresence } from 'framer-motion';
import SignupForm from './SignUpForm';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')] opacity-10 bg-cover bg-center" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl" />
        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden relative z-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                  {isLogin ? 'Welcome Back' : 'Join Us'}
                </h2>

                {isLogin ? <LoginForm /> : <SignupForm />}
                
                <div className="my-8 relative flex items-center justify-center">
                  <div className="border-t border-gray-200 w-full absolute" />
                  <div className="bg-white/80 backdrop-blur-sm px-4 text-sm text-gray-500 relative z-10">
                    or continue with
                  </div>
                </div>

                <SocialLogin />

                <motion.p 
                  className="text-center mt-8 text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={toggleForm}
                    className="text-indigo-600 font-medium ml-2 hover:text-indigo-500 transition-colors relative group"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
                  </button>
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}