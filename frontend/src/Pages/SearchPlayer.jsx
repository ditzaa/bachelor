import axios from "axios";
import "./SearchPlayer.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDash from "../Components/Dashboard/NavbarDash";

const SearchPlayer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/search/player/${searchTerm}`
      );
      setPlayers(response.data.player);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  return (
    <>
      <NavbarDash />
      <div className="search-players-container">
        <h1>Caută jucători</h1>
        <input
          type="text"
          placeholder="Introdu numele jucătorului"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ width: "300px", marginLeft: "10px" }}
        />
        <button onClick={handleSearch} className="search-button">
          Caută
        </button>
        <div className="results-container">
          {players &&
            players.map((player) => (
              <div
                key={player.idPlayer}
                className="player-card"
                onClick={() =>
                  handlePlayerClick(player.idPlayer, player.strPlayer)
                }
              >
                <div className="player-info">
                  <h2>{player.strPlayer}</h2>
                  <p>{player.strTeam}</p>
                </div>
                {player.strCutout && (
                  <img
                    src={player.strCutout}
                    alt={`${player.strPlayer} - Player Image`}
                    className="player-image"
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchPlayer;
