import {API} from '../../backend.js'

export const getAllProducts = () => {
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const getOneProduct = (productId) => {
    return fetch(`${API}/products/${productId}`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}


