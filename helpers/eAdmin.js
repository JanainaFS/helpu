module.exports = {
  eAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.eAdmin == true) {
      return next();
    }

    req.flash(
      "error_msg",
      "Você deve ser um Administrador para ter acesso a esta área."
    );
    res.redirect("/login");
  }
};
