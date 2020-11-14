import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import AdminRoute from '../src/auth/helper/AdminRoute'
import PrivateRoute from '../src/auth/helper/PrivateRoute'

import Home from '../src/core/Home'
import Signin from '../src/user/Signin'
import Signup from '../src/user/Signup'
import AdminDashBoard from '../src/user/AdminDashBoard'
import UserDashBoard from '../src/user/UserDashBoard'
import AddCategory from '../src/admin/components/categories/New'
import AddProduct from '../src/admin/components/products/New'
import ManageProducts from '../src/admin/components/products/List'
import ManageCategories from '../src/admin/components/categories/List'
import ManageOrders from '../src/admin/components/orders/List'
import EditCategory from '../src/admin/components/categories/Edit'
import EditProduct from '../src/admin/components/products/Edit'
import Cart from '../src/core/Cart'


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/cart" exact component={Cart}/>
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
                <AdminRoute path="/admin/category" exact component={AddCategory}/>
                <AdminRoute path="/admin/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/categories/:categoryId" exact component={EditCategory}/>
                <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
                <AdminRoute path="/admin/products/:productId" exact component={EditProduct}/>
                <AdminRoute path="/admin/products" exact component={ManageProducts}/>
                <AdminRoute path="/admin/orders" exact component={ManageOrders}/>
               
            </Switch>
        
        </BrowserRouter>
    )
}