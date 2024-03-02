import { useEffect, useState  } from 'react';
import Logo from '../assets/3XHUPg-LogoMakr.png'
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
import { IoMdLogIn } from "react-icons/io";
import { TbWritingSign } from "react-icons/tb";


function NavBar() {
  const [name,setName]=useState(null)

  useEffect(()=>{
    try {
      fetch('http://localhost:8000/profile',{
        credentials:'include',
        method:'GET'
      }).then(res=>{
        res.json().then(info=>{
          setName(info.name)
        })
      },[])
    } catch (error) {
      console.log(error)
    }
    })

    function handleLogout() {
      fetch('http://localhost:8000/logout',{
        credentials:'include',
        method:'POST'
      })
      setName(null)
    }

    return ( 
<nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'rgb(11, 36, 71)' }}>
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      <img src={Logo} alt="ThunderBlog" width="40" /> ThunderBlog
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/"><FaHome /> Home</a>
        </li>
        {name && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/allblogs"><FaCloud /> All Blogs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/writeblog"><TbWritingSign /> Write a blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/aboutus"><HiIdentification /> About us</a>
            </li>
          </>
        )}
        {!name && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/allblogs"><FaCloud /> All Blogs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login"><TbWritingSign /> Write a blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/aboutus"><HiIdentification /> About us</a>
            </li>
          </>
        )}
      </ul>
      {name && (
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{background:'rgb(0, 166, 204)',color:'white',borderRadius:'2px'}}>
              <MdAccountBox /> {name}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li><a className="dropdown-item" href="/profiledetails"><MdAccountCircle /> Profile</a></li>
              <li><a className="dropdown-item" href="/userhistory"><FaHistory /> History</a></li>
              <li><a className="dropdown-item" onClick={handleLogout} href="/"><IoIosLogOut /> Log out</a></li>
            </ul>
          </li>
        </ul>
      )}
      {!name && (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/login" style={{background:'rgb(0, 166, 204)',color:'white',borderRadius:'2px'}}><IoMdLogIn /> Login</a>
          </li>
        </ul>
      )}
    </div>
  </div>
</nav>
     );
}

export default NavBar;