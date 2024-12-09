import axios from "axios";
import "./SearchPlayer.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDash from "../Components/Dashboard/NavbarDash";

const SearchPlayer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setError("");
      const response = await axios.get(
        `http://localhost:1234/api/search/player/${searchTerm}`
      );
      setPlayers(response.data.player);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Jucătorul nu a fost găsit!");
      } else {
        setError("A apărut o eroare la căutarea jucătorului.");
      }
      setPlayers([]);
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <NavbarDash />
      <div className="search-players-container">
        <h3>Caută jucători de fotbal</h3>
        <div className="search-bar">
          <button className="back-button" onClick={handleBack}>
            Înapoi
          </button>
          <input
            type="text"
            placeholder="Caută jucători după nume"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Caută</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {players.length > 0 && (
          <div className="results-container">
            {players.map((player) => (
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
        )}
      </div>
    </>
  );
};

export default SearchPlayer;
