const database = require("../config/db");

const UserModel = require("./user");
const FriendModel = require("./friend");
const PlayerModel = require("./player");
const ReportModel = require("./report");

const UserDb = UserModel(database);
const FriendDb = FriendModel(database);
const PlayerDb = PlayerModel(database);
const ReportDb = ReportModel(database);

module.exports = {
  UserDb,
  FriendDb,
  PlayerDb,
  ReportDb,
};
