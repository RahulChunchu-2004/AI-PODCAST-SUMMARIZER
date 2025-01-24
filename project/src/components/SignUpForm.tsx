import React from 'react';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import InputField from './InputFeild';
import SubmitButton from './SubmitButton';


export default function SignupForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <InputField
        icon={<User size={20} />}
        type="text"
        placeholder="Full Name"
      />
      
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
      
      <InputField
        icon={<ShieldCheck size={20} />}
        type="password"
        placeholder="Confirm Password"
      />

      <SubmitButton>Create Account</SubmitButton>
    </form>
  );
}