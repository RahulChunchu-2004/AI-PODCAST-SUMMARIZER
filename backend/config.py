# config.py

import os
from pymongo import MongoClient

SECRET_KEY = "test"  # Replace with a secure key
MONGO_URI = "mongodb+srv://saiprasadbandari2003:3400@podcastsummarizercluste.zcmga.mongodb.net/?retryWrites=true&w=majority"

# MongoDB setup
client = MongoClient(MONGO_URI)
db = client["podcast_summarizer"]
