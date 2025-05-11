from dotenv import load_dotenv

load_dotenv('./.env.example')

from flask import Flask, jsonify
from flask_cors import CORS
from src.config import Config
from src.data import db, jwt
from src.api import api
from src.web import web

app = Flask(__name__, static_folder=Config.STATIC_FOLDER)
app.config.from_object(Config)

db.init_app(app)
with app.app_context():
    db.create_all()

jwt.init_app(app)
@jwt.unauthorized_loader
def unauthorized_callback(e):
    return jsonify({ "error": e }), 401
@jwt.invalid_token_loader
def invalid_token_callback(e):
    return jsonify({ "error": e }), 422
@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({ "error": "Token has expired" }), 401

CORS(app, supports_credentials=True)
app.register_blueprint(api)
app.register_blueprint(web)

if __name__ == "__main__":
    app.run(port=Config.FLASK_RUN_PORT, host=Config.FLASK_RUN_HOST, debug=Config.FLASK_DEBUG)
