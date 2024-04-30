const { DataTypes } = require("sequelize");
const database = require("../config/db");
const { all } = require("../routes");
const { Password } = require("@mui/icons-material");

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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
