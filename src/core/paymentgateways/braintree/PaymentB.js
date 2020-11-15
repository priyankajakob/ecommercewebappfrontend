import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

import { loadItemsFromCart,cartEmpty } from '../../helper/cartHelper'
import { getMeToken,processMyPayment } from './helper/paymentHelper'
import { createOrder } from '../../helper/orderHelper'
import { isAuthenticated } from '../../../auth/helper/index'

const PaymentB = ({products,setReload,reload=undefined})=>{

    const [info,setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:"" //talks to braintree and gets back nonce for us
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getMeClientToken = (userId,token)=>{
        getMeToken(userId,token).then(info=>{
            console.log("INFO",info)
            if(info.error){
                setInfo({...info,error:info.error})
            }
            else
            {
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    const getFinalPrice = ()=>{
        return products.reduce((totPrice,prod)=>{
                return totPrice + (prod.count * prod.price)
        },0)
    }

    const onPurchase = ()=>{
        setInfo({loading:true})
        let nonce
        let getNonce = info.instance
        info.instance.requestPaymentMethod()
        .then((data)=>{
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce:nonce,
                amount:getFinalPrice()
            }
            processMyPayment(userId,token,paymentData)
            .then((response)=>{
                setInfo({...info,success:response.success,loading:false})
                console.log("PAYMENT SUCCESS, PAYMENT DATA : ",paymentData)
                // console.log(response)

                //TODO : create order
                const orderData = {
                    products:products,
                    transaction_id:response.transaction.id,
                    amount:response.transaction.amount
                }
                createOrder(token,userId,orderData)
                .then((data)=>{
                    if(data.error){
                        setInfo({...info,error:data.error})
                    }
                    else{
                        setInfo({...info,
                            loading:false,
                            success:data.order,
                            clientToken:null,
                            error:"",
                            instance:""
                        })
                        console.log(data.order)
                    }
                })

                //TODO : empty cart
                cartEmpty(()=>{
                    console.log("Did the app crash?")
                })

                
                //TODO : force reload
                setReload(!reload)

                
            })
        })
        .catch((error)=>{
            setInfo({error:error,loading:false,success:false})
            console.log("PAYMENT FAILED, REASON : ",error)
        })
    }

    const brainTreeDropIn = ()=>{
        return(
            <div>
                {info.clientToken!==null && products.length>0 ? (
                    <div>
                        <h3>Your total bill is {getFinalPrice()}</h3>
                         <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        {/* <br/> -- weird but this causes .requestPaymentMethod not found error -- TODO find out why*/}
                        <button className="btn btn-outline-success btn-lg" onClick={onPurchase}>Make Payment</button>
                    </div>
                ):(
                    <div>
                        {products.length>0 ? (
                            <h2 className="text-info">Loading...</h2>
                        ):
                        (
                            <h3 className="text-warning">Please login or add products to cart</h3>
                        )}
                    </div>
                )}
            </div>
        )
    }

    useEffect(()=>{
        getMeClientToken(userId,token)
    },[])

    return(
        <div>
            <h3>{brainTreeDropIn()}</h3>
        </div>
    )

}

export default PaymentB