from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime

client = MongoClient("mongodb+srv://saiprasadbandari2003:3400@podcastsummarizercluste.zcmga.mongodb.net/?retryWrites=true&w=majority")
db = client["podcast_summarizer"]
podcasts_collection = db["podcasts"]

def save_podcast(user_id, title, transcription, summary, keywords):
    """Save a podcast transcription in the database."""
    podcast_data = {
        "title": title,
        "transcription": transcription,
        "summary": summary,
        "keywords": keywords,
        "createdAt": datetime.datetime.utcnow()
    }

    # Check if user_id is a valid ObjectId
    if ObjectId.is_valid(user_id) and len(user_id) == 24:
        podcast_data["userId"] = ObjectId(user_id)  # MongoDB ObjectId
    else:
        podcast_data["googleId"] = user_id  # Google ID or other string identifier

    return podcasts_collection.insert_one(podcast_data)


def get_podcasts_by_user(user_id):
    """Fetch saved podcasts by user ID or Google ID."""
    query = {}

    # Check if user_id is a valid ObjectId
    if ObjectId.is_valid(user_id) and len(user_id) == 24:
        query["userId"] = ObjectId(user_id)  # MongoDB ObjectId
    else:
        query["googleId"] = user_id  # Google ID or other string identifier
    print(f"Querying database with: {query}")    

    return list(podcasts_collection.find(query))

