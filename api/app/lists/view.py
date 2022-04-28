from flask import jsonify, request
from app.models import BranchOffices, ProductDetails, Products
from . import lists
from app import db


@lists.route('/generateList', methods=['POST'])
def generate_list():
    products = request.get_json()
    productList = []

    HowManyFromEacheProduct = []
    for product in products['products']:
        productList.append(product['id'])
        HowManyFromEacheProduct.append({'idProduct':product['id'], 'quantity':product['quantity'] })
    
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
            url = None
            if company.id__branch_office == 1:
                url = 'https://www.google.com/maps/search/?api=1&query=29.09688382734498,-110.9491963684559'
            elif company.id__branch_office == 2:
                url = 'https://www.google.com/maps/search/?api=1&query=29.098370919338887,-110.9259108756669'
            elif company.id__branch_office == 3:
                url = 'https://www.google.com/maps/place/Soriana+H%C3%ADper+Bachoco/@29.1237515,-110.9540982,17z/data=!3m1!4b1!4m5!3m4!1s0x86ce8689eb485d45:0x92868366aca70280!8m2!3d29.1237515!4d-110.9519095'
            listofCompanies.append({
                'url': url,
                'idCompany':company.id__branch_office,
                'company': company.name__branch_office,
                'list': [ dic ],
                'Total': productDetail.current_price__product_detail * dic['quantity']
                })

    return jsonify( { 'data': listofCompanies} )