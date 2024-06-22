import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import "./ClubDetails.css";

const ClubDetails = () => {
  const { transfermarktId } = useParams();
  const [clubDetails, setClubDetails] = useState(null);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1234/api/club-details/${transfermarktId}`
        );
        setClubDetails(response.data);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    fetchClubDetails();
  }, [transfermarktId]);

  const fetchSportsDBId = async (playerName) => {
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`
      );
      return response.data.player ? response.data.player[0].idPlayer : null;
    } catch (error) {
      console.error("Error fetching SportsDB ID:", error);
      return null;
    }
  };

  const handlePlayersList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/club-players/${transfermarktId}`
      );
      const playersWithSportsDBId = await Promise.all(
        response.data.players.map(async (player) => {
          const sportsDBId = await fetchSportsDBId(player.name);
          return { ...player, sportsDBId };
        })
      );
      setPlayers(playersWithSportsDBId);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handlePlayerClick = (sportsDBId, transfermarktId) => {
    navigate(`/player-details/${sportsDBId}/${transfermarktId}`);
  };

  if (!clubDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarDash />
      <div className="club-details-container">
        <div className="club-details-card">
          <h1>{clubDetails.name}</h1>
          <img
            src={clubDetails.image}
            alt={clubDetails.name}
            className="club-image"
          />
          <div className="club-info">
            <p>
              <strong>Official Name:</strong> {clubDetails.officialName}
            </p>
            <p>
              <strong>Founded:</strong> {clubDetails.foundedOn}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={`http://${clubDetails.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {clubDetails.website}
              </a>
            </p>
            <p>
              <strong>Stadium:</strong> {clubDetails.stadiumName} (
              {clubDetails.stadiumSeats} seats)
            </p>
            <p>
              <strong>Current Market Value:</strong>{" "}
              {clubDetails.currentMarketValue}
            </p>
            <p>
              <strong>Current Transfer Record:</strong>{" "}
              {clubDetails.currentTransferRecord}
            </p>
            <p>
              <strong>League:</strong> {clubDetails.league.name} -{" "}
              {clubDetails.league.countryName}
            </p>
          </div>

          <div className="button-container">
            <button className="back-button">Back</button>
            <button onClick={handlePlayersList} className="players-button">
              <FaUsers /> View Players
            </button>
          </div>
        </div>

        <div className="players-list">
          {players.map((player) => (
            <div
              key={player.transfermarktId}
              className="player-card-team"
              onClick={() =>
                handlePlayerClick(player.sportsDBId, player.transfermarktId)
              }
            >
              <h2>{player.name}</h2>
              <img
                src={player.image}
                alt={player.name}
                className="player-image-team"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClubDetails;
