const express = require("express");
const database = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = require("./routes");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

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

// app.use(cors());

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
      expires: 60 * 60 * 24,
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

app.listen(PORT, () => {
  console.log(`Serverul ruleaza pe portul ${PORT}`);
});
