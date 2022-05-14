const { user_game } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  getuser_game_api: (req, res) => {
    user_game
      .findAll({
        attributes: ["id_user", "username", "password"],
      })
      .then((result) => {
        if (result.length > 0) {
          res
            .status(200)
            .json({ message: "Valid Get All User Game", data: result });
        } else {
          res
            .status(404)
            .json({ message: "User Game Not Found", data: result });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed Get All User Game", err: err.message });
      });
  },
  getuser_gamebyid_api: (req, res) => {
    user_game
      .findOne({
        where: {
          id_user: req.params.id,
        },
        attributes: ["id_user", "username", "password"],
      })
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ message: "Valid Get User Game By Id", result });
        } else {
          res.status(404).json({
            message:
              "User Game dengan ID " + req.params.id + " Tidak di temukan",
            result,
          });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "failed Get User Game By Id", err: err.message });
      });
  },
  createuser_game_api: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await user_game.create({
        username,
        password: hashedPassword,
      });
      const token = jwt.sign({ id_user: user.id_user }, process.env.TOKEN_KEY, {
        expiresIn: "15m",
      });
      user.token = token;

      res
        .status(200)
        .json({ message: "Berhasil Membuat User Game", result: user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal Create User Game", err: error.message });
    }
  },
  update_user_game_api: (req, res) => {
    user_game
      .update(
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          where: {
            id_user: req.params.id,
          },
        }
      )
      .then((result) => {
        if (result[0] === 0) {
          res.status(404).json({
            message: "User Game dengan ID " + req.params.id + " Not Found",
            result,
          });
        } else {
          res
            .status(200)
            .json({ message: "Valid Mengupdate User Game", result });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed Mengupdate User Game", err: err.message });
      });
  },
  deleteuser_game_api: (req, res) => {
    user_game
      .destroy({
        where: {
          id_user: req.params.id,
        },
      })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            message: "User Game dengan ID " + req.params.id + " Not Found",
            result,
          });
        } else {
          res
            .status(200)
            .json({ message: "Valid Menghapus User Game", result });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed Menghapus User Game", err: err.message });
      });
  },
};
