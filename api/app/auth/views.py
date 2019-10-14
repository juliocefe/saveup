
from flask import (
    Blueprint, session, g, request, render_template, redirect, url_for, jsonify )
from werkzeug.security import generate_password_hash, check_password_hash

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

@auth.route('/login', methods=['GET','POST'])
def login():
    if request.method == "POST":
        user = Users.query.filter_by(username__user=request.form["username"]).first()
        if user and check_password_hash(user.password__user, request.form["password"]):
            session["username"] = user.username__user
            session["idUser"] = user.id__user
            return jsonify('logged!'), 200
        else:
            return jsonify('no logueado!'), 404
    else:
        return "Method not allowed"