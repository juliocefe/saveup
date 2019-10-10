import React from 'react';
import Login from './login';

import Nav from './Nav';
import { Search }  from './components/Search'
import { GlobalStyle } from './styles/GlobalStyles'

function App() {
  return (
    <div>
        <GlobalStyle/>
        <Nav/>
        <Search/>
    </div>
  );
}

export default App;

// for (let index = 0; index < props.carList.length; index++) {
//     const element = props.carList[index];
//     if(product.id==element.id){
//         console.log('aqui wey', element.id, product.id)
//         product.counter = element.cant
//     }
    
//     // product.counter = addedProduct[0].cant
// }