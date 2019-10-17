from flask import Flask, session, g, redirect, url_for, request, make_response, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_cors import CORS
import unittest
import datetime
from functools import wraps
import jwt
import uuid
import os

# ESTO NO SE SI SEA LO MEJOR PERO ME FUNCIONA
# Cree esta variables globales para que no truene mi aplicación, esto resuelve 
# un problema de flujo de la app, ya que los blueprints son importados antes que todo(cuando creamos la app,
# en la funcón create_app) no se puede importar antes enlos blue prints blueprints algo que estás creando después.
#  NO PUEDES TENER IMPORTADO NADA QUE SEA CREA DESPUES, POR ESO IMPORTO ALGO Null que después tomará una valor 0.0
token_required = None

db = SQLAlchemy()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, 
            instance_relative_config=True,
            static_folder= './templates/build/static')
    # Enable CORS
    CORS(app)
    if test_config is None:
        # load the instance config, if it exists, when not testing
        # Load the default configuration
        app.config.from_object('config.default')
        # Load the development configuration
        app.config.from_object('config.development')
        # Load the configuration from the instance folder and will overwrite the previous configurations
        app.config.from_pyfile('config.py')
    else:
        #Esto es interesante investigar más si tienes tiempo
        # load the test config if passed in
        app.config.from_mapping(test_config)

    from app.models import Users
    def token_required_FAKE(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if 'x-access-token' in request.headers:
                token = request.headers['x-access-token']

            if not token:
                return jsonify({'message' : 'Token is missing!'}), 401

            try: 
                data = jwt.decode(token, app.config['SECRET_KEY'])
                current_user = Users.query.filter_by(id__user=data['id']).first()
            except:
                return jsonify({'message' : 'Token is invalid!'}), 401

            return f(current_user, *args, **kwargs)
        return decorated

    global token_required 
    token_required = token_required_FAKE

    db.init_app(app)

    #migrations object
    migrate = Migrate(app, db)

    from app.auth import auth
    app.register_blueprint(auth)
    from app.users import users
    app.register_blueprint(users)
    from app.lists import lists
    app.register_blueprint(lists)
    from app.products import products
    app.register_blueprint(products)

    # Serve React App
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if session:
            if path != "" and os.path.exists("./templates/build/" + path):
                return send_from_directory('./templates/build', path)
            else:
                return send_from_directory('./templates/build', 'index.html')
        else:
            return send_from_directory('./templates/build/', 'index.html')


    return app