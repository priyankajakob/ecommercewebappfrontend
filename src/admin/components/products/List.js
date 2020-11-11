import React, { useState, useEffect } from "react";

import Base from "../../../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth/helper/index";
import { listProducts, deleteProduct } from "../../helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error,setError]=useState("")

  const { token } = isAuthenticated();

  const preload = () => {
    listProducts().then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data.products);
        setError("")
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = productId => {
      console.log(productId)
    deleteProduct(token,productId).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        preload();
        setError("")
      }
    });
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products.length} products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/products/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      const yesOrNo = window.confirm(`Do you want to delete this product : ${product.name}?`)
                      if(yesOrNo)
                        deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {errorMessage()}
    </Base>
  );
};

export default ManageProducts;
