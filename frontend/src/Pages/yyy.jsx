import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import "./FavoritePlayersList.css";

let userId = localStorage.getItem("userID");

const FavoritePlayersList = () => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [friendsFavoritePlayers, setFriendsFavoritePlayers] = useState([]);
  const [view, setView] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (view === "user") {
      fetchFavoritePlayers();
    } else if (view === "friends") {
      fetchFriendsFavoritePlayers();
    }
  }, [view]);

  const fetchFavoritePlayers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/player/favorites/${userId}`
      );
      const playerDetails = await Promise.all(
        response.data.map(async (player) => {
          const playerData = await axios.get(
            `http://localhost:1234/api/player-details-favorites/${player.idTheSportsDB}`
          );
          return playerData.data.players[0];
        })
      );
      setFavoritePlayers(playerDetails);
    } catch (error) {
      console.error("Error fetching favorite players:", error);
    }
  };

  const fetchFriendsFavoritePlayers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/player/friends-favorites/${userId}`
      );
      const playerDetails = await Promise.all(
        response.data.map(async (player) => {
          const playerData = await axios.get(
            `http://localhost:1234/api/player-details-favorites/${player.idTheSportsDB}`
          );
          return {
            ...playerData.data.players[0],
            friendName: player.friendName,
          };
        })
      );
      setFriendsFavoritePlayers(playerDetails);
    } catch (error) {
      console.error("Error fetching friends' favorite players:", error);
    }
  };

  const handlePlayerClick = async (playerId, playerName) => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/stats/${playerName}`
      );
      const transfermarktId = response.data.id;
      navigate(`/player-details-report/${playerId}/${transfermarktId}`);
    } catch (error) {
      console.error("Error fetching Transfermarkt ID:", error);
    }
  };

  const renderPlayers = (players) => {
    return players.map((player) => (
      <div
        key={player.idPlayer}
        className="player-card"
        onClick={() => handlePlayerClick(player.idPlayer, player.strPlayer)}
      >
        {player.strCutout && (
          <img
            src={player.strCutout}
            alt={`${player.strPlayer} - Player Image`}
            className="player-image"
          />
        )}
        <div className="player-info">
          <h2>{player.strPlayer}</h2>
          <p>{player.strTeam}</p>
          {player.friendName && <p>{player.friendName}</p>}
        </div>
      </div>
    ));
  };

  return (
    <>
      <NavbarDash />
      <div className="favorite-players-container">
        <h1>Jucători preferați</h1>
        <div className="view-toggle">
          <button onClick={() => navigate(-1)}>Înapoi</button>
          <button
            className={view === "user" ? "active" : ""}
            onClick={() => setView("user")}
          >
            Jucătorii mei favoriți
          </button>
          <button
            className={view === "friends" ? "active" : ""}
            onClick={() => setView("friends")}
          >
            Jucătorii favoriți ai prietenilor
          </button>
        </div>
        <div className="players-list">
          {view === "user"
            ? renderPlayers(favoritePlayers)
            : renderPlayers(friendsFavoritePlayers)}
        </div>
      </div>
    </>
  );
};

export default FavoritePlayersList;
