from flask import jsonify, request
from app.models import (
                        Lists, ListDetails, 
                        Users, BranchOffices, 
                        ProductDetails, Products,
                        DateNow )
from . import lists


from app import db

from pdb import set_trace

@lists.route('/generateList', methods=['POST'])
def generate_list():
    products = request.get_json()
    productList = []

    HowManyFromEacheProduct = []
    for product in products['products']:
        productList.append(product['id'])
        HowManyFromEacheProduct.append({ 'idProduct':product['id'], 'quantity':product['quantity'] })
    
    query = db.session.query(ProductDetails, Products, BranchOffices).filter(
              Products.id__product==ProductDetails.fk_product__product_detail,
              ProductDetails.fk_branch_office__product_detail==BranchOffices.id__branch_office
            ).filter(Products.id__product.in_(productList))
    
    results = query.all()
    listofCompanies = []
    for productDetail, product, company in results:
        dic = {
            'idDetail': productDetail.id_product__details,
            'idProduct': product.id__product,  
            'name': product.name__product, 
            'brand': product.brand__product if product.brand__product else 'Unknown', 
            'unit': product.unit__product ,
            'image': product.image__product,
            'idCompany': company.id__branch_office,
            'company': company.name__branch_office,
            'price': productDetail.current_price__product_detail
        }
        for product in HowManyFromEacheProduct:
            if dic['idProduct'] == product['idProduct']:
                dic['quantity'] = product['quantity']
                break
        found = False
        for companyInTheList in listofCompanies:
            if companyInTheList['idCompany'] == company.id__branch_office:
                companyInTheList['list'].append(dic)
                companyInTheList['Total'] = companyInTheList['Total'] + (dic['quantity'] * dic['price'])
                found = True
                break
        if not found:
            listofCompanies.append({
                'idCompany':company.id__branch_office,
                'company': company.name__branch_office,
                'list': [ dic ],
                'Total': productDetail.current_price__product_detail * dic['quantity']
                })

    return jsonify( { 'data': listofCompanies} )