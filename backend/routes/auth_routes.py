# routes/auth_routes.py

from flask import Blueprint, request, jsonify
from models.user import find_user_by_email, create_user, check_password
import jwt
import datetime
from config import SECRET_KEY

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = find_user_by_email(email)
    if not user:
        return jsonify({"message": "User doesn't exist"}), 404

    stored_hash = user["passwordHash"]
    if not check_password(stored_hash, password):
        return jsonify({"message": "Invalid credentials"}), 400

    token = jwt.encode(
        {"email": user["email"], "id": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"result": {"email": user["email"], "id": str(user["_id"])}, "token": token}), 200

@auth_bp.route('/register', methods=['POST'])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    first_name = data.get("firstName")
    last_name = data.get("lastName")

    if find_user_by_email(email):
        return jsonify({"message": "User already exists"}), 400

    if password != confirm_password:
        return jsonify({"message": "Passwords don't match"}), 400

    user_id = create_user(email, password, f"{first_name} {last_name}")

    token = jwt.encode(
        {"email": email, "id": user_id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"result": {"email": email, "name": f"{first_name} {last_name}"}, "token": token}), 201
