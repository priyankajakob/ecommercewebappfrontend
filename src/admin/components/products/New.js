import React, { useState,useEffect } from "react"
import Base from "../../../core/Base"
import { Link } from "react-router-dom"
import {createProduct,listCategories} from '../../helper/adminapicall'
import {isAuthenticated} from '../../../auth/helper/index'

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo:"",
    error:false,
    success:false,
    categories:[],
    category:"",
    formData:"",
    createdProduct:""
  })

  const { name, description, price, stock, photo, success, error,categories,category,formData,createdProduct } = values;
  const {token}=isAuthenticated()

  const preLoad = ()=>{
    listCategories()
    .then((data)=>{
      if(data.error){
        setValues({...values,error:data.error})
      }
      else{
        setValues({
          ...values,
          categories:data.categories,
          formData:new FormData()
        })
      }
    })
    .catch((error)=>console.log('error loading categories'))
  }

  useEffect(()=>{
    preLoad()
  },[])

  const handleChange = (event)=>{
    const value = event.target.name==="photo"?event.target.files[0]:event.target.value
    formData.set(event.target.name,value)
    // console.log(event.target.name,value)
    setValues({...values,error:false,[event.target.name]:value})
}

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values,error:false})
    createProduct(token,formData)
    .then((data)=>{
      if(data.error)
      {
        setValues({...values,error:data.error,success:false})
      }
      else{
        setValues({...values,
          name:"",
          description:"",
          price:"",
          stock:"",
          photo:"",
          error:false,
          success:true,
          createdProduct:data.product.name})
      }
    })
    .catch((error)=>console.log(error))
  }

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New product {createdProduct} was created successfully. 
          </div>
        </div>
      </div>
    )
  }

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
    )
    }

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange}
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
          type="number"
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange}
          className="form-control"
          placeholder="Category"
          name="category"
        >
          <option>Select</option>
          {categories && 
            categories.map((category,index)=>(
              <option key={index} value={category._id}>{category.name}</option>
            ))
          }
          
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange}
          name="stock"
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  )

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          <br/>
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
