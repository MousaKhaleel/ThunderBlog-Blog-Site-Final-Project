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
import WriteBlog from './components/WriteBlog';
// rgb(28, 28, 132) secondry color

function App() {



  const [user,setUser]=useState();

  async function login(user) {
    setUser(user);
  }

  // async function login(user) {
  //   setUser(user);
  // }

  return (
    <div className="App">
    <NavBar />
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Routes>
                <Route path="/writeblog" element={<WriteBlog />} />
            </Routes>
            <Routes>
                <Route path="/login" element={<LogIn />} />
            </Routes>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
            <Routes>
                <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
