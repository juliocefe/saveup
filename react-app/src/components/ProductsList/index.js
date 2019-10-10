import React, {useEffect, useState, useMemo} from 'react'
import { Product } from '../Product'

import { List, Item } from  './styles'


export const ProductsList = ( props ) => {
    // CUSTOM HOOK
    //          SACARLO DE ESTE COMPONENTE, A UN GRADO MAS ARRIBA U ORGANIZARLO MEJOR
    const [filteredProducts, setFilteredProducts] = useState(props.api.data)
    
    // Esto lo podemos mejorar bastante, separando el filtro debido a a los contadores, 
    // por que n o va dejar de reacargarse, INVESTIGAR MAS ACERCA DE
    useMemo( ()=>{
        const products = props.api.data.filter(product=>{
            for (let index = 0; index < props.carList.length; index++) {
                const element = props.carList[index];
                if(product.id==element.id){
                    product.counter = element.cant
                }
                
                // product.counter = addedProduct[0].cant
            }
            return product.name.
            toLowerCase().
            includes(props.filter.toLowerCase()) 
        });
        setFilteredProducts(products)
    }, [props.api.data, props.filter, props.carList])

    //                          CUSTOM HOOK
    return (
        <List>
        {   
            
            props.api.loading ? 
            <h1>Cargando...</h1>
            : 
            
            filteredProducts.map(product =>{
                return(
                    <Item key={product.id} >
                        <Product
                        {...product}
                        handleRemoveProduct
                        handleAddProduct={props.handleAddProduct}
                        handleRemoveProduct={props.handleRemoveProduct} />
                    </Item> 
                )
            })
        }
        </List>
    );
}