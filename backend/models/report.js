const { DataTypes } = require("sequelize");
const database = require("../config/db");

module.exports = (database) => {
  const model = database.define("report", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    playerName: {
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
    generalText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statisticsText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    injuriesText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  return model;
};
