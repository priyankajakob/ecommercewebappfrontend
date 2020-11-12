import React from 'react'

import {API} from '../backend.js'

const ImageHelper = ({ product })=>{
    const imageURL = product ? `${API}/products/photo/${product._id}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
    return(
        <div className="rounded border border-success p-2">
            <img
                src={imageURL}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageHelper