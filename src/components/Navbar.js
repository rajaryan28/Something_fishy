import React from "react";

const Navbar = () => {
  return (
    <>


<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <ul class="nav">
  <li class="nav-item">
    <a class="nav-link " aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link " href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
</ul>
<h4>Hey my name is Raj aryan </h4>
  </div>
</div>



      {/* actual code  */}


      <nav className="navbar bg-body-tertiary">
        <i id="hamburger" className="fa-solid fa-bars mx-5 mt-3 btn " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" style={{"position": "absolute",
    "top": "20%","cursor":"pointer"}}></i>
        <div className="container-fluid h5 d-flex justify-content-center">
      <sup id="priyadarshini" >Priyadarshini's</sup>
          <span className="navbar-brand mb-2 mt-3 h1"><span id="title">Anonymous</span> <sub id="title02">media</sub> </span>
        </div>
      </nav>


    </>
  );
};

export default Navbar;
