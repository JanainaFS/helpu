const mongoose = require("mongoose");

module.exports = {
  index(req, res) {
    return res.render("index");
  },
  login(req, res) {
    return res.render("login");
  }
};
