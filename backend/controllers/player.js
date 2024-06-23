const { PlayerDb } = require("../models");

const { Op } = require("sequelize");

const controller = {
  addFavoritePlayer: async (req, res) => {
    try {
      const { idTransfermarkt, idTheSportsDB, name, team, id } = req.body;

      const payLoad = {
        userId: id,
        idTransfermarkt: idTransfermarkt,
        idTheSportsDB: idTheSportsDB,
        name: name,
        team: team,
      };

      const newFavPlayer = await PlayerDb.create(payLoad);
      res.status(201).send(newFavPlayer);
    } catch (error) {
      res.status(500).json({ error: "Error adding favorite player" });
    }
  },
  removeFavoritePlayer: async (req, res) => {
    try {
      const { idTransfermarkt } = req.body;
      const userId = req.user.id; // assuming user id is set in req.user by middleware

      await PlayerDb.findOneAndDelete({ idTransfermarkt, userId });
      res.status(200).json({ message: "Favorite player removed" });
    } catch (error) {
      res.status(500).json({ error: "Error removing favorite player" });
    }
  },
};

module.exports = controller;
