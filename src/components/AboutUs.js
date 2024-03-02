import coolDefault from '../assets/avatar/profile-42914_1280.png'
import coolerDefault from '../assets/avatar/facebook_default_picture_by_adnac_d2r2hul-fullview1.jpg'

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

        </div>
     );
}

export default AboutUs;