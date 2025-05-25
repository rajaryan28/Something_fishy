import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();  // Extract token from the URL
  const [logincreds, setLogincreds] = useState({ password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/auth/resetpassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: logincreds.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert(json.message);
        navigate("/login");
      } else {
        alert(json.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    setLogincreds({ ...logincreds, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'radial-gradient(circle,rgb(107, 109, 111),rgb(24, 24, 25))', marginTop: '-80px' }}>
      <div className="col-md-4 mt-3 mx-3">
        <h2 className="text-left text-white">Reset Your Password</h2>
        <p>Looks like you forgot your older password.</p>
        <br />
        <p>Make sure to remember this new one</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="password" className="text-white my-1">New Password<sup>*</sup></label>
            <input
              type="password"
              className="form-control bg-dark text-white"
              id="password"
              name="password"  
              onChange={onChange}
              value={logincreds.password}
              placeholder="Enter new password"
              required
            />
          </div>
          <button type="submit" className="btn btn-light btn-block my-3 w-100">Submit</button>

          <div className="text-center mt-3">
            <span className="text-white">Back to </span>
            <Link to="/login" className="text-white">LogIn ?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
