import React,{useState} from 'react'
import Base from '../../../core/Base'
import {Link} from 'react-router-dom'

import { isAuthenticated } from '../../../auth/helper/index'

import { createCategory } from '../../helper/adminapicall'

const AddCategory = ()=>{
    
    const [values,setValues]=useState({
        name:"",
        error:false,
        success:false
    })

    const { name, error, success } = values
    const { token } = isAuthenticated()

    const handleChange = (event)=>{
        setValues({...values,error:false,[event.target.name]:event.target.value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        setValues({ ...values, error: false })

        createCategory(token,{name})
        .then(data=>{
          if(data.error){
            setValues({...values,error:data.error,success:false})
          }
          else
          {
            setValues({
              ...values,
              name:"",
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
                New category was created successfully. 
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

    const addCategoryForm = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form className="was-validated">
                        <div className="form-group">
                            <label 
                                className="font-weight-normal text-white" id="name">
                                    Category Name
                            </label>
                    
                            <input 
                                className="form-control is-invalid" 
                                type="text" 
                                required 
                                value={name}
                                name="name"
                                onChange={handleChange}
                                placeholder="For example. Summer"
                            />
                            {
                              !name && !success && (
                                <div className="invalid-feedback text-danger">
                                  Please enter a name for category.
                                </div>
                              )
                            }         
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
            title="Add Categories here" 
            description="Add categories for tshirts through this page"
            // className="container bg-info p-4">
            className="container">
                {errorMessage()}
                {successMessage()}
                {addCategoryForm()}
             
        </Base>      
    )
}

export default AddCategory