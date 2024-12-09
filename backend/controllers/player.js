const { PlayerDb, FriendDb, UserDb } = require("../models");

const { Op } = require("sequelize");

const controller = {
  addFavoritePlayer: async (req, res) => {
    try {
      const { idTransfermarkt, idTheSportsDB, name, id } = req.body;

      const payLoad = {
        userId: id,
        idTransfermarkt: idTransfermarkt,
        idTheSportsDB: idTheSportsDB,
        name: name,
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

      const deletedPlayer = await PlayerDb.destroy({
        where: {
          idTransfermarkt,
          userId: id,
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
      const userId = req.params.userId;
      const favoritePlayers = await PlayerDb.findAll({
        where: { userId },
      });
      res.status(200).json(favoritePlayers);
    } catch (error) {
      console.error("Error retrieving favorite players:", error);
      res.status(500).json({ error: "Error retrieving favorite players" });
    }
  },
  isFavoritePlayer: async (req, res) => {
    try {
      const { userId, idTransfermarkt } = req.params;
      const favoritePlayer = await PlayerDb.findOne({
        where: {
          userId: userId,
          idTransfermarkt: idTransfermarkt,
        },
      });
      res.status(200).json({ isFavorite: !!favoritePlayer });
    } catch (error) {
      console.error("Error checking if player is favorite:", error);
      res.status(500).json({ error: "Error checking if player is favorite" });
    }
  },
  getFriendsFavoritePlayers: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friends = await FriendDb.findAll({
        where: {
          userID: userId,
        },
      });

      const friendsFavoritePlayers = await Promise.all(
        friends.map(async (friend) => {
          const favoritePlayers = await PlayerDb.findAll({
            where: { userId: friend.friendID },
          });

          const friendDetails = await UserDb.findOne({
            where: {
              id: friend.friendID,
            },
          });

          return favoritePlayers.map((player) => ({
            ...player.dataValues,
            friendName: `${friendDetails.firstName} ${friendDetails.lastName}`,
          }));
        })
      );

      const flattenedFavorites = [].concat(...friendsFavoritePlayers);

      res.status(200).json(flattenedFavorites);
    } catch (error) {
      console.error("Error fetching friends' favorite players:", error);
      res
        .status(500)
        .json({ error: "Error fetching friends' favorite players" });
    }
  },
};

module.exports = controller;
