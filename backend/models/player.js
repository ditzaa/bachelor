const { DataTypes } = require("sequelize");
const database = require("../config/db");

module.exports = (database) => {
  const model = database.define("player", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    idTheSportsDB: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idTransfermarkt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return model;
};
