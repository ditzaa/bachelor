import React, { useState } from "react";
import axios from "axios";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import "./SearchClubs.css";
import { useNavigate } from "react-router-dom";

const SearchClubs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/search/clubs/${searchTerm}`
      );
      setTeams(response.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleClubClick = async (teamId, teamName) => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/club/${teamName}`
      );
      const transfermarktId = response.data.id;
      navigate(`/club-details/${transfermarktId}`);
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
      <div className="search-clubs-container">
        <h3>Caută cluburi de fotbal</h3>
        <div className="search-bar">
          <button className="back-button" onClick={handleBack}>
            Înapoi
          </button>
          <input
            type="text"
            placeholder="Caută cluburi după nume"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Caută</button>
        </div>

        {teams.length > 0 && (
          <div className="search-results">
            {teams.map((team) => (
              <div
                key={team.idTeam}
                className="team-result"
                onClick={() => handleClubClick(team.idTeam, team.strTeam)}
              >
                <div className="team-details">
                  <img src={team.strBadge} alt={team.strTeam} width={100} />
                  <p>{team.strTeam}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchClubs;
