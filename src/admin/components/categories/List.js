import React,{useState,useEffect} from 'react'
import Base from '../../../core/Base'
import { Link } from 'react-router-dom'

import { listCategories, deleteCategory } from '../../helper/adminapicall'

const ManageCategories = ()=>{

    const [values,setValues]=useState({
        categories:[],
        error:false,
        success:false
    })

    const {categories,error,success}=values

    const deleteCategoryCall = (id)=>{
        console.log("hit here",id)
    }

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

    return(
        <Base 
        title="Manage Categories here" 
        description="Categories can be viewed through this page"
        className="container">
            {/* <p className="text-white">Manage Categories Page</p> */}
            <h4 className="text-success font-weight-bold">{`Total Categories fetched : ${categories.length} `}</h4>
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
                            <tr>
                            <th scope="row">{category._id}</th>
                            <td>{category.name}</td>
                            <td>
                                <button className="btn btn-warning">Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id)=>{
                                    const yesOrNo = window.confirm(`Delete category`)
                                    if(yesOrNo)
                                    deleteCategoryCall(id)
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