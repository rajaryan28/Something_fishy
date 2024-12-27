import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
  return (
    <>
          <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'radial-gradient(circle,rgb(107, 109, 111),rgb(24, 24, 25))', marginTop: '-80px' }}>
      <div className="col-md-4">
        <h2 className="text-center text-white">Login</h2>
        <form>
          <div className="form-group my-2">
            <label htmlFor="email" className="text-white my-1">Email address<sup>*</sup></label>
            <input type="email" className="form-control bg-dark text-white" id="email" placeholder="Enter email" />
          </div>
          <div className="form-group position-relative">
            <label htmlFor="password" className="text-white my-1">Password<sup>*</sup></label>
            <input type={passwordVisible ? "text" : "password"} className="form-control bg-dark text-white" id="password" placeholder="Password" />
            <button type="button" className="btn btn-link text-white position-absolute" style={{ top: '69%', right: '1px', transform: 'translateY(-50%)' }} onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="btn btn-light btn-block my-3 w-100">Log In</button>
          <div className="text-center">
            <a href="/" className="text-white">Forgot Password?</a>
          </div>
          <div className="text-center mt-3">
            <span className="text-white">Don't have an account? </span>
            <a href="/signup" className="text-white">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
