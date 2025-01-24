










// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactPlayer from 'react-player';

// // Define types for the props
// interface FullScreenModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   content: string;
//   summary: string;
//   setSummary: React.Dispatch<React.SetStateAction<string>>;
// }

// const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, title, content, summary, setSummary }) => {
//   const [translatedText, setTranslatedText] = useState<string>('');
//   const [selectedLanguage, setSelectedLanguage] = useState<string>('');
//   const [isTranslating, setIsTranslating] = useState<boolean>(false);
//   const [audioUrl, setAudioUrl] = useState<string>(''); // To store the audio URL
//   const [isProcessing, setIsProcessing] = useState<boolean>(false); // To check if text-to-speech is in progress

//   // List of languages (can be dynamically populated or fetched if necessary)
//   const languages: Record<string, string> = {
//     'en': 'English',
//     'es': 'Spanish',
//     'fr': 'French',
//     'de': 'German',
//     'hi': 'Hindi',
//   };

//   if (!isOpen) return null;

//   const handleTranslateAndTTS = async () => {
//     if (!selectedLanguage) {
//       alert('Please select a language for translation.');
//       return;
//     }
//     setIsTranslating(true);

//     try {
//       const response = await axios.post('http://localhost:5000/translate-and-tts', {
//         text: content,
//         language: selectedLanguage,
//       });

//       setTranslatedText(response.data.translated_text);
//       setSummary(response.data.translated_text); // Set translated summary
//       setAudioUrl(response.data.audio_url); // Set the audio URL from the backend
//       setIsTranslating(false);
//     } catch (error) {
//       console.error('Translation and TTS Error:', error);
//       alert('Translation or Text-to-Speech failed. Please try again.');
//       setIsTranslating(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <div style={{ backgroundColor: 'white', padding: '20px', width: '80%', height: '80%', overflow: 'auto' }}>
//         <h2>{title}</h2>

//         <textarea
//           rows={20}
//           style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//           value={translatedText || content}
//           readOnly
//         />

//         <div>
//           <label>
//             Select Language:
//             <select
//               value={selectedLanguage}
//               onChange={(e) => setSelectedLanguage(e.target.value)}
//               style={{ marginLeft: '10px' }}
//             >
//               <option value="">--Select--</option>
//               {Object.keys(languages).map((lang) => (
//                 <option key={lang} value={lang}>
//                   {languages[lang]}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         <button onClick={onClose} style={{ marginTop: '10px' }}>
//           Close
//         </button>
//         <button
//           onClick={handleTranslateAndTTS}
//           style={{ marginTop: '10px', marginLeft: '10px' }}
//           disabled={isTranslating || isProcessing}
//         >
//           {isTranslating || isProcessing ? 'Processing...' : 'Translate & Convert to Speech'}
//         </button>

//         {/* React Player for audio playback */}
//         {audioUrl && (
//           <div style={{ marginTop: '20px' }}>
//             <h3>Audio Playback</h3>
//             <ReactPlayer url={audioUrl} controls width="100%" height="50px" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FullScreenModal;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

interface FullScreenModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  translations: { [key: string]: string };
  onTranslationUpdate: (translation: string) => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  open,
  handleClose,
  title,
  content,
  translations,
  onTranslationUpdate,
}) => {
  const [translatedText, setTranslatedText] = useState<string>(translations[title.toLowerCase()] || '');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    setTranslatedText(translations[title.toLowerCase()] || '');
  }, [title, translations]);

  const languages: { [key: string]: string } = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    hi: 'Hindi',
    te:'Telugu'
  };

  if (!open) return null;

  const handleTranslateAndTTS = async () => {
    if (!selectedLanguage) {
      alert('Please select a language for translation.');
      return;
    }
    setIsTranslating(true);

    try {
      const response = await axios.post('http://localhost:5000/translate-and-tts', {
        text: content,
        language: selectedLanguage,
      });

      setTranslatedText(response.data.translated_text);
      onTranslationUpdate(response.data.translated_text);
      setAudioUrl(response.data.audio_url);
      setPlaying(true); // Start playback immediately after translation
      setIsTranslating(false);
    } catch (error) {
      console.error('Error during translation:', error);
      setIsTranslating(false);
    }
  };

  const Close = () => {
    setPlaying(false); // Stop playback on close
    handleClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '80%',
          maxHeight: '90%',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={Close}
        >
          ✖
        </button>
        <h2>{title}</h2>
        <p>{translatedText || content}</p>

        <label>
          Select Language:
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="">Select</option>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={handleTranslateAndTTS}
          disabled={!selectedLanguage || isTranslating}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            cursor: isTranslating ? 'not-allowed' : 'pointer',
          }}
        >
          {isTranslating ? 'Translating...' : 'Translate and TTS'}
        </button>

        {audioUrl && (
          <div style={{ marginTop: '20px' }}>
            <ReactPlayer
              url={audioUrl}
              controls={true}
              playing={playing}
              onEnded={() => setPlaying(false)} // Stop when audio ends
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FullScreenModal;
