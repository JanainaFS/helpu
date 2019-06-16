const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
require("../models/Setor");
const Setor = mongoose.model("setores");

module.exports = {
  index(req, res) {
    return res.render("colaborador/index");
  },
  cadastrarColab(req, res) {},
  addChamada(req, res) {
    Setor.find()
      .then(setores => {
        res.render("colaborador/cadastroChamada", { setores: setores });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao tentar carregar formulário.");
        res.redirect("/colab/indexC");
      });
  },
  novaChamada(req, res) {}
};
