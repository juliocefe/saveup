import React, { useEffect, useState, useMemo} from 'react';
import { directive } from '@babel/types';
import { ProductsList } from './../ProductsList'


import { SearchInput, SearchBox,
     SearchContainer } from  './styles'

// import './styles/search.css'

const data = [
    {
        id: '1',
        name: "Salchicha de Pavo",
        brand: "FOOD",
        quantity: "200g",
        cover: "https://bodegaaurrera.net/wp-content/uploads/2019/09/100185178-1.png"
    },
    {
        id: '2',
        name: "Salchicha Frankfurt de Pavo",
        brand: "Alpino",
        quantity: "500g",
        cover: "https://bodegaaurrera.net/wp-content/uploads/2019/09/66.png"
    },
    {
        id: '3',
        name: "Leche Nutri",
        brand: "NUTRI",
        quantity: "1.5L",
        cover: "https://bodegaaurrera.net/wp-content/uploads/2019/09/9010138.png"
    },
    {
        id: '4',
        name: "Jamón de Pavo",
        brand: "KIR",
        quantity: "250g",
        cover: "https://bodegaaurrera.net/wp-content/uploads/2019/09/134.png"
    },
    {
        id: '5',
        name: "Leche Yaqui",
        brand: "YAQUI",
        quantity: "200g",
        cover: "https://super.walmart.com.mx/images/product-images/img_large/00750166651955L.jpg"
    },
]

export const Search = () => {
    const [ filter, setFilter ] = useState('')
    const [ productsList, setProductsList ] = useState({'data': [],'loading': true})
    const [ carList, setCarList ] = useState([]) 
    var time = null;
    function fecthApi(){
        time = setTimeout(() => {
            setProductsList({
                    data: data,
                    loading: false
            })
        }, 500);
    }
    function handleAddProduct(id){
        let Newlist = [...carList]
        let isNew = true
        for (let index = 0; index < Newlist.length; index++) {
            const element = Newlist[index];
            if(element.id==id){
                Newlist[index].cant =  Newlist[index].cant +1
                isNew = false
                break
            } 
        }
        if(isNew) Newlist.push( { id:id, cant: 1 } )
        setCarList(Newlist)
    }

    function handleRemoveProduct(id){
        let Newlist = [...carList]
        for (let index = 0; index < Newlist.length; index++) {
            const element = Newlist[index];
            if(element.id==id){
                Newlist[index].cant =  Newlist[index].cant -1
                break
            } 
        }
        setCarList(Newlist)
    }

    
    useEffect(()=>{
        fecthApi()
        return () => {
            clearTimeout(time)
        }
    }, [] )

    return(
        <SearchContainer>
            <SearchInput type="text"
                value={filter}
                onChange={e=>{
                    setFilter(e.target.value)
                }}
            />
            <ProductsList 
            api={productsList} 
            filter={filter} 
            carList={carList}
            handleAddProduct={handleAddProduct}
            handleRemoveProduct={handleRemoveProduct} />
        </SearchContainer>
    );
}
