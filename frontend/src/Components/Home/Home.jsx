//import "./Home.css";
import Navbar from "./Navbar";
import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Discover The Next Top Talents in Football
          </h1>
          <p className="primary-text">
            Get ahead of the game with our comprehensive scouting reports and
            insights.
          </p>
          <Link to="/register" className="link-class">
            <button className="secondary-button">
              Scout Now <FiArrowRight />{" "}
            </button>
          </Link>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
