import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SocialLogin = ({ setUser }) => {
  const googleSuccess = (res: any) => {
    const decodedToken = jwtDecode(res.credential);
    const result = {
      googleId: decodedToken.sub,
      email: decodedToken.email,
      givenName: decodedToken.given_name,
      familyName: decodedToken.family_name,
      name: decodedToken.name,
    };
    const token = res.credential;
    localStorage.setItem("profile", JSON.stringify({ result, token }));
    setUser({ result, token });
  };

  const googleError = () => {
    console.log("Google Login failed");
  };

  return (
    <div className="space-y-4">
      <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
    </div>
  );
};

const Auth = ({ user, setUser }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setError('');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const endpoint = isSignup ? '/register' : '/login';
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('profile', JSON.stringify(data));
        setUser(data);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

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
                key={isSignup ? 'signup' : 'login'}
                initial={{ opacity: 0, x: isSignup ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isSignup ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                  {isSignup ? 'Join Us' : 'Welcome Back'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignup && (
                    <>
                      <input
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md"
                      />
                      <input
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md"
                      />
                    </>
                  )}
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                  {isSignup && (
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-md"
                    />
                  )}
                  <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-md">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                  </button>

                  {error && <p className="text-red-500">{error}</p>}

                  <div className="my-8 relative flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full absolute" />
                    <div className="bg-white/80 backdrop-blur-sm px-4 text-sm text-gray-500 relative z-10">
                      or continue with
                    </div>
                  </div>

                  <SocialLogin setUser={setUser} />

                  <motion.p 
                    className="text-center mt-8 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button
                      onClick={switchMode}
                      className="text-indigo-600 font-medium ml-2 hover:text-indigo-500 transition-colors relative group"
                    >
                      {isSignup ? 'Sign in' : 'Sign up'}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
                    </button>
                  </motion.p>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;































// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import SignupForm from "./SignUpForm";
// import LoginForm from "./LoginForm";


// const SocialLogin = () => {
//   const googleSuccess = (res: any) => {
//     const decodedToken = jwtDecode(res.credential);
//     const result = {
//       googleId: decodedToken.sub,
//       email: decodedToken.email,
//       givenName: decodedToken.given_name,
//       familyName: decodedToken.family_name,
//       name: decodedToken.name,
//     };
//     const token = res.credential;
//     localStorage.setItem("profile", JSON.stringify({ result, token }));
//   };

//   const googleError = () => {
//     console.log("Google Login failed");
//   };

//   return (
//     <div className="space-y-4">
//       <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
//     </div>
//   );
// };

// // Auth Component (Parent Component)
// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setIsLogin((prevIsLogin) => !prevIsLogin);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center p-4 overflow-hidden">
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')] opacity-10 bg-cover bg-center" />
      
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md relative"
//       >
//         <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl" />
        
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden relative z-10">
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          
//           <div className="p-8">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={isLogin ? 'login' : 'signup'}
//                 initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
//                   {isLogin ? 'Welcome Back' : 'Join Us'}
//                 </h2>

//                 {isLogin ? <LoginForm /> : <SignupForm />}
                
//                 <div className="my-8 relative flex items-center justify-center">
//                   <div className="border-t border-gray-200 w-full absolute" />
//                   <div className="bg-white/80 backdrop-blur-sm px-4 text-sm text-gray-500 relative z-10">
//                     or continue with
//                   </div>
//                 </div>

//                 <SocialLogin />

//                 <motion.p 
//                   className="text-center mt-8 text-gray-600"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   {isLogin ? "Don't have an account?" : "Already have an account?"}
//                   <button
//                     onClick={toggleForm}
//                     className="text-indigo-600 font-medium ml-2 hover:text-indigo-500 transition-colors relative group"
//                   >
//                     {isLogin ? 'Sign up' : 'Sign in'}
//                     <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
//                   </button>
//                 </motion.p>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Auth;
