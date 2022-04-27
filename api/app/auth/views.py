from flask import (session, g, 
    request, 
    redirect, 
    url_for, 
    jsonify 
)
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from app.models import Users
from . import auth


@auth.route('/logout')
def logout():
    session.pop("idUser", None)
    session.pop("username", None)
    if g.id_user and g.role_user:
        g.id_user = None
        g.role_user = None
    return redirect(url_for('auth.login'))


@auth.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Users.query.filter_by(username__user=username).first()
    if not user or not check_password_hash(user.password__user, password):
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=username)
    print("access_token")
    return jsonify(access_token=access_token)