//Rotas principais
const express = require("express");
const router = express.Router();

//Controller da Index
const IndexController = require("../controllers/IndexController");

//Perfil
router.get("/perfil", IndexController.perfil);

//Rotas Públicas
router.get("/", IndexController.index);
router.get("/login", IndexController.login);
router.post("/logar", IndexController.logar);
router.get("/logout", IndexController.logout);
router.get("/cadastrar", IndexController.cadastrar);

module.exports = router;
