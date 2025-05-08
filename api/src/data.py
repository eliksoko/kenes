from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import Config
import requests

db = SQLAlchemy()
jwt = JWTManager()

class User(db.Model):
    username = db.Column(db.String(60), unique=True, nullable=False, primary_key=True)
    password = db.Column(db.String(60), nullable=False)

def email(to, subject, content):
    return requests.post(Config.EMAIL_API_URL, headers={'X-API-Key': Config.EMAIL_API_KEY}, data={
        'from': f'No-reply <{Config.EMAIL_SENDER}>',
        'to': to,
        'subject': subject,
        'plain': content,
    }).json()