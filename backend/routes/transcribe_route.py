# from flask import Blueprint, request, jsonify
# import os
# import tempfile
# from models.podcast_model import save_podcast
# import assemblyai as aai
# from bson import ObjectId
# from deep_translator import GoogleTranslator
# import nltk
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize, sent_tokenize
# from keybert import KeyBERT
# from youtube_transcript_api import YouTubeTranscriptApi


# # Initialize necessary components
# nltk.download('stopwords')
# nltk.download('punkt_tab')
# nltk.download('averaged_perceptron_tagger')
# aai.settings.api_key = "928c276d69644248940e11bc96929831"
# transcriber = aai.Transcriber()
# keyword_model = KeyBERT()

# transcribe_bp = Blueprint('transcribe', __name__)

# def extract_keywords(text, top_n=5):
#     if not text:
#         return []
#     keywords = keyword_model.extract_keywords(text, keyphrase_ngram_range=(1, 2), top_n=top_n)
#     return [keyword[0] for keyword in keywords]

# N = 5  # Number of sentences to include in the summary
# threshold_ratio = 0.4 
# # Function to summarize text content
# def summarize_text_content(text):
#     if not text:
#         return None
    
#     # Load stop words
#     stop_words = set(stopwords.words('english'))
    
#     # Tokenize text into words
#     words = word_tokenize(text.lower())
    
#     # Build frequency table
#     freq_table = {}
#     for word in words:
#         if word.isalnum() and word not in stop_words:
#             freq_table[word] = freq_table.get(word, 0) + 1
    
#     # Tokenize text into sentences
#     sentences = sent_tokenize(text)
    
#     # Create a dictionary to store sentence scores
#     sentence_scores = {}
#     for sentence in sentences:
#         sentence_words = word_tokenize(sentence.lower())
#         score = sum(freq_table.get(word, 0) for word in sentence_words)
#         sentence_scores[sentence] = score
    
#     # Calculate average score
#     average_score = sum(sentence_scores.values()) / len(sentence_scores) if sentence_scores else 0
    
#     # Filter sentences that have a score above a threshold based on average score
#     threshold = threshold_ratio * average_score
#     filtered_sentences = [sentence for sentence in sentences if sentence_scores.get(sentence, 0) > threshold]
    
#     # If no sentence meets the threshold, take top N sentences by score
#     if not filtered_sentences:
#         filtered_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:N]
    
#     # Pick top N sentences to ensure the summary length is controlled
#     top_sentences = sorted(filtered_sentences, key=lambda s: sentence_scores.get(s, 0), reverse=True)[:N]
    
#     # Create final summary
#     summary = ' '.join(top_sentences)
#     return summary.strip()


# @transcribe_bp.route('/transcribe', methods=['POST'])
# def transcribe_podcast():
#     try:
#         # Fetch user ID and title from the request
#         user_id = request.form.get("userId")
#         title = request.form.get("title", "Untitled Podcast")

#          # Validate user ID
#         if not user_id:
#             return jsonify({"message": "Missing userId"}), 400

#         # If `userId` looks like a MongoDB ObjectId, validate it as such
#         if len(user_id) == 24 and not ObjectId.is_valid(user_id):
#             return jsonify({"message": "Invalid MongoDB ObjectId"}), 400

#         # Check if file is present in the request
#         if 'file' not in request.files:
#             return jsonify({"message": "No file part"}), 400
        
#         file = request.files['file']
#         if file.filename == '':
#             return jsonify({"message": "No selected file"}), 400

#         # Save the file temporarily
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
#             temp_file.write(file.read())
#             temp_file_path = temp_file.name

#         # Step 1: Transcribe the audio file
#         transcript = transcriber.transcribe(temp_file_path)
#         transcription = transcript.text

#         # Step 2: Generate summary from transcription
#         summary = summarize_text_content(transcription)
#         if not summary:
#             summary = "Summary could not be generated."

#         # Step 3: Extract keywords (Example using placeholder)
#         keywords = extract_keywords(transcription)  # Replace with actual keyword extraction logic if needed

#         # Delete the temporary file after use
#         os.remove(temp_file_path)

#         # Save podcast data to database if needed
#         # podcast_id = save_podcast(user_id, title, transcription, summary, keywords)

#         return jsonify({
#             "message": "Transcription and summary generation successful",
#             "data": {
#                 "title": title,
#                 "transcription": transcription,
#                 "summary": summary,
#                 "keywords": keywords
#             }
#         }), 200

#     except Exception as e:
#         print("Error in transcription:", e)
#         return jsonify({"message": "Something went wrong during transcription"}), 500



# def extract_video_id(url):
  
