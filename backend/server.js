const express = require("express");
const database = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = require("./routes");
const axios = require("axios");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

require("./models");

const app = express();
const PORT = 1234;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "HEAD"],
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
      expires: 60 * 60 * 60,
    },
  })
);

app.use("/api", router);

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
    //console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching club details:", error);
    res.status(500).json({ error: "Error fetching club details" });
  }
});

// app.get("/api/club-players/:id", async (req, res) => {
//   const clubId = req.params.id;
//   try {
//     const response = await axios.get(
//       `https://transfermarkt-api.fly.dev/clubs/${clubId}/players`
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching club players:", error);
//     res.status(500).json({ error: "Error fetching club players" });
//   }
// });

// Add this endpoint to your existing backend code
app.get("/api/club-players/:id", async (req, res) => {
  const clubId = req.params.id;

  try {
    // Fetch the list of players for the club
    const playersResponse = await axios.get(
      `https://transfermarkt-api.fly.dev/clubs/${clubId}/players`
    );

    const players = playersResponse.data.players;

    // Fetch each player's profile
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

app.listen(PORT, () => {
  console.log(`Serverul ruleaza pe portul ${PORT}`);
});
