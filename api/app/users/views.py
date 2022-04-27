from flask import (
    request,
    jsonify,
    current_app
)
from werkzeug.security import generate_password_hash
from app import db
from app.models import Users
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import jwt
import datetime
from . import users


@users.route('/newUser', methods=['GET','POST'])
def new_user():
    if request.method == 'POST':
        username = request.json.get("username", None)
        password1 = request.json.get("password1", None)
        password2 = request.json.get("password2", None)
        
        existent_user = Users.query.filter_by(username__user=username).first()
        if password1 != password2:
            return jsonify('Passwords do not match'), 401
        if existent_user is None:
            #hash the password
            hashed_pw = generate_password_hash(str(password1), method="sha256")
            #create a new user from clas User
            new_user = Users(
                username__user=username,
                name__user = request.json.get('name'),
                lastname__user = request.json.get('lastname'),
                password__user=hashed_pw,
                phone_number__user=request.json.get("phone", ''),
                email__user=request.json.get("email", None)
            )
            #save the user in the database
            db.session.add(new_user)
            db.session.commit()

            token = create_access_token(identity=new_user.id__user)

            return jsonify(
                {
                    "message":"The user has beeen registered successfully.", 
                    "token": token,
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


@users.route('/')
@jwt_required()
def render_users():
    # current user probablemente lo vayamos a usar después para validar roles
    users_db = Users.query.all()
    users = []
    for user in users_db:
        user_d = {
            'username': user.username__user
        }
        users.append(user_d)

    return jsonify({
        "current_user": get_jwt_identity(),
        "users": users
    })