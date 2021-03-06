import React,{useState,useEffect} from 'react'
import '../styles.css'

import Base from './Base'
import Card from './Card'
import PaymentB from './paymentgateways/braintree/PaymentB'

import {loadItemsFromCart} from './helper/cartHelper'

// import StripeCheckoutLocal from './paymentgateways/stripe/StripeCheckout'

export default function Cart(){

    const [cart,setCart] = useState([])

    //code for forcing reload after removed from cart without page refresh
    const [reload,setReload] = useState(false)

    useEffect(()=>{
        setCart(loadItemsFromCart())
    },[reload])

    const loadAllProducts = ()=>{
        return(
            <div>
                <h2>This section is to load the products</h2>
                {cart.map((prod,index)=>{
                    return(
                        <div key={index}>
                        <Card
                            product={prod}
                            addToCart={false}
                            removeFromCart={true}
                            reload={reload}
                            setReload={setReload}
                            productCountInOrder = {prod.count}
                            />
                            <br/>
                        </div>
                    )
                })}
            </div>
        )
    }

    const loadCheckOut = ()=>{
        return(
            <div>
                <h2>This section is to load checkout</h2>
            </div>
        )
    }

    return(
        <Base title="Cart Page" description = "Ready to check out!">
             <div className="row text-center">
                  <div className = "col-6">{cart.length>0 ? loadAllProducts() : (
                      <h3>
                         Your Cart is Empty
                      </h3>
                  )}</div>
                  
                  {/* Initial */}
                  {/* <div className = "col-6">{loadCheckOut()}</div> */}

                  {/* Stripe Checkout code */}
                  {/* <StripeCheckoutLocal
                    products = {cart}
                    setReload = {setReload}
                    reload = {reload}
                  /> */}

                <div className = "col-6">
                        <PaymentB
                            products = {cart}
                            reload = {reload}
                            setReload = {setReload}
                        />
                </div>

             </div>
        </Base>

    )
}
