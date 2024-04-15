import AboutBackground from "../../assets/about-background.png";
import AboutBackgroundImage from "../../assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-subheading">
          Building Winning Teams Starts Here
        </h1>
        <p className="primary-subheading">
          Our mission is to uncover hidden talent and nurture it to greatness.
        </p>
        <p className="primary-text">
          We understand the importance of teamwork, dedication, and passion in
          the beautiful game.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn more</button>
          {/* <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default About;
