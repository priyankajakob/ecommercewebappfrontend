import React,{useState,useEffect} from 'react'
import Base from '../../../core/Base'
import { Link } from 'react-router-dom'

import { listCategories, deleteCategory} from '../../helper/adminapicall'
import {isAuthenticated} from '../../../auth/helper/index'

const ManageCategories = ()=>{

    const [values,setValues]=useState({
        categories:[],
        error:false,
        success:false
    })

    const { categories,error,success }=values

    const { token } = isAuthenticated()

    const preLoad = ()=>{
        listCategories()
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
                console.log(data.error)
            }
            else
            {
                setValues({
                    ...values,
                    error:false,
                    success:true,
                    categories:data.categories
                })
            }
        })
        .catch((error)=>console.log("Error loading categories"))
    }

    useEffect(()=>{
        preLoad()
    },[])
   
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

    const deleteCategoryCall = (categoryId)=>{
        deleteCategory(token,categoryId)
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({
                    ...values,
                    error:false
                })
                preLoad()
                console.log("category deleted successfully")
            }
        })
        .catch((error)=>console.log(error))
     }

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
        <Base 
        title="Manage Categories here" 
        description="Categories can be viewed through this page"
        className="container">
            {/* <p className="text-white">Manage Categories Page</p> */}
            <h4 className="text-success font-weight-bold">{`Total Categories fetched : ${categories.length} `}</h4>
            {adminHome()}
            <br/>
            {success && (
                <table className="table table-bordered bg-white">
                <thead>
                    <tr>
                    <th scope="col">Category Id</th>
                    <th scope="col">Category Name</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category,index)=>{
                        return(
                            <tr key={index}>
                            <th scope="row">{category._id}</th>
                            <td>{category.name}</td>
                            <td>
                            <Link
                               className="btn btn-success"
                              to={`/admin/categories/${category._id}`}
                            >
                                <span className="">Update</span>
                            </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    id={category._id} 
                                    onClick={(event)=>{

                                    const yesOrNo = window.confirm(`Delete category with id : ${event.target.id}`)
                                    if(yesOrNo)
                                    deleteCategoryCall(event.target.id)
                                }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            )}
            {errorMessage()}
        </Base>   
    )
}

export default ManageCategories