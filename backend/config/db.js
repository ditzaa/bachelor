const { Sequelize } = require("sequelize");

const database = new Sequelize("scouting_app", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: true,
  },
});

module.exports = database;
