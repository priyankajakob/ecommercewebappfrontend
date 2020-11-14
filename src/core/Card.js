import React from 'react'

import ImageHelper from './ImageHelper'

const Card = ({product,addToCart=true,removeFromCart=false}) => {

    const cardName = product ? product.name : "A photo from pexels"
    const cardDescription = product ? product.description : "Default description"
    const cardPrice = product ? product.price : `0`

    const showAddToCart = (addToCart)=>{
        return(
          addToCart && (
            <button
              onClick={() => {}}
              className="btn btn-block btn-outline-success mt-2 mb-2">
            Add to Cart
           </button>
          )
        )
    }

    const showRemoveFromCart = (removeFromCart) =>{
      return(
        removeFromCart && (
          <button
                onClick={() => {}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
                Remove from cart
          </button>
        )
      )
    }


    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardDescription}</div>
        <div className="card-body">
            <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardName}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">Rs {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card