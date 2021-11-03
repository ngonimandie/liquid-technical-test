import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png"

const Navbar = () => {
  const [scrollNav, setScrollNav] = useState(false);
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, []);
  return (

    <nav id="top" class="nav">
        <Link class="nav-logo" href="/">
          <img src={logo} alt="LT logo" className="logo" />
        </Link>
        <div className= "nav-bars" />
        <div class="nav-menu" id="navbarMenu">
          <div class="mx-auto"></div>
            <Link to="/" class="nav-item">
              <a class="nav-item " href="/">Home</a>
            </Link>
            <Link to="cart" class="nav-item">
              <a class="nav-item " href="/">Cart</a>
            </Link>
            
            <nav className="nav-btn">
              <Link className= "nav-btn-link">Account</Link>
              </nav>
        </div>

      
    </nav>
  )
}

export default Navbar
