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
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const fetchStatistics = async (transfermarktId) => {
    try {
      const statsResponse = await axios.get(
        `http://localhost:1234/api/player-stats/${transfermarktId}`
      );

      const allStats = statsResponse.data.stats;
      const filteredStats = allStats.filter(
        (stat) => stat.seasonID === "23/24" || stat.seasonID === "22/23"
      );

      return filteredStats;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const playerResponse = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`
        );
        setPlayer(playerResponse.data.players[0]);

        const honoursResponse = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/lookuphonours.php?id=${playerId}`
        );
        setHonours(honoursResponse.data.honours || []);

        const milestonesResponse = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/lookupmilestones.php?id=${playerId}`
        );
        setMilestones(milestonesResponse.data.milestones || []);

        const formerTeamsResponse = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/lookupformerteams.php?id=${playerId}`
        );
        setFormerTeams(formerTeamsResponse.data.formerteams || []);

        const contractsResponse = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/lookupcontracts.php?id=${playerId}`
        );
        setContracts(contractsResponse.data.contracts || []);

        const playerStatistics = await fetchStatistics(transfermarktId);
        setStatistics(playerStatistics);
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    };

    fetchPlayerData();
  }, [playerId, transfermarktId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleVideosClick = () => {
    navigate(`/player-videos/${playerId}`);
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarDash></NavbarDash>
      <div className="player-details-container">
        <div className="player-card">
          <h1>{player.strPlayer}</h1>
          <img
            src={player.strCutout || player.strThumb}
            alt={player.strPlayer}
            className="player-image"
          />
          <div className="player-info">
            <p>
              <strong>Team:</strong> {player.strTeam}
            </p>
            <p>
              <strong>Position:</strong> {player.strPosition}
            </p>
            <p>
              <strong>Birth Place:</strong> {player.strBirthLocation}
            </p>
            <p>
              <strong>Birth Date:</strong> {player.dateBorn}
            </p>
            <p>
              <strong>Nationality:</strong> {player.strNationality}
            </p>
            <p>
              <strong>Height:</strong> {player.strHeight}
            </p>
            <p>
              <strong>Weight:</strong> {player.strWeight}
            </p>
            <p>
              <strong>Team Number:</strong> {player.strNumber}
            </p>
            <p>
              <strong>Market Value:</strong> {player.strSigning || "N/A"}
            </p>
          </div>
        </div>

        <div className="button-container">
          <button onClick={() => navigate(-1)} className="back-button">
            Back
          </button>
          <button onClick={toggleFavorite} className="favorite-button">
            <FaStar color={isFavorite ? "gold" : "grey"} />
            {isFavorite ? " Remove from Favorites" : " Add to Favorites"}
          </button>
          <button onClick={handleVideosClick} className="videos-button">
            View Videos
          </button>
        </div>

        <div className="player-details-card">
          <p className="description">
            <strong>Description:</strong> {player.strDescriptionEN}
          </p>

          <h2>Honours</h2>
          <ul className="no-bullets">
            {honours.map((honour) => (
              <li key={honour.id}>
                {honour.strHonour} - {honour.strSeason}
              </li>
            ))}
          </ul>

          <h2>Milestones</h2>
          <ul className="no-bullets">
            {milestones.map((milestone) => (
              <li key={milestone.id}>{milestone.strMilestone}</li>
            ))}
          </ul>

          <h2>Statistics</h2>
          <table className="statistics-table">
            <thead>
              <tr>
                <th>Competition</th>
                <th>Season</th>
                <th>Appearances</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Yellow Cards</th>
                <th>Minutes Played</th>
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

          <h2>Former Teams</h2>
          <ul className="no-bullets">
            {formerTeams.map((team) => (
              <li key={team.id}>
                {team.strTeam} ({team.strSeason})
              </li>
            ))}
          </ul>

          <h2>Contracts</h2>
          <ul className="no-bullets">
            {contracts.map((contract) => (
              <li key={contract.id}>
                {contract.strTeam} ({contract.strStartingDate} -{" "}
                {contract.strEndingDate})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlayerDetails;
