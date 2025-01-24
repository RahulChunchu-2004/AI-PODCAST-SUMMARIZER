import React from 'react';
import { Mail, Lock } from 'lucide-react';
import SubmitButton from './SubmitButton';
import InputField from './InputFeild';

export default function LoginForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <InputField
        icon={<Mail size={20} />}
        type="email"
        placeholder="Email Address"
      />
      
      <InputField
        icon={<Lock size={20} />}
        type="password"
        placeholder="Password"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 text-gray-600 group cursor-pointer">
          <div className="relative">
            <input type="checkbox" className="peer hidden" />
            <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-indigo-600 peer-checked:bg-indigo-600" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block text-white">✓</div>
          </div>
          <span className="group-hover:text-gray-800 transition-colors">Remember me</span>
        </label>
        
        <button className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors relative group">
          Forgot Password?
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
        </button>
      </div>

      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}