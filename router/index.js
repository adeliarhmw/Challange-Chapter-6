//Adelia Rahmawati
const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getuser_game_api,
  getuser_gamebyid_api,
  createuser_game_api,
  update_user_game_api,
  deleteuser_game_api,
} = require("../controller/user_game_api");

const {
  getuser_game_views,
  getuser_gameById_views,
  createuser_game_form_views,
  createuser_game_views,
  update_user_game_views,
  deleteuser_game_views,
} = require("../controller/user_game_views");

const {
  getuser_game_biodata_api,
  getuser_game_biodatabyid_api,
  createuser_game_biodata_api,
  update_user_game_biodata_api,
  deleteuser_game_biodata_api,
} = require("../controller/user_game_biodata_api");

const {
  getuser_game_biodata_views,
  getuser_game_biodatabyid_views,
  createuser_game_biodata_form_views,
  createuser_game_biodata_views,
  update_user_game_biodata_views,
  deleteuser_game_biodata_views,
} = require("../controller/user_game_biodata_views");

const {
  getuser_game_history_api,
  getuser_game_historybyid_api,
  createuser_game_history_api,
  update_user_game_history_api,
  deleteuser_game_history_api,
} = require("../controller/user_game_history_api");

const {
  getuser_game_history_views,
  getuser_game_historybyid_views,
  createuser_game_history_form_views,
  createuser_game_history_views,
  update_user_game_history_views,
  deleteuser_game_history_views,
} = require("../controller/user_game_history_views");

const { register, login } = require("../controller/auth_api");
const { registerPage, registerViews } = require("../controller/auth_views");

const user_game_views = require("../controller/user_game_views");
const { errorPage } = require("../controller/error");

// user_game Endpoint
router.get("/api/get-user-game", auth, getuser_game_api);
router.get("/api/get-user-gamebyid/:id", auth, getuser_gamebyid_api);
router.post("/api/create-user-game", auth, createuser_game_api);
router.put("/api/update-user-game/:id", auth, update_user_game_api);
router.delete("/api/delete-user-game/:id", auth, deleteuser_game_api);

// user_game_biodata Endpoint
router.get("/api/get-user-game-biodata", auth, getuser_game_biodata_api);
router.get(
  "/api/get-user-game-biodatabyid/:id",
  auth,
  getuser_game_biodatabyid_api
);
router.post(
  "/api/create-user-games-biodata",
  auth,
  createuser_game_biodata_api
);
router.put(
  "/api/update-user-game-biodata/:id",
  auth,
  update_user_game_biodata_api
);
router.delete(
  "/api/delete-user-game-biodata/:id",
  auth,
  deleteuser_game_biodata_api
);

// user_game_history Endpoint
router.get("/api/get-user-game-history", auth, getuser_game_history_api);
router.get(
  "/api/get-user-game-historybyid/:id",
  auth,
  getuser_game_historybyid_api
);
router.post("/api/create-user-game-history", auth, createuser_game_history_api);
router.put(
  "/api/update-user-game-history/:id",
  auth,
  update_user_game_history_api
);
router.delete(
  "/api/delete-user-game-history/:id",
  auth,
  deleteuser_game_history_api
);

router.post("/api/register", register);
router.post("/api/login", login);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/view/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/view/usergames");
  }
  next();
}

//User Game View
router.get("/view/usergames", checkAuthenticated, getuser_game_views);
router.get(
  "/view/createuser_game",
  checkAuthenticated,
  createuser_game_form_views
);
router.get(
  "/view/updateformuser/:id",
  checkAuthenticated,
  getuser_gameById_views
);
router.post(
  "/view/createuser_game_views",
  checkAuthenticated,
  createuser_game_views
);
router.post(
  "/view/updateformuser/:id",
  checkAuthenticated,
  update_user_game_views
);
router.get(
  "/view/deleteusergame/:id",
  checkAuthenticated,
  deleteuser_game_views
);

// User game Biodata view
router.get(
  "/view/usergamesbiodata",
  checkAuthenticated,
  getuser_game_biodata_views
);
router.get(
  "/view/createuser_game_biodata",
  checkAuthenticated,
  createuser_game_biodata_form_views
);
router.get(
  "/view/updateformuserbiodata/:id",
  checkAuthenticated,
  getuser_game_biodatabyid_views
);
router.post(
  "/view/createuser_game_biodata_views",
  checkAuthenticated,
  createuser_game_biodata_views
);
router.post(
  "/view/updateformuserbiodata/:id",
  checkAuthenticated,
  update_user_game_biodata_views
);
router.get(
  "/view/deleteusergamebiodata/:id",
  checkAuthenticated,
  deleteuser_game_biodata_views
);

//user game history view
router.get(
  "/view/usergameshistory",
  checkAuthenticated,
  getuser_game_history_views
);
router.get(
  "/view/createuser_game_history",
  checkAuthenticated,
  createuser_game_history_form_views
);
router.get(
  "/view/updateformuserhistory/:id",
  checkAuthenticated,
  getuser_game_historybyid_views
);
router.post(
  "/view/createuser_game_history_views",
  checkAuthenticated,
  createuser_game_history_views
);
router.post(
  "/view/updateformuserhistory/:id",
  checkAuthenticated,
  update_user_game_history_views
);
router.get(
  "/view/deleteusergamehistory/:id",
  checkAuthenticated,
  deleteuser_game_history_views
);
router.get("/view/error", errorPage);

router.get("/view/register", checkNotAuthenticated, registerPage);
router.post("/register", checkNotAuthenticated, registerViews);

module.exports = router;
