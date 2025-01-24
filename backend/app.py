from flask import Flask

from flask_cors import CORS
from routes import register_routes

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
app.secret_key = "your_secret_key"  # Replace with a secure secret key

# Register routes
register_routes(app)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
