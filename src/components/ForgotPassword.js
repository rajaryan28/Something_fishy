import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {

      let navigate = useNavigate();
      const [logincreds, setLogincreds] = useState({ email: ""});
      const handleSubmit = async (e) => {
        e.preventDefault();
        //Api call
        const response = await fetch(`http://localhost:4000/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: logincreds.email
          }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          localStorage.setItem("authtoken", json.authToken);
          navigate("/");
        } else {
          alert("Login with correct creds!");
        }
      };
      const onChange = (e) => {
        setLogincreds({ ...logincreds, [e.target.name]: e.target.value });
      };
  return (
    <>
          <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'radial-gradient(circle,rgb(107, 109, 111),rgb(24, 24, 25))', marginTop: '-80px' }}>
      <div className="col-md-4">
        <h2 className="text-center text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="email" className="text-white my-1">Email address<sup>*</sup></label>
            <input type="email" className="form-control bg-dark text-white" id="email" name="email" onChange={onChange} placeholder="Enter email" />
          </div>
          
          <button type="submit" className="btn btn-light btn-block my-3 w-100">Submit</button>
          
          <div className="text-center mt-3">
            <span className="text-white">Back to </span>
            <Link to="/login" className="text-white">LogIn ?</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword
