const mongoose = require("mongoose");
require("../models/Setor");
const Setor = mongoose.model("setores");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcrypt = require("bcryptjs");

module.exports = {
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
  },

  userSuporte(req, res) {
    return res.render("admin/cadastroSuporte");
  },

  CadUserSuporte(req, res) {
    var erros = [];

    if (
      !req.body.nome ||
      typeof req.body.nome == undefined ||
      req.body.nome == null
    )
      erros.push({ texto: "Nome inválido." });

    if (
      !req.body.email ||
      typeof req.body.email == undefined ||
      req.body.email == null
    )
      erros.push({ texto: "Email inválido." });

    if (
      !req.body.senha ||
      typeof req.body.senha == undefined ||
      req.body.senha == null
    )
      erros.push({ texto: "Senha inválida." });

    if (req.body.senha.length < 8)
      erros.push({
        texto:
          "Senha muito curta. Sua senha precisa ter no mínimo 8 caracteres."
      });

    if (req.body.senha != req.body.senha1)
      erros.push({ texto: "As senhas não correspondem." });

    if (erros.length > 0) {
      res.render("admin/cadastroSuporte", { erros: erros });
    } else {
      Usuario.findOne({ email: req.body.email })
        .then(usuario => {
          if (usuario) {
            req.flash(
              "error_msg",
              "Já existe um usuário cadastrado com esse email."
            );
            res.redirect("/admin/suporte");
          } else {
            const novoUsuario = new Usuario({
              nome: req.body.nome,
              email: req.body.email,
              senha: req.body.senha,
              eSup: true
            });

            bcrypt.genSalt(10, (erro, salt) => {
              bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                if (erro) {
                  req.flash(
                    "error_msg",
                    "Houve um erro durante o salvamento do usuário."
                  );
                  res.redirect("/admin/suporte");
                }

                novoUsuario.senha = hash;

                novoUsuario
                  .save()
                  .then(() => {
                    req.flash("success_msg", "Usuário cadastrado com sucesso!");
                    res.redirect("/");
                  })
                  .catch(err => {
                    req.flash("error_msg", "Houve um erro ao criar o usuário.");
                    res.redirect("/admin/suporte");
                  });
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
          req.flash("error_msg", "Houve um erro interno.");
          res.redirect("/");
        });
    }
  },

  deletarSuporte(req, res) {
    Usuario.remove({ _id: req.params.id })
      .then(() => {
        req.flash("success_msg", "Usuário deletado com sucesso!");
        return res.redirect("/");
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao deletar usuário.");
        return res.redirect("/");
      });
  },

  suporteAll(req, res) {
    Usuario.find({ eSup: true })
      .sort({ nome: "asc" })
      .then(suportes => {
        return res.render("admin/suporteAll", { suportes: suportes });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao listar os setores.");
        return res.redirect("/");
      });
  }
};
