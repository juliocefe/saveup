import React from 'react'
import { Link, Image, SecondSection } from './styles'

const DEFAULT_IMAGE = 'https://bodegaaurrera.net/wp-content/uploads/2019/09/100185178-1.png'

export const Product = ( props) => {
  return(
    <Link className='hola' value={props.name}>
      <Image src={props.cover} />
      <SecondSection>
        <p className='productName'>{props.name}</p>
        <p>{props.brand}</p>
        <small>{props.quantity}</small>
        <p className="product-counter">{props.counter ? props.counter : null}</p>
        <div className='btn-Autocomplete__group'>
          <button onClick={()=>{
                  props.handleAddProduct(props.id)
          }} className='btn btn-success btn-Autocomplete__add'>Add</button>
          {
            props.counter ? 
            <button className='btn btn-danger btn-Autocomplete__delete'
            onClick={()=>{
              props.handleRemoveProduct(props.id)
            }}>Remove</button>
            : 
            null 
          }
          
        </div>
      </SecondSection>
    </Link>
  
  );
}

