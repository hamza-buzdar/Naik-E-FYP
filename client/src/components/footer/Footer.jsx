import React from 'react';
import './Footer.css';
import logo from "./Logo1.png"
import { Link, useLocation } from "react-router-dom";

import "./footer.css"
export default function Footer() {
  return (
    <footer >

        <div className='main-first' id='contact'>
          <div className='main-first-one'>
            <Link to="/">
          <img src={logo}style={{height:'100px', width:'120px',background:'transparent',marginTop:'0px'}} ></img>
          </Link>
            
            {/* <h3 style={{color:'rgb(98, 235, 197)', fontSize:'22px'}}>Naik-E</h3> */}
            <p style={{fontStyle:'italic'}}>
                Naik-E is a platform striving to serve humanity in the best needs.
              </p>
          </div>
          <div className='main-first-two'>
            <ul>
              <li ><Link to='/' style={{textDecoration:'none',color:'rgb(0 173 238)'}} >Home</Link></li>
              <li><Link to='#' style={{textDecoration:'none',color:'rgb(0 173 238)'}} >About</Link></li>
              <li><Link to='/register' style={{textDecoration:'none',color:'rgb(0 173 238)'}} >SignUp</Link></li>
              <li><Link to='/login' style={{textDecoration:'none',color:'rgb(0 173 238)'}} >Login</Link></li>
            </ul>
          </div>
          <div className='main-first-one'>
            <h3 style={{fontFamily:'monospace',color:'rgb(0 173 238)',fontSize:'25px'}}>Contact</h3>
            <h4><span style={{color:'rgb(98, 235, 197)', fontSize:'16px'}}>info@naike.org</span></h4>
            <h4><span style={{color:'rgb(98, 235, 197)', fontSize:'16px'}}>0333-3332020</span></h4>
            <h4><span style={{color:'rgb(98, 235, 197)', fontSize:'16px'}}>www.naike.org</span></h4>
          </div>
        </div>

    </footer>

  )}