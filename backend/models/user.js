const { DataTypes } = require("sequelize");
const database = require("../config/db");
const { all } = require("../routes");

module.exports = (database) => {
  const model = database.define("user", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organisation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return model;
};
