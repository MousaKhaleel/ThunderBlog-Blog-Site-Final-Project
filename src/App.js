import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HomePage from './components/HomePage';
import './components/mainStyle.css'
import LogIn from './components/LogIn';
import Register from './components/Register';
import AboutUs from './components/AboutUs';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
// rgb(28, 28, 132) secondry color
function App() {

  useEffect( ()=> {
    fetch('http://localhost:8000/allblogs')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
},[])
    // return(JSON.stringify(data))

  const [user,setUser]=useState();

  return (
    <div className="App">
    <NavBar />
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
