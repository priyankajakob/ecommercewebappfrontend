import {API} from '../../backend.js'

export const createOrder = (token,userId,orderData) => {
    return fetch(`${API}/orders/${userId}`,{
        method:"POST",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        },
        body : JSON.stringify(orderData)
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}