#     if "youtube.com" in url:
#         # Handles URLs like https://www.youtube.com/watch?v=VIDEO_ID
#         if "v=" in url:
#             return url.split("v=")[-1].split("&")[0]
#     elif "youtu.be" in url:
#         # Handles URLs like https://youtu.be/VIDEO_ID
#         return url.split("/")[-1]
#     return None

# @transcribe_bp.route('/youtube_summarize', methods=['POST'])
# def youtube_summarize():
#     data = request.json
#     video_url = data.get('video_url')
   
#     video_id = extract_video_id(video_url)
#     if not video_id:
#         return jsonify({'error': 'Invalid YouTube URL'}), 400
    
   
#     try:
#         transcript = YouTubeTranscriptApi.get_transcript(video_id)
#         transcript_text = ' '.join([t['text'] for t in transcript])

#         summary_text=summarize_text_content(transcript_text)
#         keywords = extract_keywords(transcript_text)


#         # Return the summary
#         return jsonify({'summary': summary_text,'transcription':transcript_text,'keywords':keywords})
    
#     except YouTubeTranscriptApi.CouldNotRetrieveTranscript as e:
#         return jsonify({'error': 'Transcript could not be retrieved for the video.'}), 404
    
#     except Exception as e:
#         return jsonify({'error': f'An error occurred: {str(e)}'}), 500




import os
import tempfile
import requests
import time
from flask import Blueprint, request, jsonify
from bson import ObjectId
from deep_translator import GoogleTranslator
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from keybert import KeyBERT
from youtube_transcript_api import YouTubeTranscriptApi
from models.podcast_model import save_podcast
import assemblyai as aai


nltk.download('punkt')
nltk.download('stopwords')

nltk.download('averaged_perceptron_tagger')
aai.settings.api_key = "928c276d69644248940e11bc96929831"
transcriber = aai.Transcriber()
keyword_model = KeyBERT()

transcribe_bp = Blueprint('transcribe', __name__)

SUPPORTED_LANGUAGES = {
    'af': 'Afrikaans', 'sq': 'Albanian', 'am': 'Amharic', 'ar': 'Arabic',
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'hi': 'Hindi',
    'te':'Telugu'
}

# Create a Blueprint for translation routes


# Define character limit for each chunk
# CHUNK_SIZE = 4500  # Stay within the 5,000-character limit for safety

# def translate_text(text):
#     translator = Translator()
#     # Split the text into smaller chunks
#     chunks = [text[i:i+CHUNK_SIZE ] for i in range(0, len(text), CHUNK_SIZE )]
    
#     translated_chunks = []
#     for chunk in chunks:
#         translated = translator.translate(chunk, src='auto', dest='en')
#         translated_chunks.append(translated.text)
    
#     # Join the translated chunks back together
#     return ' '.join(translated_chunks)

def split_text(text, max_length=4500):
    """Splits the text into smaller chunks to avoid exceeding API limits"""
    # Split the text by sentences and join them back into chunks
    sentences = text.split('. ')
    chunks = []
    current_chunk = ""
    
    for sentence in sentences:
        if len(current_chunk + sentence) <= max_length:
            current_chunk += sentence + '. '
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence + '. '
    
    # Append the last chunk if any
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks

# Long Hindi text to translate

def translate_text(text):
# Split the text into smaller chunks
    text_chunks = split_text(text)

    # Initialize the Google Translator
    translator = GoogleTranslator(source='auto', target='en')

    # Translate each chunk and combine them
    translated_text = ""
    for chunk in text_chunks:
        translated_text += translator.translate(chunk) + " "


    return translated_text    





def extract_keywords(text, top_n=5):
    if not text:
        return []
    keywords = keyword_model.extract_keywords(text, keyphrase_ngram_range=(1, 2), top_n=top_n)
    return [keyword[0] for keyword in keywords]

def summarize_text_content(text, language='english', summary_percentage=25):
    """
    Summarizes the given text, ensuring the summary length is a specified percentage of the original text.

    Parameters:
        text (str): The input text to summarize.
        language (str): The language of the text (default: 'english').
        summary_percentage (int): Desired summary length as a percentage of the original text.

    Returns:
        tuple: Summary text and extracted keywords.
    """
    if not text:
        return None, None

    try:
        # Tokenize sentences and words
        stop_words = set(stopwords.words(language))
        words = word_tokenize(text.lower())
        sentences = sent_tokenize(text, language=language)
    except Exception as e:
        print(f"Error processing text: {e}")
        return None, None

    # Create a frequency table for words
    freq_table = {}
    for word in words:
        if word.isalnum() and word not in stop_words:
            freq_table[word] = freq_table.get(word, 0) + 1

    # Score sentences based on word frequencies
    sentence_scores = {}
    for sentence in sentences:
        sentence_score = sum(freq_table.get(word, 0) for word in word_tokenize(sentence.lower()))
        sentence_scores[sentence] = sentence_score

    # Calculate number of sentences for the summary
    num_summary_sentences = max(1, len(sentences) * summary_percentage // 100)

    # Select the top sentences for the summary
    top_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:num_summary_sentences]

    # Generate summary and keywords
    summary = ' '.join(top_sentences)
    keywords = [word for word, _ in sorted(freq_table.items(), key=lambda x: x[1], reverse=True)[:10]]

    return summary.strip(),keywords


