import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <div>
      
      <footer className="footer">
        <Link to="/"><button><img width="25" height="25" src="https://img.icons8.com/fluency-systems-regular/50/home--v1.png" alt="home--v1"/></button></Link>
        <Link to ="/addpost"><button>➕</button></Link>
        <Link to="/profile"><button><img width="25" height="25" src="https://img.icons8.com/fluency-systems-regular/50/user-male-circle--v1.png" alt="user-male-circle--v1"/></button></Link>
      </footer>
    </div>
  );
}

export default Footer;
