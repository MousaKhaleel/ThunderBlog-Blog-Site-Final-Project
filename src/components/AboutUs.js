import coolDefault from '../assets/avatar/profile-42914_1280.png'
import coolerDefault from '../assets/avatar/facebook_default_picture_by_adnac_d2r2hul-fullview1.jpg'
import { Link } from 'react-router-dom';

function AboutUs() {
    return ( 
        <div className="container">
        <div className="teamContainer">
            <div className="card" style={{ width: "18rem" }}>
  <img className="card-img-top" src={coolerDefault} alt="MK" />
  <div className="card-body">
    <p className="card-text">
    CEO: Mousa Khaleel
    </p>
  </div>
</div>
<div className="card" style={{ width: "18rem" }}>
  <img className="card-img-top" src={coolDefault} alt="YF" />
  <div className="card-body">
    <p className="card-text">
    COO: Yazeed Fayoumi
    </p>
  </div>
</div>
</div>
<p style={{marginBlock:'2%',background:'rgb(247,247,247)', padding:'2%',borderRadius:'4px'}}>
Welcome to <span style={{color:'rgb(0, 166, 204)'}}><Link to='/'>ThunderBlog</Link></span>, where we write history! We are passionate about sharing knowledge and creating a community of unique individuals who want to explore and share their explorations.


At <span style={{color:'rgb(0, 166, 204)'}}><Link to='/'>ThunderBlog</Link></span>, we believe that knowledge is power, and we want to empower you with information that can change your life.


We made it our mission to create a user-friendly platform that enhances your reading experience.


We value the diversity of opinions and encourage conversations. We believe that everyone has a story to tell and a unique viewpoint to share. We believe in you. 


<span style={{color:'rgb(0, 166, 204)'}}><Link to='/'>ThunderBlog</Link></span> aims to be your trusted place on your journey of blogging, exploration, and growth. We are here to answer your expectations. Join us, and let's make the world a better place.
<br/>
<br/>
Thank you for being a part of our community.
<br/>
<span style={{color:'gery'}}><Link to='/'>ThunderBlog</Link></span> Inc.
</p>
        </div>
     );
}

export default AboutUs;