import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchClubs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${searchTerm}`
      );
      setTeams(response.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleClubClick = async (teamId, teamName) => {
    try {
      // Cererea către backend pentru a obține id-ul Transfermarkt
      const response = await axios.get(
        `http://localhost:1234/api/club/${teamName}`
      );
      const transfermarktId = response.data.id;

      // Redirecționăm către ClubDetails cu id-ul de la Transfermarkt
      navigate(`/club-details/${transfermarktId}`);
    } catch (error) {
      console.error("Error fetching Transfermarkt ID:", error);
    }
  };

  const handleBack = () => {
    navigate.goBack();
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Search Clubs
        </Typography>
        <TextField
          label="Search for a team"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ mt: 2, mr: 2 }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </Box>

      {teams.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Teams
          </Typography>
          <Grid container spacing={2}>
            {teams.map((team) => (
              <Grid item xs={12} sm={6} md={4} key={team.idTeam}>
                <Box sx={{ textAlign: "center" }}>
                  {/* Folosim onClick pentru a apela handleClubClick */}
                  <div
                    onClick={() => handleClubClick(team.idTeam, team.strTeam)}
                  >
                    <img src={team.strBadge} alt={team.strTeam} width={100} />
                    <Typography>{team.strTeam}</Typography>
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default SearchClubs;
