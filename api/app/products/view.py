from flask import jsonify, request
from flask_jwt_extended import jwt_required
from app.models import Products
from . import products
from app import db


@products.route('/registerProducts', methods=['POST'])
def register_products():
    productsJson = request.get_json()

    for product in productsJson['products']:
        newProduct = Products(
            name__product=product['name'], 
            brand__product=product['brand'], 
            unit__product=product['quantity'],
            image__product=product['image'] 
        )
        db.session.add(newProduct)
    db.session.commit()
    return jsonify('done!!!'), 201


@products.route('/')
@jwt_required()
def get_products():
    # current user probablemente lo vayamos a usar después para validar roles
    products = Products.query.all()
    response = []
    for product in products:
        dic = {
            'id': product.id__product,
            'name': product.name__product,
            'brand': product.brand__product,
            'unit': product.unit__product,
            'image': product.image__product
        }
        response.append(dic)
    return jsonify({'data': response})
    