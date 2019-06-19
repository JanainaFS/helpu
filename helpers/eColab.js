module.exports = {
  eAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo.colab == true) {
      return next();
    }

    req.flash(
      "error_msg",
      "Você deve ser um usuário do tipo Colaborador para ter acesso a esta área."
    );
    res.redirect("/login");
  }
};
