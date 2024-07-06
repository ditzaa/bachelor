import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import "./FavoritePlayersList.css";
const userId = localStorage.getItem("userID");

const FavoritePlayersList = () => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [friendsFavoritePlayers, setFriendsFavoritePlayers] = useState([]);
  const [view, setView] = useState("user");
  const navigate = useNavigate();

  const fetchFavoritePlayers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/player/favorites/${userId}`
      );
      const playerDetails = await Promise.all(
        response.data.map(async (player) => {
          const playerData = await axios.get(
            `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${player.idTheSportsDB}`
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
            `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${player.idTheSportsDB}`
          );
          return playerData.data.players[0];
        })
      );
      setFriendsFavoritePlayers(playerDetails);
    } catch (error) {
      console.error("Error fetching friends' favorite players:", error);
    }
  };

  const handleViewToggle = (view) => {
    setView(view);
    if (view === "friends") {
      fetchFriendsFavoritePlayers();
    } else {
      fetchFavoritePlayers();
    }
  };

  const handlePlayerClick = async (playerId, playerName) => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/stats/${playerName}`
      );
      const transfermarktId = response.data.id;
      navigate(`/player-details/${playerId}/${transfermarktId}`);
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
          <button
            className={view === "user" ? "active" : ""}
            onClick={() => handleViewToggle("user")}
          >
            Jucătorii mei favoriți
          </button>
          <button
            className={view === "friends" ? "active" : ""}
            onClick={() => handleViewToggle("friends")}
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
