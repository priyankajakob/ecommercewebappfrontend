import {API} from '../../../../backend.js'

export const getMeToken = (userId,token)=>{
    return fetch(`${API}/payment/gettoken/${userId}`,{
        method:'GET',
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const processMyPayment = (userId,token,paymentInfo)=>{
    return fetch(`${API}/payment/braintree/${userId}`,{
        method:'POST',
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        },
        body:JSON.stringify(paymentInfo)
    })
    .then((response)=>{
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}