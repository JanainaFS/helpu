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
  },

  finalizar(req, res) {
    var erros = [];

    if (req.body.resolvida == "true" && req.body.pendente == "true") {
      erros.push({ texto: "Você deve marcar apenas 1 check-box." });
    }

    if (
      req.body.pendente == "true" &&
      (!req.body.comentario ||
        typeof req.body.comentario == undefined ||
        req.body.comentario == null)
    ) {
      erros.push({ texto: "Comentário não pode está vazio." });
    }

    if (erros.length > 0) {
      return res.render("suporte/verChamadaSuporte", {
        erros: erros,
        chamada: { _id: req.params.id }
      });
    } else {
      Chamada.findOne({ _id: req.params.id })
        .then(chamada => {
          chamada.situacao = true;
          chamada.comentario = req.body.comentario;
          chamada.resolvida = req.body.resolvida;
          chamada.pendente = req.body.pendente;

          Chamada.updateOne({ _id: req.params.id }, chamada)
            .then(() => {
              req.flash("success_msg", "Chamada finalizada com sucesso!");
              res.redirect("/suporte/chamadas");
            })
            .catch(err => {
              req.flash("error_msg", "Houve um erro ao finalizar chamada.");
              res.redirect("/suporte/chamadas");
            });
        })
        .catch(err => {
          req.flash("error_msg", "Houve um erro interno. ");
          res.redirect("/suporte/chamadas");
        });
    }
  }
};
