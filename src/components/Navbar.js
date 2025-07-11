import React ,{useRef}from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const refCloseCanvas = useRef(null);

  const closeCanvasIndirect = () => {
    if(refCloseCanvas.current){
      refCloseCanvas.current.click();
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

 
  return (
    <>
      <div
        className="offcanvas offcanvas-start "
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            PCE's Anonymous <span style={{ color: "brown" }}>{"</>"}</span>
          </h5>
          <button
          ref={refCloseCanvas}
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body container">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link " to="/" onClick={(e) => closeCanvasIndirect()}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/" onClick={(e) => closeCanvasIndirect()}>
                Webinars
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/" onClick={(e) => closeCanvasIndirect()}>
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/" onClick={(e) => closeCanvasIndirect()}>
                Competitons
              </Link>
            </li>
            
          </ul>
          <hr />
          <h4>PCE's latest updates </h4>
        </div>
        <br />
        <ul className="nav">
          <li className="nav-item">
              <Link className="nav-link " to="/futurepanel" onClick={(e) => closeCanvasIndirect()}>
                Future Updates
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/about" onClick={(e) => closeCanvasIndirect()}>
                About us
              </Link>
            </li>
        </ul>
      </div>

      {/* actual code  */}

      <nav className="navbar bg-body-tertiary">
        <i
          id="hamburger"
          className="fa-solid fa-bars mx-5 mt-3 btn "
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
          style={{ position: "absolute", top: "20%", cursor: "pointer" }}
        ></i>
        <div className="container-fluid h5 d-flex justify-content-center">
          <sup id="priyadarshini">Priyadarshini's</sup>
          <span className="navbar-brand mb-2 mt-3 h1">
            <span id="title">Anonymous</span> <sub id="title02">media</sub>{" "}
          </span>
        </div>
        <div
          className="justify-content-end"
          style={{ position: "absolute", right: "1%", cursor: "pointer" }}
        >
          {/* <Link class="btn btn-dark mx-1" to="/login" role="button">Login</Link>
        <Link class="btn btn-dark mx-1" to="/signup" role="button">SignUp</Link> */}
          {localStorage.getItem("authtoken") ? (
            <i
              class="fa-solid fa-arrow-right-from-bracket btn "
              onClick={handleLogOut}
            ></i>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
