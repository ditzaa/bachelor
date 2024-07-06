const express = require("express");
const database = require("./config/db");
const cors = require("cors");
const router = require("./routes");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

require("./models");

const app = express();
const PORT = 1234;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "HEAD", "DELETE", "UPDATE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "luam_licenta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 600,
    },
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Serverul ruleaza pe portul ${PORT}`);
});

app.get("/db-reset", async (req, res) => {
  try {
    await database.sync({ force: true });
    res.status(200).send("Reset complete!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Reset failed!");
  }
});

app.get("/api/stats/:name", async (req, res) => {
  const playerName = req.params.name;
  try {
    const response = await axios.get(
      `https://transfermarkt-api.fly.dev/players/search/${playerName}`
    );
    const playerData = response.data.results[0];
    res.json(playerData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/api/player-stats/:transfermarktId", async (req, res) => {
  const transfermarktId = req.params.transfermarktId;
  try {
    const response = await axios.get(
      `https://transfermarkt-api.fly.dev/players/${transfermarktId}/stats`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Error fetching player stats" });
  }
});

app.get("/api/club/:name", async (req, res) => {
  const clubName = req.params.name;
  try {
    const response = await axios.get(
      `https://transfermarkt-api.fly.dev/clubs/search/${clubName}?page_number=1`
    );
    const clubData = response.data.results[0];
    res.json(clubData);
  } catch (error) {
    console.error("Error fetching club data:", error);
    res.status(500).json({ error: "Error fetching club data" });
  }
});

app.get("/api/club-details/:id", async (req, res) => {
  const clubId = req.params.id;
  try {
    const response = await axios.get(
      `https://transfermarkt-api.fly.dev/clubs/${clubId}/profile`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching club details:", error);
    res.status(500).json({ error: "Error fetching club details" });
  }
});

app.get("/api/club-players/:id", async (req, res) => {
  const clubId = req.params.id;
  try {
    const playersResponse = await axios.get(
      `https://transfermarkt-api.fly.dev/clubs/${clubId}/players`
    );

    const players = playersResponse.data.players;

    const playerProfiles = await Promise.all(
      players.map(async (player) => {
        const profileResponse = await axios.get(
          `https://transfermarkt-api.fly.dev/players/${player.id}/profile`
        );

        const profile = profileResponse.data;

        return {
          transfermarktId: profile.id,
          name: profile.name,
          image: profile.imageURL,
        };
      })
    );

    res.json({ players: playerProfiles });
  } catch (error) {
    console.error("Error fetching player profiles:", error);
    res.status(500).json({ error: "Error fetching player profiles" });
  }
});

app.get("/api/search/player/:name", async (req, res) => {
  try {
    const playerName = req.params.name;
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error searching player:", error);
    res.status(500).json({ error: "Error fetching player stats" });
  }
});

app.get("/api/player-details/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const playerResponse = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`
    );
    const honoursResponse = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookuphonours.php?id=${playerId}`
    );
    const milestonesResponse = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookupmilestones.php?id=${playerId}`
    );
    const formerTeamsResponse = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookupformerteams.php?id=${playerId}`
    );
    const contractsResponse = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookupcontracts.php?id=${playerId}`
    );

    const playerData = {
      player: playerResponse.data.players[0],
      honours: honoursResponse.data.honours || [],
      milestones: milestonesResponse.data.milestones || [],
      formerTeams: formerTeamsResponse.data.formerteams || [],
      contracts: contractsResponse.data.contracts || [],
    };

    res.json(playerData);
  } catch (error) {
    console.error("Error fetching player details:", error);
    res.status(500).json({ error: "Error fetching player details" });
  }
});
