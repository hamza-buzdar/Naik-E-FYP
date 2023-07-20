import React from 'react'
import { useState , useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/newRequest';
import Logo from "./Logo1.png";
import AnchorLink from "react-anchor-link-smooth-scroll";


const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
      <div className="logo">
          <Link to='/' className='link'>
                <img className="logo" src={Logo} alt= "Logo" style={{width:'170px',height:'130px'}}></img>
          </Link>
            </div>
        <div className="links">
          <span>About</span>
          <span className='link'><AnchorLink href='#contact' style={{textDecoration:'none',color:'rgb(0 173 238)'}} >Contact</AnchorLink></span>
          <span className='link'><AnchorLink href='#stories'  style={{textDecoration:'none',color:'rgb(0 173 238)'}}>Stories</AnchorLink></span>
          <Link to='/register' className='link'>{!currentUser?.isNeedy && <span>Register</span>}</Link>
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/no.jpg"} alt="" />
              <span>{currentUser?.name}</span>
              {open && (
                <div className="options">
                  {currentUser.isNeedy && (
                    <>
                      <Link className="link" to="/userneeds">
                        My Needs
                      </Link>
                      <Link className="link" to="/create">
                        Create a Need
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/processrequests">
                    Process Requests
                  </Link>
                  <Link className="link" to="/chats">
                    Chats
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>

            </>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Navbar;
    
