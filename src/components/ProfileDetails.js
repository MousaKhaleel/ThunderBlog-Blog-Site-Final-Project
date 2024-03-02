import { useEffect, useState } from "react";
import './mainStyle.css'

function ProfileDetails() {
    const [name,setName]=useState(null)
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [loading, setLoading]=useState(false);

    useEffect(()=>{
      try {
        setLoading(true)
        fetch('http://localhost:8000/profile',{
          credentials:'include',
          method:'GET'
        }).then(res=>{
          res.json().then(info=>{
            setName(info.name)
            setEmail(info.email)
            setPassword(info.password)
          })
        },[])
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
      })
    return ( 
        <main>
        {loading && <h2 className="hl">Loading...</h2>}
        <div className="detailsContainer">
<div className="card m-auto" style={{ width: "18rem" }}>
  <div className="card-header"><h3>Account Details:</h3></div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name: {name}</li>
    <li className="list-group-item">Email: {email}</li>
    <li className="list-group-item">Password: {password}</li>
  </ul>
</div>
        </div>
        </main>
     );
}

export default ProfileDetails;