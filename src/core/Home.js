import React from 'react'
import '../styles.css'

import Base from './Base'

// import { API } from '../backend.js'

export default function Home(){
    return(
        <Base title="Home Page" description = "Grab your favourite tee soon!!">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
            </div>
        </Base>

    )
}