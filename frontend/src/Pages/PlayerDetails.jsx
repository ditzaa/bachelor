import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./PlayerDetails.css";
import NavbarDash from "../Components/Dashboard/NavbarDash";

const PlayerDetails = () => {
  const { playerId, transfermarktId } = useParams();
  const [player, setPlayer] = useState(null);
  const [honours, setHonours] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [formerTeams, setFormerTeams] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [injuries, setInjuries] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = localStorage.getItem("userID");
  const navigate = useNavigate();

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

  return (
    <>
      <NavbarDash />
      <div className="player-details-container">
        <div className="player-card-1">
          <h1>{player.strPlayer}</h1>
          <img
            src={player.strCutout || player.strThumb}
            alt={player.strPlayer}
            className="player-image"
          />
          <div className="player-info">
            <p>
              <strong>Echipă:</strong> {player.strTeam}
            </p>
            <p>
              <strong>Poziție:</strong> {player.strPosition}
            </p>
            <p>
              <strong>Locul nașterii:</strong> {player.strBirthLocation}
            </p>
            <p>
              <strong>Data nașterii:</strong> {player.dateBorn}
            </p>
            <p>
              <strong>Nationalitate:</strong> {player.strNationality}
            </p>
            <p>
              <strong>Înălțime:</strong> {player.strHeight}
            </p>
            <p>
              <strong>Greutate:</strong> {player.strWeight}
            </p>
            <p>
              <strong>Număr echipă:</strong> {player.strNumber}
            </p>
            <p>
              <strong>Valoare de piață:</strong> {player.strSigning || "N/A"}
            </p>
          </div>
        </div>

        <div className="button-container">
          <button onClick={() => navigate(-1)} className="back-button">
            Înapoi
          </button>
          <button onClick={toggleFavorite} className="favorite-button">
            <FaStar color={isFavorite ? "gold" : "grey"} />
            {isFavorite ? " Șterge din favorite" : " Adaugă la favorite"}
          </button>
          <button onClick={handleVideosClick} className="videos-button">
            Videoclipuri
          </button>
        </div>

        <div className="player-details-card">
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
          <table className="statistics-table">
            <thead>
              <tr>
                <th>Competiție</th>
                <th>Sezon</th>
                <th>Apariții</th>
                <th>Goluri</th>
                <th>Assist-uri</th>
                <th>Cartonașe galbene</th>
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
          <h2>Accidentări</h2>
          {injuries.length === 0 ? (
            <p>Nu există accidentări înregistrate.</p>
          ) : (
            <table className="injuries-table">
              <thead>
                <tr>
                  <th>Sezon</th>
                  <th>Accidentare</th>
                  <th>De la</th>
                  <th>Până la</th>
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
          <ul className="no-bullets">
            {formerTeams.map((team, index) => (
              <li key={`${team.idFormerTeam}-${index}`}>
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
    </>
  );
};

export default PlayerDetails;
