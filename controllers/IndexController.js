const mongoose = require("mongoose");
const passport = require("passport");

module.exports = {
  index(req, res) {
    return res.render("index");
  },
  login(req, res) {
    return res.render("login");
  },
  logar(req, res) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  },
  cadastrar(req, res) {
    return res.render("cadastroColab");
  }
};
