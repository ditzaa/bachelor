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
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UserDb.findOne({ where: { username: username } });

      if (!user) {
        return res.json({ error: "User Doesn't Exist" });
      }

      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return res.json({ error: "Wrong Username And Password Combination" });
        }

        res.json("YOU LOGGED IN!!!");
      });
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },
};

module.exports = controller;
