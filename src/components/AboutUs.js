import coolDefault from '../assets/avatar/profile-42914_1280.png'
import coolerDefault from '../assets/avatar/facebook_default_picture_by_adnac_d2r2hul-fullview1.jpg'
import { Link } from 'react-router-dom';

function AboutUs() {
    return ( 
        <div className="container">
        <h1 style={{marginTop:'1%'}}>Who are we?</h1>
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
<hr/>
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
<div>
<hr/>
<br/>
<div className="accordion accordion-flush" id="accordionFlushExample">
<h2>FAQs:</h2>
<br/>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseOne"
        aria-expanded="false"
        aria-controls="flush-collapseOne"
      >
        What is a Blog?
      </button>
    </h2>
    <div
      id="flush-collapseOne"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingOne"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      Blog is a regularly updated web page, typically one run by an individual or small group, that is written in an informal or conversational style.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingTwo">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseTwo"
        aria-expanded="false"
        aria-controls="flush-collapseTwo"
      >
        How can i communicate with support?
      </button>
    </h2>
    <div
      id="flush-collapseTwo"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingTwo"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        Email us at: mousakhaleel22@gmail.com
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingThree">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseThree"
        aria-expanded="false"
        aria-controls="flush-collapseThree"
      >
        How do I Blog?
      </button>
    </h2>
    <div
      id="flush-collapseThree"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingThree"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        First make an account, Then go to write a blog, And finaly thing of somtheing a story you want to tell perhaps and when you are done click publish.
      </div>
    </div>
  </div>
</div>

</div>
        </div>
     );
}

export default AboutUs;