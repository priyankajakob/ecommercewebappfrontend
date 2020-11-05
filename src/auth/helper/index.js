import { API } from '../../backend.js' 
//API means : http://localhost:3010

export const signup = user=>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const signin = user=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers : {
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{return {error:"Issue connecting to server"}})
}

export const authenticate = (data,next)=>{
    if(typeof window !== "undefined")
    {
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const signout = next=>{
    return fetch(`${API}/signout`,{
        method:"GET",
        headers:{
            "x-auth":JSON.parse(localStorage.getItem("jwt")).token
        }
    })
    .then(response=>
        {
            // console.log(response.json())
            if(typeof window !== "undefined")
             {
                localStorage.removeItem("jwt")
                next()
            }
        })
    .catch(err=>{return {error:"Issue connecting to server"}})  
}

export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else
    {
        return false
    }
}