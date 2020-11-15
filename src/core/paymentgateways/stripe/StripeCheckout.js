//Will be using paypal in the project hereafter, hence, this component is not used but kept for reference.
import React,{useState,useEffect} from 'react'

import {isAuthenticated} from '../../../auth/helper/index'
import {cartEmpty} from '../../helper/cartHelper'
import {createOrder} from '../../helper/orderHelper'

import {Link} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

import {API} from '../../../backend.js'

const StripeCheckoutLocal = ({products,setReload,reload})=>{

    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = ()=>{
        return products.reduce((totPrice,prod)=>{
                return totPrice + (prod.count * prod.price)
        },0)
    }

    const makePayment = token => {
        const body = {
            token,
            products,

        }
        const headers = {
            "Content-Type":"application/json",
        }

        return fetch(`${API}/stripepayment`,{
            method:"POST",
            header:headers,
            body:JSON.stringify(body)
        })
        .then((response)=>{
            console.log(response.json())
            //call further methods here like createorder and after that clearcart

            const {status} = response
            console.log("STATUS",status)
            // createOrder(token,userId,orderData)

            cartEmpty()
        })
        .catch(error=>console.log(error))

    }

    const showStripeButton = ()=>{
        return isAuthenticated() ? (
            <StripeCheckout
                strikeKey="pk_test"
                token={makePayment}
                amount={getFinalPrice()*100}
                name="Buy Tshirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay With Stripe</button>
            </StripeCheckout>
        ) : (
           <Link to="/signin">
               <button className="btn btn-warning">Sign In</button>
           </Link> 
        )
    }


    return(
        <div>
            <h3 className = "text-white">
                Stripe Checkout Page
                <p>{getFinalPrice()}</p>
                {showStripeButton()}
            </h3>
        </div>
    )
}

export default StripeCheckoutLocal