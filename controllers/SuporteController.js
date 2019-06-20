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
  }
};
