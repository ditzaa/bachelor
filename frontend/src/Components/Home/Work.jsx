import SearchImg from "../../assets/lupa-imagine.png";
import AnalyseImg from "../../assets/dashboard.png";
import SaveImg from "../../assets/save-instagram.png";

const Work = () => {
  const workInfoData = [
    {
      image: SearchImg,
      title: "Descoperă talente",
      text: "Utilizează funcționalitatea de căutare pentru a găsi potențiali jucători bazat pe criteriile tale de căutare.",
    },
    {
      image: AnalyseImg,
      title: "Analizează performanțele",
      text: "Evaluează calitățile jucătorilor și performanțele acestora folosind informațiile furnizate de către noi. ",
    },
    {
      image: SaveImg,
      title: "Salvează și distribuie",
      text: "Salvează-ți jucătorii preferați într-o listă personală de jucători favoriți și împărtășește rezultatele cu colegii tăi.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">Cum funcționează?</h1>
        <p className="primary-text">
          Platforma noastră facilitează procesul de scouting și ușurează găsirea
          jucătorului perfect pentru echipa ta.
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
