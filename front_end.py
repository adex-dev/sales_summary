from flask import (Flask, url_for, redirect, session, Response)
from dotenv import load_dotenv
from flask_session import Session
from config.routing import app
from datetime import timedelta
import os
import htmlmin
load_dotenv()

apps = Flask(__name__,static_url_path='/resources', static_folder='resources')
port = os.getenv('FLASK_RUN_PORT')
host = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
base_url = f'http://{host}:{port}'
debug = os.getenv('FLASK_RUN_DEBUG')
apps.secret_key = os.getenv('SECRET_KEY', 'akmad_nudin')
apps.config['SESSION_TYPE'] = 'filesystem'
apps.config['BASE_URL'] = base_url
apps.config['SESSION_PERMANENT'] = False
apps.config['SESSION_USE_SIGNER'] = True
apps.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=60)

@apps.before_request
def before_request():
    session.permanent = True

@apps.after_request
def after_request(response):
    if response.content_type == 'text/html; charset=utf-8':
        minified_html = htmlmin.minify(
            response.get_data(as_text=True),
            remove_comments=True,
            remove_empty_space=True,
            remove_all_empty_space=True,
        )
        response.set_data(minified_html)
    return response

def handle_exceptions(e):
    x = f"Exception: {str(e)}"
    logging.error(x)
    return x

Session(apps)
apps.register_blueprint(app)
if __name__ == 'main':
    app.run(host=host, port=port, debug=debug)
