import React,{useState} from 'react'
import { signin, authenticate, isAuthenticated } from "../auth/helper/index"
import { Redirect } from "react-router-dom";

import Base from '../core/Base'

const Signin = ()=>{

    const [values,setValues] = useState({
        email:"",
        password:"",
        error:false,
        loading:false,
        didRedirect:false
    })

    const {email,password,error,loading,didRedirect} = values
    const { user } = isAuthenticated()

    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setValues({...values,error:false,[name]:value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then((data)=>{
            if(data.error)
            {
                setValues({...values,error:data.error,loading:false})
            }
            else
            {
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        email:"",
                        password:"",
                        error:false,
                        didRedirect:true
                    })
                })
            }

        })
        .catch(err => console.log("Sign in request failed"))
    }


  const performRedirect = ()=>{
      //TODO : Do a redirection here

      if(didRedirect){
          if(user && user.role===1)
            // return <p>Redirect to Admin</p>
            return <Redirect to="/admin/dashboard"/>
          else
            // return <p>Redirect to User Dashboard</p>
            return <Redirect to="/user/dashboard"/>
      }
      if(isAuthenticated()){
        return <Redirect to="/" />
      }
  }

   const loadingMessage = ()=>{
       return(
           loading && (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-info">
                Loading...
              </div>
            </div>
          </div>
        )
       )}


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


    const signInForm = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="text" name="email" value={email} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={handleChange}/>
                        </div>
                        <button className=" btn btn-success btn-block" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title = "Sign In Page" description="A page for user to sign in!" >
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin