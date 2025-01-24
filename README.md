# Podcast Summarizer

Podcast Summarizer is an AI-powered web application designed to simplify podcast analysis by providing:
- Full transcripts
- Concise summaries
- Chapter-based breakdowns
- Keyword extraction

## Features
- **3 Input Methods**: Upload audio files, paste YouTube URLs, or use Listen Notes IDs.
- **Multilingual Support**: Translate and play summaries in various languages.
- **User-Friendly Interface**: Built with React and TypeScript for seamless interaction.
- **Saved Podcasts**: Save and revisit past transcriptions, summaries, and metadata.

## How It Works
### Input Methods
1. **Audio Upload**: Supports formats like MP3, WAV. Automatically processes the file to generate summaries and keywords.
2. **YouTube URL**: Extracts transcripts from YouTube captions for processing.
3. **Listen Notes ID**: Fetches podcast audio and metadata for transcription.

### Processing Steps
1. Transcription using AssemblyAI.
2. Summary and keyword generation using NLP techniques.
3. Saving results for future reference.

## Technology Stack
- **Frontend**: React, TypeScript
- **Backend**: Flask, MongoDB
- **APIs**: AssemblyAI, ListenNotes
- **Authentication**: OAuth for secure login

## Advantages
- Save time with automated transcription and summarization.
- Organize podcast content into chapters for better understanding.
- Accessible globally with multi-language support and text-to-speech playback.

## How to Use
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install   # Frontend dependencies
   pip install -r requirements.txt   # Backend dependencies
   ```
3. Start the application:
   ```bash
   npm run dev      # Run frontend
   python app.py      # Run backend
   ```
4. Upload audio files, paste YouTube URLs, or use Listen Notes IDs to process podcasts.

## Contributions
Contributions are welcome! Feel free to open issues or submit pull requests for feature suggestions or bug fixes.

## License
This project is licensed under the MIT License.
