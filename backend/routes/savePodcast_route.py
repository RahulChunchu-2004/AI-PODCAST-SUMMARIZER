# In your existing Blueprint, add this import if not already present
from flask import Blueprint, request, jsonify
from models.podcast_model import save_podcast

# Define the new route for saving podcasts
save_bp = Blueprint('save', __name__)
@save_bp.route('/api/save_podcast', methods=['POST'])
def save_podcast_route():
    try:
        data = request.get_json()  # Parse JSON data
        user_id = data.get('userId')
        title = data.get('title', 'Untitled Podcast')
        transcription = data.get('transcription')
        summary = data.get('summary')
        keywords = data.get('keywords')

        # Save to the database
        podcast_id = save_podcast(user_id, title, transcription, summary, keywords)

        return jsonify({
            "message": "Podcast saved successfully",
            "podcastId": str(podcast_id.inserted_id)
        }), 200

    except Exception as e:
        print("Error saving podcast:", e)
        return jsonify({"message": "Error saving podcast"}), 500
