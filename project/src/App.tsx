import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EntryPage from './components/EntryPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SavedPodcasts from './components/SavedPodcasts';
import YoutubeSummarizer from './components/YoutubeSummarizer';
import UploadMainPage from './components/UploadMainPage';
import PodcastSummarizer from './components/PodcastSummarizer'
import ListenNotes from './components/ListenNotes';
import './index.css';





function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('profile'));
    setUser(storedUser); // Update user state when the profile changes in localStorage
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 ">
      <Router>
            <GoogleOAuthProvider clientId="1001552817475-0bkg5jl62dfkigofvd6gdfv5jtf1hka1.apps.googleusercontent.com">
                <Routes>
                    {/* Entry Page */}
                    <Route path="/" element={<EntryPage />} />

                    {/* Login Page */}
                    <Route 
                        path="/login" 
                        // <Login user={user} setUser={setUser}
                        element={user ? <Navigate to="/dashboard" /> : <Login user={user} setUser={setUser}/>} 
                    />

                    {/* Dashboard Page */}
                    <Route 
                        path="/dashboard" 
                        element={user ? <Dashboard user={user} setUser={setUser}/> : <Navigate to="/login" />} 
                    />
                    
                    <Route path = "/upload" element={ <UploadMainPage user={user} setUser={setUser} /> } />
                    <Route path="/saved-podcasts" element={<SavedPodcasts user={user} />} />
                    <Route path="/youtubeSummarizer" element={ <YoutubeSummarizer user={user} setUser={setUser} />} /> 
                    <Route path="/spotify" element={ <ListenNotes user={user} setUser={setUser} />} /> 

                </Routes>
            </GoogleOAuthProvider>    
            </Router>

    </div>
  );
}

export default App;