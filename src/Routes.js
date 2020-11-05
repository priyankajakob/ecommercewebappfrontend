import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import AdminRoute from '../src/auth/helper/AdminRoute'
import PrivateRoute from '../src/auth/helper/PrivateRoute'

import Home from '../src/core/Home'
import Signin from '../src/user/Signin'
import Signup from '../src/user/Signup'
import AdminDashBoard from '../src/user/AdminDashBoard'
import UserDashBoard from '../src/user/UserDashBoard'


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
            </Switch>
        
        </BrowserRouter>
    )
}