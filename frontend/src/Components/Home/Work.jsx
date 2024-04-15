import SearchImg from "../../assets/lupa-imagine.png";
import AnalyseImg from "../../assets/dashboard.png";
import SaveImg from "../../assets/save-instagram.png";

const Work = () => {
  const workInfoData = [
    {
      image: SearchImg,
      title: "Discover Talents",
      text: "Utilize the search feature to find potential players based on your preferred criteria.",
    },
    {
      image: AnalyseImg,
      title: "Analyze Performances",
      text: "Evaluate players' skills and performances using our analysis tools. ",
    },
    {
      image: SaveImg,
      title: "Save and share",
      text: "Save your favorite players to a personal list and share the results with your team.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Our platform streamlines the scouting process, making it easier to
          find the perfect fit for your team.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data, index) => (
          <div className="work-section-info" key={data.id || index}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
