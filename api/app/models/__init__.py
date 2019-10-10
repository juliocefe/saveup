from app import db
from sqlalchemy  import Integer, BigInteger, Float, String, \
Text, DateTime, Boolean, Enum, Column, ForeignKey, LargeBinary, Float, DECIMAL, Enum

import datetime
from pytz import timezone

def DateNow(full=None):
    hermosillo = timezone('America/Hermosillo')
    today = str(datetime.datetime.now(hermosillo))
    if full is None:
        #format y/m/d
        today = today[0:19]
    else:
        #format y/m/d h/m/s
        today = today[0:28]
    return today

class Users(db.Model):
    __tablename__ = 'users'
    id_user = db.Column(Integer, primary_key=True)
    username_user = db.Column(String(50), nullable=False)
    password_user = db.Column(String(250), nullable=False)
    role_user = db.Column(Enum('User', 'Administrator', 'Process'), nullable=False)
    created_date_user = db.Column(DateTime, nullable=False, default=DateNow())
    updated_date_user = db.Column(DateTime, nullable=True )
    logs = db.relationship('Logs', backref='user', lazy=True)
    
class Logs(db.Model):
    __tablename__ = 'logs'
    id_log = db.Column(Integer, primary_key=True)
    action = db.Column(String(50), nullable=False)
    id_user_fk_logs = db.Column(db.Integer, db.ForeignKey('users.id_user'), nullable=False)
    created_date_log = db.Column(DateTime, nullable=False, default=DateNow(True))



