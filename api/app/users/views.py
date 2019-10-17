from flask import (request, 
        render_template, url_for, 
        g, flash, redirect, session, jsonify, make_response, current_app )
from werkzeug.security import generate_password_hash

from app import db
from app.models import Users, DateNow
import jwt
import datetime

from . import users
from app import token_required

@users.route('/newUser', methods=['GET','POST'])
def new_user():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if request.method == 'POST':
        jsonRequest = request.get_json()
        username = jsonRequest['username']
        existent_user = Users.query.filter_by(username__user=username).first()
        if jsonRequest['password1'] != jsonRequest['password2']:
            return jsonify('Passwords do not match'), 401
        if existent_user is None:
            #hash the password
            hashed_pw = generate_password_hash(jsonRequest["password1"], method="sha256")
            #create a new user from clas User
            new_user = Users(username__user=username,
                                    name__user = jsonRequest['name'],
                                    lastname__user = jsonRequest['lastname'], 
                                    password__user=hashed_pw,
                                    phone_number__user=jsonRequest['phone'] if 'phone' in jsonRequest else '',
                                    email__user=jsonRequest['email'] if 'email' in jsonRequest else None)
            #save the user in the database
            token = jwt.encode(
                {
                    'id' : new_user.id__user, 
                    'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, 
                current_app.config['SECRET_KEY'])
            db.session.add(new_user)
            db.session.commit()
            return jsonify(
                {
                    "message":"The user has beeen registered successfully.", 
                    "token":token.decode('UTF-8'),
                    "username": new_user.username__user
                }
                ), 201
        else:
            return jsonify("The user already exists."),303
    else:
        return "Method not allowed"

@users.route('/updateUser', methods=['POST', 'PUT'])
def update_user(): 
    existent_user = Users.query.filter_by(username__user=request.form["username"]).first()
    #IF the user founded and the id received are diffrents, means that is other user and exists
    if existent_user and ( str(existent_user.id_user) != str(request.form["id"]) ):
        return jsonify("The user already exists."),303
    else:
        if request.form['password1'] != request.form['password2']:
            return jsonify('Passwords do not match')
        #Get the user from the database
        updating_user = Users.query.filter_by(id__user=request.form["id"]).first()
        if request.form['password1'] != '':
            #hash the password
            hashed_pw = generate_password_hash(request.form["password1"], method="sha256")
            updating_user.password__user = hashed_pw
        updating_user.username__user = request.form['username']
        updating_user.role__user = request.form['role']
        #save the user in the database
        db.session.add(updating_user)
        db.session.commit()
        return jsonify("The user has beeen updated successfully.")

#DELETE USER
@users.route('/deleteUser/<int:id>', methods=["DELETE"])
def delete_user(id):
    deleting_user = Users.query.filter_by(id__user=id).first()
    if delete_user is None:
        return "The user was not found.", 400
    db.session.delete(deleting_user)
    db.session.commit()
    return jsonify("The user has been deleted successfully!."), 200

@users.route('/users')
@token_required
def render_users(current_user):
    # current user probablemente lo vayamos a usar después para validar roles
    users = Users.query.all()
    userList = []
    for user in users:
        dic = {
            'username': user.username__user
        }
        userList.append(dic)

    return jsonify(userList)