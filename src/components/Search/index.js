import React from 'react';
import { directive } from '@babel/types';

import { SearchInput, SearchBox,
     SearchContainer, PlusBtn,
     ProductsFiltered } from  './styles'

// import './styles/search.css'

export const Search = () => {
        return(
            <SearchContainer>
                <SearchBox>  
                    <SearchInput type="text"/>
                    <ProductsFiltered>
                        <li>Jabon</li>
                        <li>Jamón</li>
                        <li>Jarabe</li>
                        <li>Jaiba</li>
                        <li>Jicama 2x1</li>
                        <li>Jengibre</li>
                        <li>Jabon</li>
                        <li>Jamón</li>
                    </ProductsFiltered>
                </SearchBox>
            </SearchContainer>
        );
}
