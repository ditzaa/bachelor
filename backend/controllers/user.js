const { RequestPageRounded } = require("@mui/icons-material");
const { UserDb } = require("../models");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

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
          return res.json({
            error: "Wrong Username And Password Combination",
          });
        }

        const id = user.id;
        const token = jwt.sign({ id }, "luam_licenta", { expiresIn: 300 });
        console.log("---------SESSION-----\n");
        console.log(req.session.user);

        req.session.user = user;
        // res.status(201).send(user);
        res.status(201).json({ auth: true, token: token, result: user });
      });
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  getUser: async (req, res) => {
    try {
      if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
      } else {
        res.send({ loggedIn: false });
      }
      console.log(req.session);
    } catch {
      res.status(500).send("Server error!" + error.message);
    }
  },

  isUserAuth: async (req, res) => {
    try {
      res.send("You are authenticated!");
    } catch {
      res.status(500).send("Server error!" + error.message);
    }
  },

  verifyJWT: async (req, res, next) => {
    try {
      const token = req.headers("x-acces-token");
      if (!token) {
        res.send("A token is needed! Give it next time!");
      } else {
        jwt.verify(token, "luam_licenta", (err, decoded) => {
          if (err) {
            res.json({ auth: false, message: "You failed to authenticate" });
          } else {
            req.userId = decoded.id;
            next();
          }
        });
      }
      //res.send('You are authenticated!')
    } catch {
      res.status(500).send("Server error!" + error.message);
    }
  },
};

module.exports = controller;
