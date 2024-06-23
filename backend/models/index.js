const database = require("../config/db");

const UserModel = require("./user");
const FriendModel = require("./friend");
const PlayerModel = require("./player");

const UserDb = UserModel(database);
const FriendDb = FriendModel(database);
const PlayerDb = PlayerModel(database);

module.exports = {
  UserDb,
  FriendDb,
  PlayerDb,
};
