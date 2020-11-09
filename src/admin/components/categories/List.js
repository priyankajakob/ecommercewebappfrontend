import React from 'react'
import Base from '../../../core/Base'
import { Link } from 'react-router-dom'

import { listCategories, deleteCategory } from '../../helper/adminapicall'

const ManageCategories = ()=>{

    const deleteCategoryCall = (id)=>{
        console.log("hit here")
    }

    const listCategories = ()=>{

    }
   

    return(
        <Base 
        title="Manage Categories here" 
        description="Categories can be viewed through this page"
        className="container">
            <p className="text-white">Manage Categories Page</p>

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
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
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
                </tbody>
            </table>
        </Base>   
    )
}

export default ManageCategories