const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
require("../models/Setor");
const Setor = mongoose.model("setores");
require("../models/Chamada");
const Chamada = mongoose.model("chamadas");
const bcrypt = require("bcryptjs");

module.exports = {
  index(req, res) {
    Chamada.find()
      .sort({ data: "asc" })
      .then(chamadas => {
        return res.render("colaborador/index", { chamadas: chamadas });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao tentar carregar chamadas.");
        return res.redirect("/colab/indexC");
      });
  },
  cadastrarColab(req, res) {
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
      res.render("cadastroColab", { erros: erros });
    } else {
      Usuario.findOne({ email: req.body.email })
        .then(usuario => {
          if (usuario) {
            req.flash(
              "error_msg",
              "Já existe um usuário cadastrado com esse email."
            );
            res.redirect("/cadastrar");
          } else {
            const novoUsuario = new Usuario({
              nome: req.body.nome,
              email: req.body.email,
              senha: req.body.senha,
              tipo: [
                {
                  colab: true
                }
              ]
            });

            bcrypt.genSalt(10, (erro, salt) => {
              bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                if (erro) {
                  req.flash(
                    "error_msg",
                    "Houve um erro durante o salvamento do usuário."
                  );
                  res.redirect("/cadastrar");
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
                    res.redirect("/cadastrar");
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

  verChamada(req, res) {
    Chamada.findOne({ _id: req.params.id })
      .then(chamada => {
        return res.render("colaborador/chamada", {
          chamada: chamada
        });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao listar chamadas.");
        return res.redirect("/colab/indexC");
      });
  },
  addChamada(req, res) {
    Setor.find()
      .sort({ nome: "asc" })
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
  },
  deletar(req, res) {
    Chamada.remove({ _id: req.params.id })
      .then(() => {
        req.flash("success_msg", "Chamada deletada com sucesso!");
        return res.redirect("/colab/indexC");
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao deletar chamada.");
        return res.redirect("/colab/indexC");
      });
  }
};
