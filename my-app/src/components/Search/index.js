import React, { useEffect, useState} from 'react';
import { ProductsList } from './../ProductsList';

import { SearchContainer } from  './styles';
import { GetProducts } from './../../Api/index';

export const Search = () => {
    const [ productsList, setProductsList ] = useState({'data': [],'loading': true})
    useEffect(()=>{
        GetProducts(setProductsList)
        return () => {
            // clearTimeout(time)
        }
    }, [])
    return(
        <SearchContainer>
        {console.log(productsList.data)}
            {
                productsList.loading ? 
                 <h1>Cargando...</h1>
                : 
                
                <ProductsList
                // api={generatedList.goToBuy ? generatedList : productsList} 
                api={productsList.data} 
                />
            }
        </SearchContainer>
    );
}
