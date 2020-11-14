export const addItemToCart = (item,next)=>{
    let cart = []
    if(typeof window !== undefined)
    {
        let sameProduct = false
        if(localStorage.getItem("cart"))
        {
            cart = JSON.parse(localStorage.getItem("cart"))
            cart.forEach((product)=>{
                if(product._id==item._id)
                {
                    product.count++
                    sameProduct=true
                }
            })
        }
        if(!sameProduct){
            cart.push({...item,count:1})
        }
       
        localStorage.setItem('cart',JSON.stringify(cart))
        next()
    }
}

export const loadItemsFromCart = (item)=>{
    let cart = []

    if(typeof window !== undefined)
    {
        if(localStorage.getItem("cart"))
        {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        
        return cart
    }
}

export const removeItemFromCart = (productId)=>{
    let cart = []

    if(typeof window !== undefined)
    {
            cart = JSON.parse(localStorage.getItem("cart"))
            cart.forEach((product,index)=>{
                if(product._id==productId)
                {
                    cart.splice(index,1)

                    //below code is if feature of reducing order count is possible in cart
                    // product.count--
                    // if(product.count==0){
                    //     cart.splice(index,1)
                    // }
                }
            })
        localStorage.setItem('cart',JSON.stringify(cart))
    }

}