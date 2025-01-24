# routes/__init__.py

from .auth_routes import auth_bp
from .transcribe_route import transcribe_bp  # Import the transcription routes
from .saved_podcasts_route import saved_podcasts_bp
from .savePodcast_route import save_bp
from .translate_route import translate_bp
# from .youtube_route import youtube_bp
from .transcription_routes import transcription_bp

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(transcribe_bp)  # Register the transcription blueprint
    app.register_blueprint(save_bp)
    app.register_blueprint(saved_podcasts_bp,url_prefix='/api')
    app.register_blueprint(translate_bp)
    # app.register_blueprint(youtube_bp,url_prefix='/')
    app.register_blueprint(transcription_bp)

