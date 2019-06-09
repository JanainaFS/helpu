require("../models/Setor");
const Setor = mongoose.model("setores");

module.exports = {
  setor(req, res) {
    Setor.find()
      .then(setores => {
        return res.render("admin/setor", { setores: setores });
      })
      .catch(err => {
        req.flash("error_msg", "Houve um erro ao listar os setores.");
        return res.redirect("/setor");
      });
  },

  addSetor(req, res) {
    return res.render("admin/addsetor");
  },

  novoSetor(req, res) {
    var erros = [];

    if (!req.body.nome == undefined || req.body.nome == null) {
      erros.push({ texto: "Nome do Setor não pode está vazio." });
    }

    if (req.body.nome.length < 4) {
      erros.push({ texto: "Nome do setor é muito pequeno." });
    }

    if (erros.length > 0) {
      return res.render("admin/addsetor", { erros: erros });
    } else {
      const novoSetor = {
        nome: req.body.nome
      };

      new Setor(novoSetor)
        .save()
        .then(() => {
          req.flash("success_msg", "Setor adicionado com sucesso!");
          return res.redirect("/setor");
        })
        .catch(err => {
          req.flash(
            "error_msg",
            "Houve um erro ao cadastrar setor. Tente novamente."
          );
          return res.redirect("/setor");
        });
    }
  }
};
