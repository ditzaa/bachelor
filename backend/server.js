const express = require("express");
const database = require("./config/db");
const cors = require("cors");

const router = require("./routes");
require("./models");

const app = express();
const PORT = 1234;

app.use(cors());

app.use(express.json());

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
