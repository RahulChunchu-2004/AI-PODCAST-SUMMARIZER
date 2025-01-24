# transcription_routes.py
from flask import Blueprint, request, jsonify
import requests
import json
import time
import os

transcription_bp = Blueprint('transcription', __name__)

LISTENNOTES_EPISODE_ENDPOINT = 'https://listen-api.listennotes.com/api/v2/episodes'
ASSEMBLYAI_TRANSCRIPT_ENDPOINT = 'https://api.assemblyai.com/v2/transcript'

headers_listennotes = {'X-ListenAPI-Key': "312d6594793240a084f7bca8c4a079cc"}
headers_assemblyai = {"authorization": "928c276d69644248940e11bc96929831", "content-type": "application/json"}

# Global variable to store the filename
current_filename = None

def get_episode_audio_url(episode_id):
    url = f"{LISTENNOTES_EPISODE_ENDPOINT}/{episode_id}"
    response = requests.get(url, headers=headers_listennotes)
    data = response.json()
    audio_url = data['audio']
    thumbnail = data['thumbnail']
    podcast_title = data['podcast']['title']
    episode_title = data['title']
    return audio_url, thumbnail, podcast_title, episode_title

def transcribe(audio_url, auto_chapters=False):
    transcript_request = {'audio_url': audio_url, 'auto_chapters': auto_chapters}
    response = requests.post(ASSEMBLYAI_TRANSCRIPT_ENDPOINT, json=transcript_request, headers=headers_assemblyai)
    return response.json().get('id')

def poll_transcription(transcript_id):
    while True:
        polling_url = f"{ASSEMBLYAI_TRANSCRIPT_ENDPOINT}/{transcript_id}"
        polling_response = requests.get(polling_url, headers=headers_assemblyai)
        data = polling_response.json()
        if data['status'] == 'completed':
            return data
        time.sleep(60)

def save_transcription_data(transcript_data, audio_url, thumbnail, podcast_title, episode_title):
    global current_filename 
    filename = f"{transcript_data['id']}_chapters.json"
    current_filename = filename 
    with open(filename, 'w') as f:
        json.dump({
            'audio_url': audio_url,
            'thumbnail': thumbnail,
            'podcast_title': podcast_title,
            'episode_title': episode_title,
            'chapters': transcript_data.get('chapters', [])
        }, f, indent=4)

@transcription_bp.route('/transcribe2', methods=['POST'])
def transcribe_podcast():
    episode_id = request.json.get('episode_id')
    if not episode_id:
        return jsonify({"error": "Episode ID required"}), 400
    audio_url, thumbnail, podcast_title, episode_title = get_episode_audio_url(episode_id)
    transcript_id = transcribe(audio_url, auto_chapters=True)
    transcript_data = poll_transcription(transcript_id)
    save_transcription_data(transcript_data, audio_url, thumbnail, podcast_title, episode_title)
    return jsonify({"message": "Transcription completed", "transcript_id": transcript_id})

@transcription_bp.route('/summaries', methods=['GET'])
def get_summary():
    global current_filename  # Use the global filename variable
    if current_filename and os.path.exists(current_filename):
        with open(current_filename, 'r') as f:
            summary = json.load(f)
        return jsonify(summary)
    else:
        return jsonify({"error": "No summary found or transcription not completed yet"}), 404
