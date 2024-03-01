import './mainStyle.css'
import backgroundImage from '../assets/pexels-picography-4458.jpg';

function HeroSection() {
    return ( 
        <div
  lc-helper="background"
  className="container-fluid py-5 mb-4 d-flex justify-content-center"
  style={{
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderEndEndRadius:'4px',
    borderEndStartRadius:'4px'
  }}
>
  <div
    className="p-5 mb-4 lc-block col-7 col-8 col-11">
    <div className="lc-block">
      <div editable="rich">
        <h2 className="fw-bolder display-3" style={{color:'white'}}>Welcome to ThunderBlog</h2>
      </div>
    </div>
    <div className="lc-block col-md-8">
      <div editable="rich">
        <p className="lead" style={{color:'white'}}>
        Write, Read and Discover like never before.
        </p>
      </div>
    </div>
    <div className="lc-block">
      <a className="btn" href="#" role="button" style={{background: 'rgb(0, 166, 204)', color:'white'}}>
        Let's start
      </a>
    </div>
  </div>
</div>
     );
}

export default HeroSection;