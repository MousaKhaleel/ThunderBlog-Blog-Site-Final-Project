import { useContext, useEffect, useState } from "react";
import './mainStyle.css'
import { UserContext } from "./UserContext";

function ProfileDetails() {
    const [loading, setLoading]=useState(false);

    const {userName, userEmail, userPassword}=useContext(UserContext);
    return ( 
        <main>
        {loading && <h2 className="hl">Loading...</h2>}
        <div className="detailsContainer">
<div className="card m-auto" style={{ width: "18rem" }}>
  <div className="card-header"><h3>Account Details:</h3></div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name: {userName}</li>
    <li className="list-group-item">Email: {userEmail}</li>
    <li className="list-group-item">Password: {userPassword}</li>
  </ul>
</div>
        </div>
        </main>
     );
}

export default ProfileDetails;