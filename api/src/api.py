import bcrypt
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_refresh_token, set_access_cookies, create_access_token, get_jwt_identity, jwt_required, set_refresh_cookies, unset_jwt_cookies, unset_refresh_cookies
from .config import Config
from .data import User,db,jwt,email

api = Blueprint("api", __name__, url_prefix='/api')

@jwt.unauthorized_loader
def unauthorized_callback():
    return jsonify({'error': 'Unauthorized'}), 401

@api.route('/signout', methods=['POST'])
@jwt_required()
def signout():
    res = jsonify({"error": False})
    unset_refresh_cookies(res)
    unset_jwt_cookies(res)
    return res, 200

@api.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password):
        return jsonify({'error': 'Bad username or password'}), 401
    res = jsonify({
        "error": False, 
        "username": user.password
    })
    set_access_cookies(res, create_access_token(identity=user.username))
    set_refresh_cookies(res, create_refresh_token(identity=user.username)) 
    return res, 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt(12))
    user = User(username=data['username'], password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"error": False}), 201

@api.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    access = create_access_token(identity=get_jwt_identity())
    res = jsonify({"error": False})
    set_access_cookies(res, access)
    return res, 200