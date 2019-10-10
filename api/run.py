#!/usr/bin/python3
from flask_script import Manager, Server
from flask import session, g, redirect, url_for
import unittest
from flask_migrate import MigrateCommand

from app import create_app
from app.models import Users

app = create_app()

#Create database conection object
manager = Manager(app)
manager.add_command('db', MigrateCommand)
manager.add_command("runserver", Server(port=5000, threaded=True))

#Dejar de usar esta librearía y usar la offical de flask
# https://flask.palletsprojects.com/en/1.1.x/cli/
@manager.command
def test():
    tests = unittest.TestLoader().discover('app/tests')
    unittest.TextTestRunner().run(tests)

if __name__ == "__main__":
    manager.run()