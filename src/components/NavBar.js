import { useEffect } from 'react';
import Logo from '../assets/9HDL7w-LogoMakr.png'
import defaultAv from '../assets/avatar/profile-42914_1280.png'
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import { FaHome } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";


function NavBar() {
  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
      credentials:'include'
    })
  })
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark" style={{background:'rgb(0, 0, 66)'}}>
  <div className="container-fluid">
  <a className="navbar-brand" href="/">
      <img src={Logo} alt="ThunderBlog" width="40"/>ThunderBlog
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/"><FaHome /> Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><FaCloud /> My Blogs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/writeblog"><FaCloud /> Write a blog</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/aboutus"><HiIdentification /> About us</a>
        </li>
        <li className="nav-item dropdown user">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <MdAccountBox /> User Account
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/login"><MdAccountCircle /> Account</a></li>
            <li><a className="dropdown-item" href="#"><FaHistory /> History</a></li>
            <li><a className="dropdown-item" href="#"><IoIosLogOut /> Log out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
     );
}

export default NavBar;