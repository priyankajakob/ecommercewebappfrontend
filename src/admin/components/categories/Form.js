import React from 'react'
import {Link} from 'react-router-dom'

const CategoryForm = ({name,handleChange,handleSubmit,success})=>{
    const adminHome = ()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                    Go back to Admin Home
                </Link>
            </div>
        )
    }

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

export default CategoryForm