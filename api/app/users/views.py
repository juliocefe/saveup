from flask import request, render_template, url_for, g, flash, redirect, session, jsonify
from werkzeug.security import generate_password_hash

from app import db
from .forms import UpdateUserForm, NewUserFrom
from app.models import Users, DateNow

from . import users

@users.route('/newUser', methods=['GET','POST'])
def new_user():
    newUserForm = NewUserFrom()
    context = {
        'newUserForm': newUserForm
    }
    if request.method == 'POST':
        #app.config['TESTING'] lo hice para que no me tronaran las pruebas unitarias
        #mientras encuentro la forma de evadir la session
        if newUserForm.validate_on_submit:
            username = request.form["username"]
            existent_user = Users.query.filter_by(username_user=username).first()
            if request.form['password1'] != request.form['password2']:
                flash('Passwords do not match', 'warning')
                #Redireccionando no pude mandar los codigos http solo me funcionó de esta manera
                #redirect solo acepta codigos 301-308, si no te pone una pagina fea
                #No esta mal pero yo quería usar redirect 
                return render_template('new_user.html', **context), 401
            if existent_user is None:
                #hash the password
                hashed_pw = generate_password_hash(request.form["password1"], method="sha256")
                #create a new user from clas User
                new_user = Users(username_user=username, 
                                        role_user=request.form['role'],
                                        created_date_user=DateNow(True), password_user=hashed_pw)
                #save the user in the database
                db.session.add(new_user)
                db.session.commit()
                flash("The user has beeen registered successfully.", 'success')
                return redirect(url_for('users.render_users'))
            else:
                flash("The user already exists.", 'danger')
                return redirect(url_for('users.new_user'), code=303)
        else:
            #Mejorar esto, pero ya no tengo tiempo
            return "nop"
    elif request.method == 'GET':
        return render_template('new_user.html', **context)
    else:
        return "Method not allowed"

@users.route('/updateUser', methods=['POST', 'PUT'])
def update_user(): 
    updateUserForm = UpdateUserForm()  
    if updateUserForm.validate_on_submit:
        existent_user = Users.query.filter_by(username_user=request.form["username"]).first()
        #IF the user founded and the id received are diffrents, means that is other user and exists
        if existent_user and ( str(existent_user.id_user) != str(request.form["id"]) ):
            flash("The user already exists.", 'danger')
            return redirect(url_for('users.edit_user', idUser=request.form["id"]), code=303 )
        else:
            if request.form['password1'] != request.form['password2']:
                flash('Passwords do not match', 'warning')
                return redirect(url_for('users.edit_user', idUser=request.form["id"]) )
            #Get the user from the database
            updating_user = Users.query.filter_by(id_user=request.form["id"]).first()
            if request.form['password1'] != '':
                #hash the password
                hashed_pw = generate_password_hash(request.form["password1"], method="sha256")
                updating_user.password_user = hashed_pw
            updating_user.username_user = request.form['username']
            updating_user.role_user = request.form['role']
            updating_user.updated_date_user = DateNow(True)
            #save the user in the database
            db.session.add(updating_user)
            db.session.commit()
            flash("The user has beeen updated successfully.", 'success')
            return redirect(url_for('users.render_users'))
    else:
        #Mejorar esto, pero ya no tengo tiempo
        return "nop"

@users.route('/editUser/<int:idUser>')
def edit_user(idUser):
    updateUserForm = UpdateUserForm()
    values=Users.query.filter_by(id_user=idUser).first()
    context = {
        'values': values,
        'updateUserForm': updateUserForm
    }
    return render_template('update_user.html', **context)

#DELETE USER
@users.route('/deleteUser/<int:id>', methods=["DELETE"])
def delete_user(id):
    deleting_user = Users.query.filter_by(id_user=id).first()
    if delete_user is None:  
        return "The user was not found.", 400    
    db.session.delete(deleting_user)
    db.session.commit()
    return jsonify("The user has been deleted successfully!."), 200

@users.route('/users')
def render_users():
    users = Users.query.all()
    return render_template('users.html', usersList=users)