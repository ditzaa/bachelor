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
      const { idTransfermarkt, id } = req.body;
      console.log(id);
      const deletedPlayer = await PlayerDb.destroy({
        where: {
          idTransfermarkt,
          userId: id, // Asigură-te că userId-ul este corect
        },
      });

      if (deletedPlayer) {
        res.status(200).json({ message: "Favorite player removed" });
      } else {
        res.status(404).json({ error: "Favorite player not found" });
      }
    } catch (error) {
      console.error("Error removing favorite player:", error);
      res.status(500).json({ error: "Error removing favorite player" });
    }
  },
  getFavoritePlayers: async (req, res) => {
    try {
      userId = req.params.userId;
      const favoritePlayers = await PlayerDb.findAll({
        where: { userId },
      });
      res.status(200).json(favoritePlayers);
    } catch (error) {
      console.error("Error removing favorite player:", error);
      res.status(500).json({ error: "Error removing favorite player" });
    }
  },
};

module.exports = controller;
