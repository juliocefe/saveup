from flask import request, jsonify, make_response
import datetime
from functools import wraps
import jwt
from flask_sqlalchemy import SQLAlchemy
import uuid
from models import Users
from app import app


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        # try: 
        data = jwt.decode(token, app.config['SECRET_KEY'])
        print(data)
        current_user = Users.query.filter_by(id__user=data['id__user']).first()
        # except:
        #     return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated