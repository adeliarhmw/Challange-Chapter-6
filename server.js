require("dotenv").config();
const express = require("express");
const app = express();
const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const router = require("./router");
require("./passport-config");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set(express.static("public"));
app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/view/usergames");
  }
  next();
}

app.use(router);

app.get("/view/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/view/usergames",
    failureRedirect: "/view/login",
    failureFlash: true,
  })
);

app.get("logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

app.all("*", (req, res) => {
  res.redirect("/view/login");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
