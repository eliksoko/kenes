import os

class Config:
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_HTTPONLY = True
    JWT_COOKIE_SECURE = True
    JWT_COOKIE_SAMESITE = 'Strict'
    JWT_COOKIE_CSRF_PROTECT= False

    FLASK_DEBUG = os.environ.get('FLASK_DEBUG', 0)
    FLASK_RUN_HOST = os.environ.get('FLASK_RUN_HOST', '0.0.0.0')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', 5000)
    STATIC_FOLDER = os.environ.get('STATIC_FOLDER', '../dist')

    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'sqlite:///data.db')
    
    EMAIL_API_KEY = os.environ.get('EMAIL_API_KEY')
    EMAIL_API_URL = os.environ.get('EMAIL_API_URL')
    EMAIL_SENDER = os.environ.get('EMAIL_SENDER')