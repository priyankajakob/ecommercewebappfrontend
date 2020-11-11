import React,{useState,useEffect} from 'react'
import Base from '../../../core/Base'
import {useParams} from 'react-router-dom'

import { isAuthenticated } from '../../../auth/helper/index'

import { updateCategory,getOneCategory } from '../../helper/adminapicall'

import CategoryForm from '../categories/Form'

const EditCategory = ()=>{

    const [values,setValues]=useState({
        name:"",
        error:false,
        success:false
    })

    const { name, error,success } = values
    const { token } = isAuthenticated()

    const handleChange = (event)=>{
        setValues({...values,error:false,[event.target.name]:event.target.value,success:false})
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        setValues({ ...values, error: false,success:false })

        updateCategory(token,{name},categoryId)
        .then(data=>{
          if(data.error){
            setValues({...values,error:data.error,success:false})
          }
          else
          {
              console.log("upated category successfully")
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
    
    const preLoad = (categoryId)=>{
        getOneCategory(categoryId)
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else
            {
                setValues({
                ...values,
                name:data.category.name,
                error:false
                })
            }
        })
    }
    const { categoryId } = useParams()

    useEffect(()=>{
        preLoad(categoryId)
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

      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
               Category was updated successfully. 
              </div>
            </div>
          </div>
        );
      };

    return(
        <Base 
            title="Add Categories here" 
            description="Add categories for tshirts through this page"
            // className="container bg-info p-4">
            className="container">
                {successMessage()}
                {errorMessage()}
                <CategoryForm 
                    name={name} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit}
                />
        </Base>      
    )
}

export default EditCategory