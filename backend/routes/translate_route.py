import uuid
import time
from flask import Blueprint, request, jsonify
from deep_translator import GoogleTranslator
from gtts import gTTS
import os

# Supported languages
SUPPORTED_LANGUAGES = {
    'af': 'Afrikaans', 'sq': 'Albanian', 'am': 'Amharic', 'ar': 'Arabic',
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'hi': 'Hindi',
    'te':'Telugu'
    # Add more supported languages here
}

# Create a Blueprint for translation routes
translate_bp = Blueprint('translate', __name__)

# Define character limit for each chunk
CHUNK_SIZE = 4500  # Stay within the 5,000-character limit for safety

def split_text(text, chunk_size):
    """Split text into chunks of specified size."""
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

@translate_bp.route('/translate-and-tts', methods=['POST'])
def translate_and_text_to_speech():
    data = request.json
    text = data.get('text')
    language = data.get('language')
    
    if not text or not language:
        return jsonify({'error': 'Text and language parameters are required'}), 400
    
    if language not in SUPPORTED_LANGUAGES:
        return jsonify({'error': 'Unsupported language'}), 400
    
    try:
        # Split text into manageable chunks
        text_chunks = split_text(text, CHUNK_SIZE)
        
        # Translate each chunk and combine the results
        translated_text_chunks = [
            GoogleTranslator(source='auto', target=language).translate(chunk)
            for chunk in text_chunks
        ]
        translated_text = " ".join(translated_text_chunks)

        # Generate a unique file name using UUID and timestamp
        unique_filename = f"tts_output_{int(time.time())}_{uuid.uuid4().hex}.mp3"
        audio_path = os.path.join('static', unique_filename)

        # Convert translated text to speech
        tts = gTTS(text=translated_text, lang=language)
        tts.save(audio_path)

        # Return both translated text and audio URL
        return jsonify({
            'translated_text': translated_text,
            'audio_url': f'http://127.0.0.1:5000/{audio_path}'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
