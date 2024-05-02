import { useContext, useEffect, useState } from "react";
import './mainStyle.css'
import { UserContext } from "./UserContext";

function ProfileDetails() {
    const [loading, setLoading]=useState(false);
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');

    const {userId, userName, setUserName, userEmail, userPassword}=useContext(UserContext);

    function handleLogout() {
      fetch('http://localhost:8000/logout',{
        credentials:'include',
        method:'POST'
      })
      setUserName(null)
    }//

    async function HandleChangePassword(e){
        e.preventDefault()
        setLoading(true)
        if(password===confirmPassword){
        const res=await fetch('http://localhost:8000/changePassword',{
        method:'POST',
        body: JSON.stringify({userId, password}),
        headers:{'Content-Type':'application/json'}
      })
      setLoading(false)
      handleLogout();
      window.location.reload();
    }
    else{
      alert('Password and confirm password do not match')
      setLoading(false)
    }
    }

    return ( 
        <main>
        {loading && <h2 className="hl">Loading...</h2>}
        <div className="detailsContainer">
<div className="card m-auto" style={{ minWidth: "18rem" }}>
  <div className="card-header"><h3>Account Details:</h3></div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name: {userName}</li>
    <li className="list-group-item">Email: {userEmail}</li>
    <li className="list-group-item">Password: {userPassword}</li>
            <br/>
    <label htmlFor="password">New password:</label>
            <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" id="password" placeholder="Must be +8 chracters" />
            <label htmlFor="cpassword">Confirm new Password:</label>
            <input name="cpassword" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="form-control" id="cpassword" placeholder="Confirm password" />
    <button type="submit" className="btn" onClick={HandleChangePassword} style={{ background: 'rgb(0, 166, 204)', color:'white' }} >Change Password</button>
  </ul>
</div>
        </div>
        </main>
     );
}

export default ProfileDetails;