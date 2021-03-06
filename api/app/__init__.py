from flask import Flask, session, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from datetime import timedelta

# ESTO NO SE SI SEA LO MEJOR PERO ME FUNCIONA
# Cree esta variables globales para que no truene mi aplicación, esto resuelve 
# un problema de flujo de la app, ya que los blueprints son importados antes que todo(cuando creamos la app,
# en la funcón create_app) no se puede importar antes en los blue prints blueprints algo que estás creando después.
#  NO PUEDES TENER IMPORTADO NADA QUE SEA CREA DESPUES, POR ESO IMPORTO ALGO Null que después tomará una valor 0.0
# token_required = None

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
    else:
        #Esto es interesante investigar más si tienes tiempo
        # load the test config if passed in
        app.config.from_mapping(test_config)

    from app.models import Users

    db.init_app(app)

    #migrations object
    migrate = Migrate(app, db)

    # JWD
    jwt = JWTManager(app)

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