@transcribe_bp.route('/transcribe', methods=['POST'])
def transcribe_podcast():
    try:
        # Fetch user ID, title, and language code from the request
        user_id = request.form.get("userId")
        title = request.form.get("title", "Untitled Podcast")
        language_code = request.form.get("language", "auto")  # Default to auto-detection

        # Validate user ID
        if not user_id:
            return jsonify({"message": "Missing userId"}), 400

        # If `userId` looks like a MongoDB ObjectId, validate it as such
        if len(user_id) == 24 and not ObjectId.is_valid(user_id):
            return jsonify({"message": "Invalid MongoDB ObjectId"}), 400

        # Check if file is present in the request
        if 'file' not in request.files:
            return jsonify({"message": "No file part"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"message": "No selected file"}), 400

        # Save the file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            temp_file.write(file.read())
            temp_file_path = temp_file.name

        # Step 1: Upload the file to AssemblyAI (if not already uploaded)
        upload_url = "https://api.assemblyai.com/v2/upload"
        headers = {'authorization': aai.settings.api_key}

        with open(temp_file_path, 'rb') as f:
            response = requests.post(upload_url, headers=headers, files={'file': f})

        if response.status_code == 200:
            audio_url = response.json()['upload_url']
            # Step 2: Request transcription
            transcription_url = "https://api.assemblyai.com/v2/transcript"
            data = {
                "audio_url": audio_url,
                "language_code": language_code,  # Use the provided language code
            }
            response = requests.post(transcription_url, json=data, headers=headers)

            if response.status_code == 200:
                transcript_id = response.json()['id']
                print("Transcription started...")

                # Step 3: Polling for the transcription result
                polling_url = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"
                while True:
                    time.sleep(5)  # Wait for 5 seconds before polling again
                    response = requests.get(polling_url, headers=headers)

                    status = response.json()['status']
                    if status == 'completed':
                        transcription = response.json()['text']
                        print("Transcription Completed!"+transcription)
                        break
                    elif status == 'failed':
                        return jsonify({"message": "Transcription Failed!"}), 500
            else:
                return jsonify({"message": f"Error requesting transcription: {response.status_code}"}), 500
        else:
            return jsonify({"message": f"Error uploading file: {response.status_code}"}), 500
        

        dup_transcription=''
        # Step 2: Generate summary from transcription
        if(language_code=='te' or language_code=='hi'):
            dup_transcription=translate_text(transcription)
            # print(dup_transcription)
            language_code='en'

            summary,keywords = summarize_text_content(dup_transcription,SUPPORTED_LANGUAGES[language_code])

        else:    
            summary,keywords = summarize_text_content(transcription,SUPPORTED_LANGUAGES[language_code])
        if not summary:
            summary = "Summary could not be generated."

        # Step 3: Extract keywords
        
        # keywords = extract_keywords(transcription)
        

        # Delete the temporary file after use
        os.remove(temp_file_path)

        # Save podcast data to database if needed
        # podcast_id = save_podcast(user_id, title, transcription, summary, keywords)

        return jsonify({
            "message": "Transcription and summary generation successful",
            "data": {
                "title": title,
                "transcription": transcription,
                "summary": summary,
                "keywords": keywords
            }
        }), 200

    except Exception as e:
        print("Error in transcription:", e)
        return jsonify({"message": "Something went wrong during transcription"}), 500


def extract_video_id(url):
    if "youtube.com" in url:
        if "v=" in url:
            return url.split("v=")[-1].split("&")[0]
    elif "youtu.be" in url:
        return url.split("/")[-1]
    return None


@transcribe_bp.route('/youtube_summarize', methods=['POST'])
def youtube_summarize():
    data = request.json
    video_url = data.get('video_url')
   
    video_id = extract_video_id(video_url)
    if not video_id:
        return jsonify({'error': 'Invalid YouTube URL'}), 400
    
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = ' '.join([t['text'] for t in transcript])

        summary_text = summarize_text_content(transcript_text)
        keywords = extract_keywords(transcript_text)

        # Return the summary
        return jsonify({'summary': summary_text, 'transcription': transcript_text, 'keywords': keywords})
    
    except YouTubeTranscriptApi.CouldNotRetrieveTranscript as e:
        return jsonify({'error': 'Transcript could not be retrieved for the video.'}), 404
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
