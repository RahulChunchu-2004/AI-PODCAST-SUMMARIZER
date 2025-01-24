from flask import Blueprint, jsonify, request
from models.podcast_model import get_podcasts_by_user

saved_podcasts_bp = Blueprint('saved_podcasts', __name__)

@saved_podcasts_bp.route('/saved_podcasts', methods=['GET'])
def get_saved_podcasts():
    user_id = request.args.get("userId")  # Extract user_id from the request query params

    try:
        print(f"Received userId: {user_id}")
        podcasts = get_podcasts_by_user(user_id)
        # Format each podcast for easy reading
        formatted_podcasts = [{
            "podcastId": str(podcast["_id"]),
            "title": podcast["title"],
            "transcription": podcast["transcription"],
            "summary": podcast["summary"],
            "keywords": podcast["keywords"],
            "createdAt": podcast["createdAt"]
        } for podcast in podcasts]

        return jsonify({"savedPodcasts": formatted_podcasts}), 200

    except Exception as e:
        print("Error fetching saved podcasts:", e)
        return jsonify({"message": "Error retrieving saved podcasts"}), 500
