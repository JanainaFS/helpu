const passport = require("passport");

module.exports = {
  index(req, res) {
    return res.render("index");
  },
  login(req, res) {
    return res.render("login");
  },
  logar(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  },
  logout(req, res) {
    req.logout();
    req.flash("success_msg", "Deslogado com sucesso!");
    res.redirect("/login");
  },
  cadastrar(req, res) {
    return res.render("cadastroColab");
  }
};
