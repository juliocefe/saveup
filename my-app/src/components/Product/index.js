import React from 'react'
import { Link, Image, SecondSection, CheckBoxIcon } from './styles'

const DEFAULT_IMAGE = 'https://bodegaaurrera.net/wp-content/uploads/2019/09/100185178-1.png'

export const Product = ( 
  {
    buying=false, name, brand, 
    id, idDetail=undefined, 
    image=DEFAULT_IMAGE, unit, 
    quantity, handleAddProduct, handleRemoveProduct
  
  }  ) => {
    //  Que fea está esta funcion Atte YO
    function handleToggleCheckBox(id){
      var checkBox = document.getElementById(id)
        if(checkBox.value==="0"){
          checkBox.value=1
          checkBox.children[0].style.color = 'white'
          checkBox.style.backgroundColor = 'blue'
        }else{
          checkBox.value=0
          checkBox.children[0].style.color = 'gray'
          checkBox.style.backgroundColor = 'white'
        }
      
    }

  return(
    <Link>
      <Image src={image}/>
      <SecondSection>
        <p className='productName'>{name}</p>
        <p className={"brand"}>{brand}</p>
        <small>{unit}</small>
        <p className="product-counter">{quantity ? quantity : null}</p>
        <div className='btn-Autocomplete__group'>
          {
          !buying ?
          <button onClick={()=>{
                  handleAddProduct(id)
          }} className='btn btn-success btn-Autocomplete__add'>Add</button> : null
          }
          {
            buying ? (
              <CheckBoxIcon value={0} id={'checkFromList-'+idDetail} onClick={()=>{
                handleToggleCheckBox('checkFromList-'+idDetail)
              }}>
                  <i className="fas fa-check"></i>
                </CheckBoxIcon>
            ): 
            quantity ? 
              <button className='btn btn-danger btn-Autocomplete__delete'
              onClick={()=>{
                handleRemoveProduct(id)
              }}>Remove</button>
              : 
              null 
          }
          
        </div>
      </SecondSection>
    </Link>
  
  );
}

