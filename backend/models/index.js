const database = require("../config/db");

const UserModel = require("./user");

const UserDb = UserModel(database);

module.exports = {
  UserDb,
};
