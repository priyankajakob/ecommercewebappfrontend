import React from 'react'

import ImageHelper from './ImageHelper'

const Card = ({product}) => {
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{product.description}</div>
        <div className="card-body">
            <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {product.name}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ 5</p>
          <div className="row">
            <div className="col-12">
              <button
                onClick={() => {}}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
            <div className="col-12">
              <button
                onClick={() => {}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card