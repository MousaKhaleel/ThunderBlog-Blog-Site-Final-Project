import { useEffect,useState } from 'react';
import Logo from '../assets/9HDL7w-LogoMakr.png'
import defaultAv from '../assets/avatar/profile-42914_1280.png'
import $ from 'jquery'; 
import Popper from 'popper.js'; 


function NavBar() {
  const [name,setName]=useState(null)
  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
      credentials:'include',
      method:'GET'
    }).then(res=>{
      res.json().then(info=>{
        setName(JSON.stringify(info))
      })
    },[])
    console.log(name)
  })

  function handleLogout() {
    fetch('http://localhost:3000/logout',{
      credentials:'include',
      method:'POST'
    })
    setName(null)
  }

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
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        {name && <>
          <li className="nav-item">
          <a className="nav-link" href="/myblogs">My Blogs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/writeblog">Write a blog</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/aboutus">About us</a>
        </li>
        <li className="nav-item dropdown user">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome {name}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/login">Account</a></li>
            <li><a className="dropdown-item" href="#">history</a></li>
            <li><a className="dropdown-item" onClick={handleLogout} href="#">Log out</a></li>
          </ul>
        </li>
        </>}
        {!name && <>
        <li className="nav-item">
          <a className="nav-link" href="/login">My Blogs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Write a blog</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/aboutus">About us</a>
        </li>
        <li className="nav-item dropdown user">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Log In
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/login">LogIn</a></li>
          </ul>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>
     );
}

export default NavBar;