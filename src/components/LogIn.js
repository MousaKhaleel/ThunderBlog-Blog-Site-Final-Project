import React, { useEffect } from 'react';
import './mainStyle.css'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function LogIn() {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        setRedirect(true);
      } else {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      alert('Failed to login: ' + error.message);
    }
  }

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [redirect]);

  if(redirect){
        return <Navigate to={'/'} />
  }
  return (
    <div className='wContainer'>
    <div className="container-md mx-auto w-100 p-5 mt-5 rounded" style={{ background: 'rgb(247,247,247)' }}>
    <h1>Log In</h1>
    <br/>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
      <br/>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} id="password" placeholder="Password" />
        </div>
        <br />
        <p><small>Don't have an account yet?<a href='/register'> Let's Blog!</a></small></p>
        <br/>
        {!loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} >LogIn</button>}
        {loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} disabled >Loading...</button>}
      </form>
    </div>
    </div>
  );
}

export default LogIn;