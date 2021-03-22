import sys
import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from db_id.config import Config
from flask_msearch import Search


db = SQLAlchemy()
ma = Marshmallow()
#search = Search()

def create_app(config_class=Config):
    if getattr(sys, 'frozen', False):

        # db_path = os.path.join(os.path.dirname(__file__), '../app_data.db')
        # only run as an executable
        template_folder = os.path.join(sys._MEIPASS, os.path.dirname(__file__), '../templates')
        static_folder = os.path.join(sys._MEIPASS, os.path.dirname(__file__), '../static')

        print(template_folder)
        print(static_folder)

        app = Flask(__name__, template_folder=template_folder, static_folder=static_folder)

    else:
        app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    with app.app_context():
        db.create_all()
    ma.init_app(app)
    #search.init_app(app)

    #Cors support
    # TODO:: do better
    ORIGINS = [
        'http://localhost:8080',  # React
        'http://127.0.0.1:8080',  # React
    ]

    CORS(app, resources={r'/*': {'origins': ORIGINS}}, supports_credentials=True)

    #Cors support

    from db_id.items.routes import items
    from db_id.main.routes import main

    app.register_blueprint(items)
    app.register_blueprint(main)


    return app
