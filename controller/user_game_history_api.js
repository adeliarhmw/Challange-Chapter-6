const { user_game_history } = require("../models");
module.exports = {
  getuser_game_history_api: (req, res) => {
    user_game_history
      .findAll({
        attributes: ["id_history", "game_tittle", "score", "level", "id_user"],
      })
      .then((result) => {
        if (result.length > 0) {
          res
            .status(200)
            .json({ message: "Valid Get All User Game History", data: result });
        } else {
          res
            .status(404)
            .json({ message: "User Game History Not Found", data: result });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed Get All User Game History",
          err: err.message,
        });
      });
  },
  getuser_game_historybyid_api: (req, res) => {
    user_game_history
      .findOne({
        where: {
          id_user: req.params.id,
        },
        attributes: ["id_history", "game_tittle", "score", "level", "id_user"],
      })
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ message: "Valid Get User Game History By Id", result });
        } else {
          res.status(404).json({
            message:
              "User Game History dengan ID " + req.params.id + " Not Found",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "failed Get User Game History By Id",
          err: err.message,
        });
      });
  },
  createuser_game_history_api: (req, res) => {
    user_game_history
      .create({
        game_tittle: req.body.game_tittle,
        score: req.body.score,
        level: req.body.level,
        id_user: req.body.id_user,
      })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Valid Membuat User Game History", result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed Membuat User Game History",
          err: err.message,
        });
      });
  },
  update_user_game_history_api: (req, res) => {
    user_game_history
      .update(
        {
          game_tittle: req.body.game_tittle,
          score: req.body.score,
          level: req.body.level,
        },
        {
          where: {
            id_user: req.params.id,
          },
        }
      )
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            message:
              "User Game History dengan ID " + req.params.id + " Not Found",
            result,
          });
        } else {
          res
            .status(200)
            .json({ message: "Valid Mengupdate User Game History", result });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed Mengupdate User Game History",
          err: err.message,
        });
      });
  },
  deleteuser_game_history_api: (req, res) => {
    user_game_history
      .destroy({
        where: {
          id_user: req.params.id,
        },
      })
      .then((result) => {
        if (result[0] === 0) {
          res.status(404).json({
            message:
              "User Game History dengan ID " + req.params.id + " Not Found",
            result,
          });
        } else {
          res
            .status(200)
            .json({ message: "Valid Menghapus User Game History", result });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed Menghapus User Game History",
          err: err.message,
        });
      });
  },
};
