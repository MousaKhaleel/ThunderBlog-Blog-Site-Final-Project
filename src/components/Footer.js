import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Logo2 from '../assets/1GTNqX-LogoMakr.png';
import './mainStyle.css'

function Footer() {
    return ( 
        <div className="footer-dark">
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Web design</a></li>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Hosting</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 item text">
                        <img src={Logo2} width={'200px'}/>
                        <p>Write like never before.</p>
                    </div>
                    <div className="col item social"><a href="#"><FaLinkedinIn /></a><a href="#"><FaGithub /></a><a href="#"><FaLinkedinIn /></a><a href="#"><FaGithub /></a></div>
                </div>
                <p className="copyright">ThunderBlog © 2024</p>
            </div>
        </footer>
    </div>
     );
}

export default Footer;