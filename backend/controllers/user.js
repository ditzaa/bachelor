const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { UserDb } = require("../models");

const controller = {
  registerUser: async (req, res) => {
    try {
      const password = req.body.password;
      const email = req.body.email;
      const username = req.body.username;

      const hashedPassword = await bcrypt.hash(password, 10);

      const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email,
        username,
        password: hashedPassword,
        country: req.body.country,
        role: req.body.role,
        organisation: req.body.organisation,
      };

      const existingUser = await UserDb.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ error: "Emailul este deja folosit!" });
        }
        if (existingUser.username === username) {
          return res
            .status(400)
            .json({ error: "Username-ul este deja folosit!" });
        }
      }

      const user = await UserDb.create(payload);
      res.status(201).send(user);
    } catch (error) {
      res.status(500).json({ error: "A apărut o eroare la înregistrare!" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UserDb.findOne({ where: { username } });

      if (!user) {
        return res.status(404).json({ error: "User Doesn't Exist" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(401)
          .json({ error: "Wrong Username And Password Combination" });
      }

      const id = user.id;
      const token = jwt.sign({ id }, "luam_licenta", { expiresIn: 900 });
      req.session.user = user;
      res.status(200).json({ auth: true, token: token, result: user });
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
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  isUserAuth: async (req, res) => {
    try {
      res.send("You are authenticated!");
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  verifyJWT: async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
      if (!token) {
        return res.status(401).send("A token is needed! Provide it next time!");
      }
      jwt.verify(token, "luam_licenta", (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ auth: false, message: "You failed to authenticate" });
        }
        req.userId = decoded.id;
        next();
      });
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  searchUsersByName: async (req, res) => {
    try {
      const { username } = req.query;

      const users = await UserDb.findAll({
        where: {
          username: {
            [Op.like]: `%${username}%`,
          },
        },
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "username",
          "country",
          "role",
          "organisation",
        ],
      });

      if (users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      res.json(users);
    } catch (error) {
      res.status(500).send("Server error: " + error.message);
    }
  },

  logoutUser: async (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Nu s-a putut deloga utilizatorul!" });
        } else {
          res.clearCookie("userId");
          return res
            .status(200)
            .json({ message: "Utilizatorul a fost delogat cu succes!" });
        }
      });
    } else {
      return res.status(400).json({ error: "Nu există o sesiune activă!" });
    }
  },
};

module.exports = controller;
