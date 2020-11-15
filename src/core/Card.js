import React,{useState,useEffect} from 'react'
import {addItemToCart,removeItemFromCart} from './helper/cartHelper'
import ImageHelper from './helper/ImageHelper'

import {Redirect} from 'react-router-dom'

const Card = (
      { product,
        addToCart=true,
        removeFromCart=false,
        reload,
        setReload,
        productCountInOrder=undefined 

        //I don't think below if really required as reload works
        // reload = undefined,
        // setReload = f => f
        //function (f){return f}
      }) => {

    const [redirect,setRedirect]=useState(false) 
    const [count,setCount]=useState(product.count) //to keep count of product,otherwise same product added twice as new products -- logic code inside cardHelper 

    const cardName = product ? product.name : "A photo from pexels"
    const cardDescription = product ? product.description : "Default description"
    const cardPrice = product ? product.price : `0`

    const addToCartList = ()=>{
      addItemToCart(product,()=>{
        setRedirect(true)
      })
    }

    const getARedirect = (redirect)=>{
      if(redirect){
        return <Redirect to="/cart"/>
      }
    }

    const showAddToCart = (addToCart)=>{
        return(
          addToCart && (
            <button
              onClick={addToCartList}
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
            className = "btn btn-block btn-outline-danger mt-2 mb-2"
            onClick={() => {
              const yesOrNo = window.confirm(`Do you want to remove this product from cart?`)
              if(yesOrNo)
              {
                removeItemFromCart(product._id)
                setReload(!reload)
                //should be !reload, else it doesn't work - this is because from child some value of state should change, then only in parent it will do reload
              }
            }}
           >
                Remove from cart
          </button>
        )
      )
    }


    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardDescription}</div>
        <div>{productCountInOrder && (
            <p className="text-info font-weight-bold">Product Count : {productCountInOrder}</p>
        )}</div>
        <div className="card-body">
          {getARedirect(redirect)}
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