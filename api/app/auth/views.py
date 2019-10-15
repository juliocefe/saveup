
from flask import (
    Blueprint, session, g, 
    request, render_template, redirect, url_for, jsonify,make_response )
from werkzeug.security import generate_password_hash, check_password_hash

from app.models import Users
from . import auth
import datetime
import jwt 
# Por que este si se puede importar?
from run import app
print("what is app right now? : ", app)
@auth.route('/logout')
def logout():
    session.pop("idUser", None)
    session.pop("username", None)
    if g.id_user and g.role_user:
        g.id_user = None
        g.role_user = None
    return redirect(url_for('auth.login'))

@auth.route('/login', methods=['POST'])
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = Users.query.filter_by(username__user=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if check_password_hash(user.password__user, auth.password):
        token = jwt.encode({'id' : user.id__user, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
