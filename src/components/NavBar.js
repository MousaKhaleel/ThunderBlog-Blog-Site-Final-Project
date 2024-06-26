import { useContext, useEffect, useState  } from 'react';
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
import { UserContext } from './UserContext';
import { ThemeContext } from './ThemeContext';
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";


function NavBar() {
  const {userName, setUserName, setUserId, setUserEmail, setUserPassword}=useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('box');
    setIsChecked(savedTheme === 'dark');
  }, []);

    function handleLogout() {
      fetch(process.env.REACT_APP_API_URL+'/logout',{
        credentials:'include',
        method:'POST'
      })
      setUserName(null)
      setUserId(null)
      setUserEmail(null)
      setUserPassword(null)
    }//

    const{toggleTheme}=useContext(ThemeContext)
    
    function HandleThemeToggle(){
      toggleTheme();
      localStorage.setItem('box', isChecked ? 'light' : 'dark');
      setIsChecked(!isChecked);
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
          <a className="nav-link" aria-current="page" href="/"><FaHome /> Home</a>
        </li>
        {userName && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/allblogs"><FaCloud /> All Blogs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/writeblog"><TbWritingSign /> Write a blog</a>
            </li>
            <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/recommended"><MdOutlineYoutubeSearchedFor /> recommended</a>
        </li>
            <li className="nav-item">
              <a className="nav-link" href="/aboutus"><HiIdentification /> About us</a>
            </li>
          </>
        )}
        {!userName && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/allblogs"><FaCloud /> All Blogs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login"><TbWritingSign /> Write a blog</a>
            </li>
            <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/login"><MdOutlineYoutubeSearchedFor /> recommended</a>
        </li>
            <li className="nav-item">
              <a className="nav-link" href="/aboutus"><HiIdentification /> About us</a>
            </li>
          </>
        )}
      </ul>
        <ul className="navbar-nav">
        <div className="navbar-nav d-flex align-items-center">
        <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={HandleThemeToggle} checked={isChecked}/>
  <label class="form-check-label" for="flexSwitchCheckChecked" style={{color:"rgb(194, 200, 209)", marginRight:"4px"}}><WiMoonAltThirdQuarter /></label>
  </div>
</div> 
      {userName && (
        <>
        <li className="nav-item">
        </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{background:'rgb(0, 166, 204)',color:'white',borderRadius:'2px'}}>
              <MdAccountBox /> {userName}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li><a className="dropdown-item" href="/profiledetails"><MdAccountCircle /> Profile</a></li>
              <li><a className="dropdown-item" href="/userhistory"><FaHistory /> History</a></li>
              <li><a className="dropdown-item" onClick={handleLogout} href="/"><IoIosLogOut /> Log out</a></li>
            </ul>
          </li>
          </>
      )}
      {!userName && (
          <li className="nav-item">
            <a className="nav-link" href="/login" style={{background:'rgb(0, 166, 204)',color:'white',borderRadius:'2px'}}><IoMdLogIn /> Login</a>
          </li>
      )}
        </ul>
    </div>
  </div>
</nav>
     );
}

export default NavBar;