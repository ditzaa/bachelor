const { FriendDb } = require("../models");

const { Op } = require("sequelize");
const { UserDb } = require("../models");

const controller = {
  addFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await UserDb.findByPk(userId);
      const friend = await UserDb.findByPk(friendId);

      if (!user || !friend) {
        return res.status(404).json({ error: "User or friend not found" });
      }

      if (userId === friendId) {
        return res
          .status(400)
          .json({ error: "You cannot add yourself as a friend" });
      }

      const existingFriendship = await FriendDb.findOne({
        where: {
          userID: userId,
          friendID: friendId,
        },
      });

      if (existingFriendship) {
        return res
          .status(400)
          .json({ error: "You are already friends with this user" });
      }

      await FriendDb.create({ userID: userId, friendID: friendId });

      res.json({ message: "Friend added successfully" });
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;

      const deleted = await FriendDb.destroy({
        where: {
          userId,
          friendId,
        },
      });

      if (deleted) {
        res.json({ message: "Friend removed successfully" });
      } else {
        res.status(404).json({ error: "Friend not found" });
      }
    } catch (error) {
      console.error("Error removing friend:", error);
      res.status(500).json({ error: "Server error!" });
    }
  },
  checkFriendship: async (req, res) => {
    const { userId, friendId } = req.params;

    try {
      const friendship = await FriendDb.findOne({
        where: {
          userID: userId,
          friendID: friendId,
        },
      });

      if (friendship) {
        return res.json({ isFriend: true });
      } else {
        return res.json({ isFriend: false });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error!" });
    }
  },
};

module.exports = controller;
