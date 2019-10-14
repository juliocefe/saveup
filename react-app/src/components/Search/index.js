import React, { useEffect, useState} from 'react';
import { ProductsList } from './../ProductsList'


import { SearchContainer } from  './styles'
const { fecthApi } = require( './../../Api');

export const Search = () => {
    const [ productsList, setProductsList ] = useState({'data': [],'loading': true})
    useEffect(()=>{
        fecthApi(setProductsList)
        return () => {
            // clearTimeout(time)
        }
    }, [])
    return(
        <SearchContainer>
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
