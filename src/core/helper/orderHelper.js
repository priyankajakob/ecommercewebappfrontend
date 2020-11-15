import {API} from '../../backend.js'

export const createOrder = (token,userId,orderData) => {
    console.log("ORDERDATA",orderData)
    const { products, transaction_id,amount} = orderData
    const order = {
        products, 
        transaction_id,
        amount
    }
    // console.log({order})
    return fetch(`${API}/orders/${userId}`,{
        method:"POST",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        },
        body : JSON.stringify({order})
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}