from flask import Blueprint, abort, redirect,send_from_directory, url_for
from .config import Config
import os

web = Blueprint("web", __name__, static_folder=os.path.join('..', Config.STATIC_FOLDER))

@web.route('/', defaults={'path': ''})
@web.route('/<path:path>')
def route(path):
    if path.startswith('api'):
        return redirect('/')
    if path != "" and os.path.exists(web.static_folder + '/' + path):
        return send_from_directory(web.static_folder, path)
    else:
        return send_from_directory(web.static_folder, 'index.html')
