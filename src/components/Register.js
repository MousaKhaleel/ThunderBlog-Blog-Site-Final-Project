function Register() {
    return ( 
        <div className="container-md mx-auto w-100 p-5 mt-5 rounded" style={{ background: 'rgb(247,247,247)' }}>
        <form action="http://localhost:8000/register" method="post">
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <input name="name" type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your name" />
  
            <label htmlFor="email">Email</label>
            <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
  
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="form-control" id="password" placeholder="Must be +8 chracters" />
            <label htmlFor="cpassword">Confirm Password</label>
            <input name="cpassword" type="password" className="form-control" id="cpassword" placeholder="Password" />
          </div>
          <br />
        <p><small>Already have an account?<a href='/LogIn'> LogIn</a></small></p>
        <br/>
          <button type="submit" className="btn w-100" style={{ background: 'rgb(255, 150, 0)', color:'white' }} >Register</button>
        </form>
      </div>
     );
}

export default Register;