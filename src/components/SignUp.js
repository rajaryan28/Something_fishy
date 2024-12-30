import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  let navigate = useNavigate();
  const [logincreds, setLogincreds] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    sem: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Api call
    const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: logincreds.name,
        username: logincreds.username,
        email: logincreds.email,
        phone: logincreds.phone,
        gender: logincreds.gender,
        sem: logincreds.sem,
        department: logincreds.department,
        password: logincreds.password,
        confirmPassword: logincreds.confirmPassword,
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
    <div className="d-flex justify-content-center align-items-center vh-150" style={{ background: 'radial-gradient(circle,rgb(107, 109, 111),rgb(24, 24, 25))', paddingTop: '2%' }}>
      <div className="col-11 col-md-8 col-lg-6">
        <h2 className="text-center text-white mb-2 mt-1">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group my-2">
                <label htmlFor="name" className="text-white my-1">Name<sup>*</sup></label>
                <input type="text" className="form-control bg-dark text-white" id="name" name="name" onChange={onChange} placeholder="Enter name" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group my-2">
                <label htmlFor="username" className="text-white my-1">Username<sup>*</sup></label>
                <input type="text" className="form-control bg-dark text-white" id="username" name="username" onChange={onChange} placeholder="Enter username" minLength={3} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group my-2">
                <label htmlFor="email" className="text-white my-1">Email address<sup>*</sup></label>
                <input type="email" className="form-control bg-dark text-white" id="email" name="email" onChange={onChange} placeholder="Enter email" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group my-2">
                <label htmlFor="phone" className="text-white my-1">Phone<sup>*</sup></label>
                <input type="tel" className="form-control bg-dark text-white" id="phone" name="phone" onChange={onChange} placeholder="Enter phone number" maxLength={10} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group my-2">
                <label htmlFor="gender" className="text-white my-1">Gender<sup></sup></label>
                {/* <select className="form-control bg-dark text-white"  id="gender">
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select> */}
                <input type="text" className="form-control bg-dark text-white" id="gender" name="gender" onChange={onChange} placeholder="Enter gender" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group my-2">
                <label htmlFor="sem" className="text-white my-1">Semester<sup>*</sup></label>
                <input type="text" className="form-control bg-dark text-white" id="sem" name="sem" onChange={onChange} placeholder="Enter sem" />
              </div>
            </div>
          </div>
          <div className="form-group my-2">
            <label htmlFor="department" className="text-white my-1">Department<sup>*</sup></label>
            <input type="text" className="form-control bg-dark text-white" id="department" name="department" onChange={onChange} placeholder="Enter department" />
          </div>
          <div className="form-group position-relative my-2">
            <label htmlFor="password" className="text-white my-1">Password<sup>*</sup></label>
            <input type={passwordVisible ? "text" : "password"} className="form-control bg-dark text-white" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} />
            <button type="button" className="btn btn-link text-white position-absolute" style={{ top: '70%', right: '10px', transform: 'translateY(-50%)' }} onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="form-group position-relative my-2">
            <label htmlFor="confirmPassword" className="text-white my-1">Confirm Password<sup>*</sup></label>
            <input type={confirmPasswordVisible ? "text" : "password"} className="form-control bg-dark text-white" id="confirmPassword" name="confirmPassword" onChange={onChange} placeholder="Confirm Password" minLength={5} />
            <button type="button" className="btn btn-link text-white position-absolute" style={{ top: '70%', right: '10px', transform: 'translateY(-50%)' }} onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="btn btn-light btn-block my-1 w-100">Sign Up</button>
          <div className="text-center  mb-4">
            <span className="text-white">Already have an account? </span>
            <a href="/login" className="text-white">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;