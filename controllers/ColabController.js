const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

module.exports = {
  index(req, res) {
    return res.render("colaborador/index");
  },
  cadastrarColab(req, res) {},
  addChamada(req, res) {}
};
