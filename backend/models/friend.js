const { DataTypes } = require("sequelize");
const database = require("../config/db");

module.exports = (database) => {
  const model = database.define("friend", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friendID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return model;
};
