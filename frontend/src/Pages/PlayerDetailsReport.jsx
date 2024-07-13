import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./PlayerDetailsReport.css";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import SliderComponent from "../Components/Search/SliderComponent";

const PlayerDetailsReport = () => {
  const { playerId, transfermarktId } = useParams();
  const [player, setPlayer] = useState(null);
  const [honours, setHonours] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [formerTeams, setFormerTeams] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [injuries, setInjuries] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [generalText, setGeneralText] = useState("");
  const [statisticsText, setStatisticsText] = useState("");
  const [injuriesText, setinjuriesText] = useState("");
  const [showReport, setShowReport] = useState(false);
  const userId = localStorage.getItem("userID");

  const navigate = useNavigate();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const fetchStatistics = async (transfermarktId) => {
    try {
      const statsResponse = await axios.get(
        `http://localhost:1234/api/player-stats/${transfermarktId}`
      );
      return statsResponse.data.stats;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return [];
    }
  };

  const fetchInjuries = async (transfermarktId) => {
    try {
      const injuriesResponse = await axios.get(
        `http://localhost:1234/api/player/${transfermarktId}/injuries`
      );
      return injuriesResponse.data.injuries;
    } catch (error) {
      console.error("Error fetching injuries:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const playerResponse = await axios.get(
          `http://localhost:1234/api/player-details/${playerId}`
        );
        const { player, honours, milestones, formerTeams, contracts } =
          playerResponse.data;

        setPlayer(player);
        setHonours(honours);
        setMilestones(milestones);
        setFormerTeams(formerTeams);
        setContracts(contracts);

        const playerStatistics = await fetchStatistics(transfermarktId);
        setStatistics(playerStatistics);

        const playerInjuries = await fetchInjuries(transfermarktId);
        setInjuries(playerInjuries);

        const favResponse = await axios.get(
          `http://localhost:1234/api/player/favorites/${userId}/${transfermarktId}`
        );
        setIsFavorite(favResponse.data.isFavorite);
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    };
    fetchPlayerData();
  }, [playerId, transfermarktId, userId]);

  const toggleFavorite = async () => {
    try {
      const url = isFavorite
        ? "http://localhost:1234/api/player/remove"
        : "http://localhost:1234/api/player/add";

      const method = isFavorite ? "delete" : "post";
      const data = {
        idTransfermarkt: transfermarktId,
        idTheSportsDB: playerId,
        name: player.strPlayer,
        team: player.strTeam,
        id: userId,
      };

      await axios({
        method,
        url,
        data,
      });

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleVideosClick = () => {
    navigate(`/player-videos/${playerId}`);
  };

  const handleCreateReport = () => {
    setShowReport(true);
  };

  const handleSaveReport = () => {
    // Logic to save the report
    console.log("Report saved:", reportText);
  };

  const handleSavePDF = () => {
    // Logic to save the report as PDF
    console.log("Report saved as PDF:", reportText);
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  const groupedMilestones = milestones.reduce((acc, milestone) => {
    const existing = acc.find((m) => m.strMilestone === milestone.strMilestone);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ ...milestone, count: 1 });
    }
    return acc;
  }, []);

  const toggleReport = () => {
    setIsReportOpen(!isReportOpen);
  };

  return (
    <>
      <NavbarDash />
      <div className={`container-report ${isReportOpen ? "report-open" : ""}`}>
        <div className="players-container-report">
          <div className="player-card-report">
            <h1>{player.strPlayer}</h1>
            <img src={player.strCutout} alt={player.strPlayer} />
            <div className="player-info-report">
              <p>
                <strong>Echipă:</strong> {player.strTeam}
              </p>
              <p>
                <strong>Pozitie:</strong> {player.strPosition}
              </p>
              <p>
                <strong>Locul nasterii:</strong> {player.strBirthLocation}
              </p>
              <p>
                <strong>Data nasterii:</strong> {player.dateBorn}
              </p>
              <p>
                <strong>Nationalitate:</strong> {player.strNationality}
              </p>
              <p>
                <strong>Inaltime:</strong> {player.strHeight}
              </p>
              <p>
                <strong>Greutate:</strong> {player.strWeight}
              </p>
              <p>
                <strong>Număr echipă:</strong> {player.strNumber}
              </p>
              <p>
                <strong>Valoare de piata:</strong> {player.strMarketValue}
              </p>
            </div>
            <button
              onClick={toggleReport}
              className="create-report-button-report"
            >
              {isReportOpen ? "Închide Raportul" : "Creează Raport"}
            </button>
          </div>
          <div className="player-details-card-report">
            <p className="description">
              <strong>Descriere(EN):</strong> {player.strDescriptionEN}
            </p>
            <h2>Premii</h2>
            <ul className="no-bullets">
              {honours.map((honour) => (
                <li key={honour.id}>
                  {honour.strHonour} - {honour.strSeason}
                </li>
              ))}
            </ul>

            <h2>Realizări</h2>
            <ul className="no-bullets">
              {groupedMilestones.map((milestone, index) => (
                <li key={index}>
                  <img
                    src={milestone.strMilestoneLogo}
                    alt={milestone.strMilestone}
                    className="milestone-logo"
                  />
                  {milestone.strMilestone}{" "}
                  {milestone.count > 1 && `x${milestone.count}`}
                </li>
              ))}
            </ul>
            <h2>Statistici</h2>
            <table className="statistics-table-report">
              <thead>
                <tr>
                  <th>Competitie</th>
                  <th>Sezon</th>
                  <th>Aparitii</th>
                  <th>Goluri</th>
                  <th>Pase de gol</th>
                  <th>Cartonase galbene</th>
                  <th>Minute jucate</th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.competitionName}</td>
                    <td>{stat.seasonID}</td>
                    <td>{stat.appearances || "-"}</td>
                    <td>{stat.goals || "-"}</td>
                    <td>{stat.assists || "-"}</td>
                    <td>{stat.yellowCards || "-"}</td>
                    <td>{stat.minutesPlayed || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Accidentari</h2>
            {injuries.length === 0 ? (
              <p>Nu exista accidentari inregistrate.</p>
            ) : (
              <table className="injuries-table-report">
                <thead>
                  <tr>
                    <th>Sezon</th>
                    <th>Accidentare</th>
                    <th>De la</th>
                    <th>Pana la</th>
                    <th>Zile</th>
                    <th>Meciuri ratate</th>
                  </tr>
                </thead>
                <tbody>
                  {injuries.map((injury, index) => (
                    <tr key={index}>
                      <td>{injury.season}</td>
                      <td>{injury.injury}</td>
                      <td>{injury.from}</td>
                      <td>{injury.until}</td>
                      <td>{injury.days}</td>
                      <td>{injury.gamesMissed || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <h2>Foste echipe</h2>
            <ul className="no-bullets-report">
              {formerTeams.map((team) => (
                <li key={team.idFormerTeam}>
                  <img
                    src={team.strBadge}
                    alt={team.strFormerTeam}
                    className="team-badge-report"
                  />
                  {team.strFormerTeam} ({team.strJoined} - {team.strDeparted})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="report-container-report">
          <div className="report-card-report" id="fixed-report">
            <h2>Raport pentru {player.strPlayer}</h2>
            <h4>Observații generale </h4>
            <textarea
              placeholder="Scrie observații generale aici..."
              value={generalText}
              onChange={(e) => setGeneralText(e.target.value)}
              rows="10"
              cols="50"
            ></textarea>
            <h4>Observații indicatori performanță </h4>
            <textarea
              placeholder="Scrie observații despre statistici aici..."
              value={statisticsText}
              onChange={(e) => setStatisticsText(e.target.value)}
              rows="10"
              cols="50"
            ></textarea>
            <h4>Observații despre accidentari </h4>
            <textarea
              placeholder="Scrie observații despre statistici aici..."
              value={injuriesText}
              onChange={(e) => setinjuriesText(e.target.value)}
              rows="10"
              cols="50"
            ></textarea>
            <SliderComponent />
            <div className="button-container-report">
              <button
                className="save-report-button-report"
                onClick={handleSaveReport}
              >
                Salveaza Raportul
              </button>
              <button
                className="save-pdf-button-report"
                onClick={handleSavePDF}
              >
                Salveaza ca PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerDetailsReport;
