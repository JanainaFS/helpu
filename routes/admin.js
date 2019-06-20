//Rotas de Administrador
const express = require("express");
const router = express.Router();
const { eAdmin } = require("../helpers/eAdmin");

//Controller Admin
const AdminController = require("../controllers/AdminController");

//Rotas de Setor
router.get("/setor", AdminController.setor);
router.get("/setor/add", AdminController.addSetor);
router.post("/setor/novo", AdminController.novoSetor);
router.get("/setor/deletar/:id", AdminController.deletar);

//Rotas de Usuário Suporte
router.get("/suporte", AdminController.userSuporte);
router.post("/cadastrarSup/add", AdminController.CadUserSuporte);
router.get("/suporte/all", AdminController.suporteAll);
router.get("/suporte/deletar/:id", AdminController.deletarSuporte);

module.exports = router;
