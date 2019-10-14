from flask import Flask, session, g, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_cors import CORS
import unittest

db = SQLAlchemy()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
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

    # @app.after_request
    # def add_header(response):
    #     """
    #     Add headers to both force latest IE rendering engine or Chrome Frame,
    #     and also to cache the rendered page for 10 minutes.
    #     """
    #     response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    #     response.headers['Cache-Control'] = 'public, max-age=0'
    #     return response

    # from app.models import Users
    # @app.before_request
    # def before_request():
    #     if "idUser" in session:
    #         g.id_user = session["idUser"]
    #         users = Users.query.filter_by(id__user=g.id_user).first()
    #         if users is None:
    #             session.pop("username")
    #             return 
    #         g.username = users.username__user
    #         g.role_user = users.role_user
    #     else:
    #         g.username = None
    #         g.id_user = None
    #         g.role_user = None

    @app.route('/')
    def index():
        #A ESTO HAY QUE DARLE OTRO USO QUEDA PENDIENTEEE
        return jsonify('que rollo')

    return app
