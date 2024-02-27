import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import defaultAv from './assets/profile-42914_1280.png'
import backgroundImage from './assets/pexels-tirachard-kumtanom-733856.jpg';
import './components/mainStyle.css'

function App() {

  function NavBarAndHeaders() {
    return( 
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
     );
  }

  function Temp() {
     
  
    return(
<div
  lc-helper="background"
  className="container-fluid py-5 mb-4 d-flex justify-content-center"
  style={{
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
>
  <div
    className="p-5 mb-4 lc-block col-xxl-7 col-lg-8 col-12"
    style={{
      backdropFilter: "blur(6px) saturate(102%)",
      WebkitBackdropFilter: "blur(6px) saturate(102%)",
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      borderRadius: 12,
      border: "1px solid rgba(209, 213, 219, 0.3)"
    }}
  >
    <div className="lc-block">
      <div editable="rich">
        <h2 className="fw-bolder display-3">Custom jumbotron</h2>
      </div>
    </div>
    <div className="lc-block col-md-8">
      <div editable="rich">
        <p className="lead">
          Using a series of utilities, you can create this jumbotron, just like
          the one in previous versions of Bootstrap. Check out the examples
          below for how you can remix and restyle it to your liking.
        </p>
      </div>
    </div>
    <div className="lc-block">
      <a className="btn btn-dark" href="#" role="button">
        Click me, I'm a button
      </a>
    </div>
  </div>
</div>

    );
 
  
  }

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
                      <h3>Company Name</h3>
                      <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                  </div>
                  <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
              </div>
              <p class="copyright">Company Name © 2018</p>
          </div>
      </footer>
  </div>
     );
  }

  return (
    <div className="App">
    <NavBarAndHeaders/>
    <Temp />
    <main>
    <BrowserRouter>
    
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
        </main>
        <Footer />
    </div>
  );
}

export default App;
