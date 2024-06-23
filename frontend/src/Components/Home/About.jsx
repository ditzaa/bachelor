import AboutBackground from "../../assets/about-background.png";
import AboutBackgroundImage from "../../assets/about-background-image.png";
import { Link } from "react-router-dom";

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
          Construirea unei echipe câștigătoare începe aici!
        </h1>
        <p className="primary-subheading">
          Misiunea noastă este să descoperim viitoarele talente și să le aducem
          în prim-planul lumii fotbalistice.
        </p>
        <p className="primary-text">
          Știm cât de importante sunt munca în echipă, dedicarea și pasiunea
          pentru sportul-rege.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Află mai multe</button>
        </div>
      </div>
    </div>
  );
};

export default About;
