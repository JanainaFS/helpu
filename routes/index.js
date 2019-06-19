//Rotas principais
const express = require("express");
const router = express.Router();

//Controller da Index
const IndexController = require("../controllers/IndexController");

//Rotas Públicas
router.get("/", IndexController.index);
router.get("/login", IndexController.login);
router.post("/login", IndexController.logar);
router.get("/cadastrar", IndexController.cadastrar);

module.exports = router;
