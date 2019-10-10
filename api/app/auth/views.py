
from flask import (
    Blueprint, session, g, request, render_template, redirect, url_for )
from werkzeug.security import generate_password_hash, check_password_hash

from .forms import LoginForm
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
        user = Users.query.filter_by(username_user=request.form["username"]).first()
        if user and check_password_hash(user.password_user, request.form["password"]):
            session["username"] = user.username_user
            session["idUser"] = user.id_user
            if user.role_user == 'Process':
                return redirect(url_for('process.render_proces'))
            return redirect(url_for('users.render_users'))
        else:
            # Send a class for animation
            error='animated shake fast error-password'
            return redirect(url_for('auth.login', error=error))
    elif request.method == "GET":
        if "idUser" in session:
            print('hay session')
        login_form = LoginForm()
        context = {
            'login_form': login_form
        }
        return render_template("login.html", **context, error=request.args.get('error'))
    else:
        return "Method not allowed"