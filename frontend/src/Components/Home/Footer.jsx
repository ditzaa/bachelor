import Logo from "../../assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Help</span>
          <span>Share</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>0746337825</span>
          <span>adrianmitu83@gmail.com</span>
          <span>mituadrian21@stud.ase.ro</span>
          <span>talentspotter@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
