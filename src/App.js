import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HomePage from './components/HomePage';
import defaultAv from './assets/avatar/profile-42914_1280.png'
import './components/mainStyle.css'
import Logo from './assets/9HDL7w-LogoMakr.png'
import LogIn from './components/LogIn';
import Register from './components/Register';
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Logo2 from './assets/1GTNqX-LogoMakr.png';
import AboutUs from './components/AboutUs';
// rgb(28, 28, 132) secondry color
function App() {

  function NavBarAndHeaders() {
    return( 
<nav class="navbar navbar-expand-lg navbar-dark" style={{background:'rgb(0, 0, 66)'}}>
  <div class="container-fluid">
  <a class="navbar-brand" href="/">
      <img src={Logo} alt="ThunderBlog" width="40"/>ThunderBlog
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">All Blogs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/AboutUs">About us</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User Account
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="/LogIn">Account</a></li>
            <li><a class="dropdown-item" href="#">history</a></li>
            <li><a class="dropdown-item" href="#">Log out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
     );
  }

//   useEffect( ()=> { fetch('http://localhost:8000/allblogs')
// .then(res => res.json())
// .then(data => setData(data))
// .catch(error => console.error(error))
// },[])
//     return(JSON.stringify(data))
// }



  function Footer() {
    return( 
      <div class="footer-dark">
      <footer>
          <div class="container">
              <div class="row">
                  <div class="col-sm-6 col-md-3 item">
                      <h3>Services</h3>
                      <ul>
                          <li><a href="#">Web design</a></li>
                          <li><a href="#">Development</a></li>
                          <li><a href="#">Hosting</a></li>
                      </ul>
                  </div>
                  <div class="col-sm-6 col-md-3 item">
                      <h3>About</h3>
                      <ul>
                          <li><a href="#">Company</a></li>
                          <li><a href="#">Team</a></li>
                          <li><a href="#">Careers</a></li>
                      </ul>
                  </div>
                  <div class="col-md-6 item text">
                      <img src={Logo2} width={'200px'}/>
                      <p>Write like never before.</p>
                  </div>
                  <div class="col item social"><a href="#"><FaLinkedinIn /></a><a href="#"><FaGithub /></a><a href="#"><FaLinkedinIn /></a><a href="#"><FaGithub /></a></div>
              </div>
              <p class="copyright">ThunderBlog © 2024</p>
          </div>
      </footer>
  </div>
     );
  }

  return (
    <div className="App">
    <NavBarAndHeaders/>
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Routes>
                <Route path="/LogIn" element={<LogIn />} />
            </Routes>
            <Routes>
                <Route path="/Register" element={<Register />} />
            </Routes>
            <Routes>
                <Route path="/AboutUs" element={<AboutUs />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
