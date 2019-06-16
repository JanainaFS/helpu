const mongoose = require("mongoose");
require("../models/Setor");
const Setor = mongoose.model("setores");

module.exports = {
  index(req, res) {
    return res.render("admin/index");
  },

  setor(req, res) {
    Setor.find()
      .sort({ nome: "asc" })
      .then(setores => {
        return res.render("admin/setor", { setores: setores });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao listar os setores.");
        return res.redirect("/admin/setor");
      });
  },

  addSetor(req, res) {
    return res.render("admin/addsetor");
  },

  novoSetor(req, res) {
    var erros = [];

    if (
      !req.body.nome ||
      typeof req.body.nome == undefined ||
      req.body.nome == null
    ) {
      erros.push({ texto: "Nome do Setor não pode está vazio." });
    }

    if (req.body.nome.length < 5) {
      erros.push({ texto: "Nome do setor é muito pequeno." });
    }

    if (erros.length > 0) {
      return res.render("admin/addsetor", { erros: erros });
    } else {
      Setor.findOne({ nome: req.body.nome }).then(setor => {
        if (setor) {
          req.flash(
            "error_msg",
            "Já existe um setor cadastrado com esse nome."
          );
          return res.redirect("/admin/setor/add");
        } else {
          const novoSetor = {
            nome: req.body.nome
          };

          new Setor(novoSetor)
            .save()
            .then(() => {
              req.flash("success_msg", "Setor cadastrado com sucesso!");
              return res.redirect("/admin/setor");
            })
            .catch(err => {
              req.flash(
                "error_msg",
                "Houve um erro ao cadastrar setor. Tente novamente."
              );
              return res.redirect("/admin/setor");
            });
        }
      });
    }
  },

  deletar(req, res) {
    Setor.remove({ _id: req.params.id })
      .then(() => {
        req.flash("success_msg", "Setor deletado com sucesso!");
        return res.redirect("/admin/setor");
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao deletar setor.");
        return res.redirect("/admin/setor");
      });
  }
};
