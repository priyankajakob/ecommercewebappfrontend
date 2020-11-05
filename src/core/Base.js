import React from 'react'

import Nav from './Nav'

const Base = (props)=>{

   const { title, description, children, className} = props

    return(
        <div>
            <Nav/>
            <div className="container-fluid">
                <div className = "jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                  {children}
                </div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach us</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An <span className="text-white">amazing</span> place to buy tshirt
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base