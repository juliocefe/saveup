from app import db
from sqlalchemy  import Integer, BigInteger, Float, String, \
Text, DateTime, Boolean, Enum, Column, ForeignKey, LargeBinary, Float, DECIMAL, Enum
from sqlalchemy.dialects.mysql import LONGTEXT, DOUBLE

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
    id__user = db.Column(Integer, primary_key=True)
    username__user = db.Column(String(50), nullable=False)
    name__user = db.Column(String(50), nullable=False)
    lastname__user = db.Column(String(50), nullable=False)
    password__user = db.Column(String(250), nullable=False)
    role__user = db.Column(Enum('User', 'Administrator'), nullable=False, default='User')
    email__user = db.Column(String(30), nullable=True)
    phone_number__user = db.Column(String(20), nullable=False)
    lists = db.relationship('Lists', backref='user', lazy=True)
    
class Lists(db.Model):
    __tablename__ = 'lists'
    id__list = db.Column(Integer, primary_key=True)
    name__list = db.Column(String(50), nullable=True)
    fk_user__list = db.Column(db.Integer, db.ForeignKey('users.id__user'), nullable=False)
    created_date__list = db.Column(DateTime, nullable=False, default=DateNow(True))
    listDetails = db.relationship('ListDetails', backref='lists', lazy=True)

class ListDetails(db.Model):
    __tablename__ = 'list_details'
    id__list_details = db.Column(Integer, primary_key=True)
    fk_list__details_list = db.Column(db.Integer, db.ForeignKey('lists.id__list'), nullable=False)
    fk_product__details_list = db.Column(db.Integer, db.ForeignKey('product_details.id_product__details'), nullable=False)
    fk_super_market__list_details = db.Column(db.Integer, db.ForeignKey('super_markets.id__super_market'), nullable=False)
    
class Products(db.Model):
    __tablename__ = 'products'
    id__product = db.Column(Integer, primary_key=True)
    name__product = db.Column(String(50), nullable=False)
    brand__product = db.Column(String(50), nullable=False)
    unit__product = db.Column(String(50), nullable=False)
    image__product = db.Column(LONGTEXT, nullable=True)
    productDetails = db.relationship('ProductDetails', backref='products', lazy=True)

class ProductDetails(db.Model):
    __tablename__ = 'product_details'
    id_product__details = db.Column(Integer, primary_key=True)
    fk_product__product_detail = db.Column(db.Integer, db.ForeignKey('products.id__product'), nullable=False)
    fk_branch_office__product_detail = db.Column(db.Integer, db.ForeignKey('branch_offices.id__branch_office'), nullable=False)
    current_price__product_detail = db.Column(Float, nullable=False)
    listDetails = db.relationship('ListDetails', backref='product_details', lazy=True)

class SuperMarkets(db.Model):
    __tablename__ = 'super_markets'
    id__super_market = db.Column(Integer, primary_key=True)
    name__super_market = db.Column(String(50), nullable=False )
    latitude__super_market = db.Column(String(50), nullable=False)
    longitude__super_market = db.Column(String(50), nullable=False)
    phone__super_market = db.Column(String(50), nullable=True)
    fk_branch_office__super_market = db.Column(db.Integer, db.ForeignKey('branch_offices.id__branch_office'), nullable=False)
    listDetails = db.relationship('ListDetails', backref='super_markets', lazy=True)

class BranchOffices(db.Model):
    __tablename__ = 'branch_offices'
    id__branch_office = db.Column(Integer, primary_key=True)
    name__branch_office = db.Column(String(50), nullable=False)
    address__branc_office = db.Column(String(50), nullable=False, default='Unknown')
    phone__branch_office = db.Column(String(50), nullable=True)
    productDetails = db.relationship('ProductDetails', backref='branch_offices', lazy=True)
    superMarkets = db.relationship('SuperMarkets', backref='branch_offices', lazy=True)










