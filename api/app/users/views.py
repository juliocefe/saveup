from flask import request, render_template, url_for, g, flash, redirect, session, jsonify
from werkzeug.security import generate_password_hash

from app import db
from app.models import Users, DateNow

from . import users

@users.route('/newUser', methods=['GET','POST'])
def new_user():
    if request.method == 'POST':
        username = request.form["username"]
        existent_user = Users.query.filter_by(username__user=username).first()
        if request.form['password1'] != request.form['password2']:
            return jsonify('Passwords do not match'), 401
        if existent_user is None:
            #hash the password
            hashed_pw = generate_password_hash(request.form["password1"], method="sha256")
            #create a new user from clas User
            new_user = Users(username__user=username,
                                    name__user = request.form['name'],
                                    lastname__user = request.form['lastname'], 
                                    password__user=hashed_pw,
                                    phone_number__user=request.form['phone'],
                                    email__user=request.form['email'])
            #save the user in the database
            db.session.add(new_user)
            db.session.commit()
            return jsonify("The user has beeen registered successfully.")
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
def render_users():
    users = Users.query.all()
    userList = []
    for user in users:
        dic = {
            'username': user.username__user
        }
        userList.append(dic)

    return jsonify(userList)