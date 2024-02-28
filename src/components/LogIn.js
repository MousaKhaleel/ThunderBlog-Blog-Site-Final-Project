import React from 'react';
import './mainStyle.css'

function LogIn() {
  return (
    <div className='wContainer'>
    <div className="container-md mx-auto w-100 p-5 mt-5 rounded" style={{ background: 'rgb(247,247,247)' }}>
    <h1>LogIn</h1>
      <form action="http://localhost:8000/login" method="post">
        <div className="form-group">
          <label htmlFor="email">Name</label>
          <input name="name" type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your name" />

          <label htmlFor="email">Email</label>
          <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />

          <label htmlFor="password">Password</label>
          <input name="password" type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <br />
        <p><small>Don't have an account yet?<a href='/Register'> Let's start Blogging!</a></small></p>
        <br/>
        <button type="submit" className="btn w-100" style={{ background: 'rgb(255, 150, 0)', color:'white' }} >LogIn</button>
      </form>
    </div>
    </div>
  );
}

export default LogIn;