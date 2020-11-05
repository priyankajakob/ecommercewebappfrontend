import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false
  });

  //below was added in case single error message and multiple error messages in array given from backend had to be handled.
  // const [errMsgs,setErrMsgs] = useState([])
  // const [errMsg, setErrMsg] = useState("");

  const { name, email, password, error, success } = values;

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, error: false, [name]: value }); //error false here because when user is typing why to show errors
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false }); //error false here so that on submit old msgs are cleared
    // setErrMsgs([])
    // setErrMsg("");

    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
          // if(typeof data.errors == "string"){
          // let errMsg = data.error;
          // setErrMsg(errMsg);

          // }
          // else {
          //     let newArr = [...data.errors]
          //     setErrMsgs([...newArr])
          // }
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: false,
            success: true
          });
          // setErrMsg("");
          // // setErrMsgs([])
        }
      })
      .catch(err => console.log(err));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                name="name"
                value={name}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                name="email"
                value={email}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                name="password"
                value={password}
                type="password"
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-success btn-block"
            >
              Submit
            </button>
          </form>
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
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };
  // const checkErrMsg = ()=>{
  //     if(errMsg)
  //     {
  //         return(
  //             <div>
  //                 {errMsg}
  //             </div>
  //         )
  //     }
  //     else
  //     {
  //         return(
  //             <div className="row">
  //                 <div className="col-md-6 offset-sm-3 text-left">
  //                     <ul>
  //                     {errMsgs.map((err,index)=>{
  //                         return(
  //                             <li key={index}>
  //                                 {`${err.param} : ${err.msg}`}
  //                             </li>
  //                         )
  //                     })}
  //                     </ul>
  //                 </div>
  //             </div>
  //         )
  //     }
  // }

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
    <Base title="Sign up Page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
