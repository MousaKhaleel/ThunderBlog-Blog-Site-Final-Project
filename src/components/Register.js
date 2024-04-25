import { useState } from 'react';
import './mainStyle.css'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);

async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    if(password===confirmPassword){
    const res=await fetch('http://localhost:8000/register',{
    method:'POST',
    body: JSON.stringify({name, email, password}),
    headers:{'Content-Type':'application/json'}
  })
  setLoading(false)
  setRedirect(true)
}
else{
  alert('Password and confirm password do not match')
  setLoading(false)
}
}

if(redirect){
  return <Navigate to={'/login'} />
}

    return ( 
      <div className="wContainer">
        <div className="container-md mx-auto w-100 p-5 mt-5 rounded" style={{ background: 'rgb(247,247,247)' }}>
            <h1>Register</h1>
            <br/>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <input name="name" type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your name" />
            <br/>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            <br/>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" id="password" placeholder="Must be +8 chracters" />
            <br/>
            <label htmlFor="cpassword">Confirm Password</label>
            <input name="cpassword" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="form-control" id="cpassword" placeholder="Password" />
          </div>
          <br />
        <p><small>Already have an account?<Link to='/login'> Let's LogIn.</Link></small></p>
        <br/>
          { !loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} >Register</button>}
          { loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} disabled >Loading...</button>}
        </form>
      </div>
      </div>
     );
}

export default Register;