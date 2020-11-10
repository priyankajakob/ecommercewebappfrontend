import React,{useState} from 'react'
import Base from '../../../core/Base'
import {isAuthenticated} from '../../../auth/helper/index'
import {createProduct} from '../../../admin/helper/adminapicall'
import {Link} from 'react-router-dom'

const AddProduct = ()=>{

    const [values,setValues]=useState({
        name:"",
        description:"",
        price:"",
        category:"",
        stock:"",
        photo:"",
        error:false,
        success:false
    })

    const { name, description, price, category, stock, photo, error, success } = values
    const { token } = isAuthenticated()

    const handleChange = (event)=>{
        setValues({...values,error:false,[event.target.name]:event.target.value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        setValues({ ...values, error: false })

        createProduct(token,{name,description,price,category,stock,photo})
        .then(data=>{
          if(data.error){
              
            setValues({...values,error:data.error,success:false})
            console.log(values)
          }
          else
          {
            setValues({
              ...values,
              name:"",
              description:"",
              price:"",
              category:"",
              stock:"",
              photo:"",
              error:false,
              success:true
            })
          }
        })
        .catch(error=>{
          console.log(error)
        })
    }

    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                New product was created successfully. 
              </div>
            </div>
          </div>
        );
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

    const adminHome = ()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                    Go back to Admin Home
                </Link>
            </div>
        )
    }

    const addProductForm = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">   
                                      
                            <input 
                                className="form-control" 
                                type="text" 
                                required 
                                value={name}
                                name="name"
                                onChange={handleChange}
                                placeholder="Product Name"
                            />  
                            <br/>
                            <label className="btn btn-block btn-success">
                                <input
                                    onChange={handleChange}
                                    type="file"
                                    name="photo"
                                    accept="image"
                                    placeholder="Choose photo"
                                />
                            </label> 
                             <br/> 
                             <textarea 
                                className="form-control" 
                                type="text" 
                                required 
                                value={description}
                                name="description"
                                onChange={handleChange}
                                placeholder="Product Description"
                            />  
                            <br/>
                            <input 
                                className="form-control" 
                                type="text" 
                                required 
                                value={price}
                                name="price"
                                onChange={handleChange}
                                placeholder="Product Price"
                            />   
                            <br/>
                            <input 
                                className="form-control" 
                                type="text" 
                                required 
                                value={stock}
                                name="stock"
                                onChange={handleChange}
                                placeholder="Product Quantity"
                            />  
                            <br/>
                            <select className="form-control">
                                <option>Select Product Category</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>   
                        </div>
                        <button className=" btn btn-success btn-block" onClick={handleSubmit} >
                                  Add
                        </button>
                        {adminHome()}
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base 
            title="Add Products here" 
            description="Products can be added through this page"
            className="container">
                {errorMessage()}
                {successMessage()}
                {addProductForm()}
        </Base>  
    )
}

export default AddProduct