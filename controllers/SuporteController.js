const mongoose = require("mongoose");
require("../models/Chamada");
const Chamada = mongoose.model("chamadas");

module.exports = {
  chamadas(req, res) {
    Chamada.find()
      .sort({ data: "asc" })
      .then(chamadas => {
        return res.render("suporte/chamadasSuporte", { chamadas: chamadas });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao tentar carregar chamadas.");
        return res.redirect("/");
      });
  },
  verChamada(req, res) {
    Chamada.findOne({ _id: req.params.id })
      .then(chamada => {
        return res.render("suporte/verChamadaSuporte", {
          chamada: chamada
        });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao listar chamada.");
        return res.redirect("/suporte/chamadas");
      });
  }
};
