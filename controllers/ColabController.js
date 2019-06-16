const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
require("../models/Setor");
const Setor = mongoose.model("setores");
require("../models/Chamada");
const Chamada = mongoose.model("chamadas");

module.exports = {
  index(req, res) {
    Chamada.find()
      .then(chamadas => {
        return res.render("colaborador/index", { chamadas: chamadas });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao tentar carregar formulário.");
        return res.redirect("/colab/indexC");
      });
  },
  cadastrarColab(req, res) {},
  addChamada(req, res) {
    Setor.find()
      .then(setores => {
        return res.render("colaborador/cadastroChamada", { setores: setores });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao tentar carregar formulário.");
        return res.redirect("/colab/indexC");
      });
  },
  novaChamada(req, res) {
    var erros = [];

    if (req.body.setor == "0") {
      erros.push({ texto: "Setor inválido." });
    }

    if (
      !req.body.titulo ||
      typeof req.body.titulo == undefined ||
      req.body.titulo == null
    ) {
      erros.push({ texto: "Título da chamada não pode está vazio." });
    }

    if (
      !req.body.descricao ||
      typeof req.body.descricao == undefined ||
      req.body.descricao == null
    ) {
      erros.push({ texto: "Descrição da chamada não pode está vazia." });
    }

    if (
      !req.body.status ||
      typeof req.body.status == undefined ||
      req.body.status == null
    ) {
      erros.push({ texto: "Status da chamada não pode está vazio." });
    }

    if (erros.length > 0) {
      return res.render("colaborador/cadastroChamada", { erros: erros });
    } else {
      const novaChamada = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        status: req.body.status,
        setor: req.body.setor
      };

      new Chamada(novaChamada)
        .save()
        .then(() => {
          req.flash("success_msg", "Chamada cadastrada com sucesso!");
          return res.redirect("/colab/indexC");
        })
        .catch(err => {
          req.flash(
            "error_msg",
            "Houve um erro ao cadastrar chamada. Tente novamente."
          );
          return res.redirect("/colab/indexC");
        });
    }
  }
};
