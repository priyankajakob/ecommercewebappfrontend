import React,{Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {signout, isAuthenticated} from '../auth/helper/index'

const currentTab = (history,path) => {
    if(history.location.pathname === path){
        return {color : "#2ecc72"}
    }
    else
    {
        return {color : "#FFFFFF"}
    }
}

const Nav = ({history})=>{
    return(
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history,"/")} className="nav-link" to="/">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>

                <li className="nav-item">
                    <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                        Admin Dashboard
                    </Link>
                </li>

                {
                    !isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link style={currentTab(history,"/signup")}className="nav-link" to="/signup">
                                    Sign Up
                                </Link>
                            </li>
        
                            <li className="nav-item">
                                <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">
                                    Sign In
                                </Link>
                            </li>
                        </Fragment>
                    )
                }
               
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <span className = "nav-link text-warning" onClick={()=>{
                                    signout(()=>{
                                        console.log("signed out successfully")
                                        history.push("/")
                                    })
                            }}>
                                Signout
                            </span>
                        </li>
                    )}
            </ul>
        </div>   
    )
}

export default withRouter(Nav)