const { UserDb } = require("../models");
const bcrypt = require("bcrypt");

const controller = {
  registerUser: async (req, res) => {
    try {
      const password = req.body.password;

      const hashedPassword = await bcrypt.hash(password, 10);

      const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        country: req.body.country,
        role: req.body.role,
        organisation: req.body.organisation,
      };

      const user = await UserDb.create(payload);
      res.status(201).send(user);
    } catch {
      res.status(500).send("Server error!" + error.message);
    }
  },
};

module.exports = controller;
