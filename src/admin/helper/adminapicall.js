import {API} from '../../backend.js'

//categories

export const createCategory = (token,category)=>{
    return fetch(`${API}/categories`,{
        method:"POST",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        },
        body:JSON.stringify(category)
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const listCategories = () => {
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const updateCategory = (token,category,categoryId) => {
    return fetch(`${API}/categories/${categoryId}`,{
        method:"PUT",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        },
        body:JSON.stringify(category)
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const deleteCategory = (token,categoryId) => {
    return fetch(`${API}/categories/:${categoryId}`,{
        method:"DELETE",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}


//products

export const createProduct = (token,product)=>{
    return fetch(`${API}/products`,{
        method:"POST",
        headers : {
            Accept:"application/json",
            "x-auth":token
        },
        body:product
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const listProducts = () => {
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const listUniqueProductCategories = () => {
    return fetch(`${API}/products/categories`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const getAProduct = (productId) => {
    return fetch(`${API}/products/${productId}`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}


export const updateProduct = (token,product,productId) => {
    return fetch(`${API}/products/${productId}`,{
        method:"PUT",
        headers : {
            Accept:"application/json",
            "x-auth":token
        },
        body:product
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const deleteProduct = (token,productId) => {
    return fetch(`${API}/products/:${productId}`,{
        method:"DELETE",
        headers : {
            Accept:"application/json",
            "x-auth":token
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}



//orders

export const listOrders = (token) => {
    return fetch(`${API}/orders`,{
        method:"GET",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-auth":token
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}
