# from mongoengine import Document, StringField, connect

# # Connect to MongoDB
# connect(db="users", host="mongodb+srv://saiprasadbandari2003:3400@podcastsummarizercluste.zcmga.mongodb.net/users?retryWrites=true&w=majority&appName=PodcastSummarizerCluster")

# class User(Document):
#     name = StringField(required=True)
#     email = StringField(required=True)
#     password = StringField(required=True)
#     id = StringField()


# models/user.py

from config import db
import bcrypt

users_collection = db["users"]

def find_user_by_email(email):
    """Finds a user by email in the database."""
    return users_collection.find_one({"email": email})

def create_user(email, password, name):
    """Creates a new user with hashed password and returns the user ID."""
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    result = users_collection.insert_one({
        "email": email,
        "passwordHash": hashed_password,
        "name": name
    })
    return str(result.inserted_id)

def check_password(stored_hash, password):
    """Checks if the provided password matches the stored hash."""
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8'))
