//Rotas de Administrador
const express = require("express");
const router = express.Router();
const { eAdmin } = require("../helpers/eAdmin");

//Controller Admin
const AdminController = require("../controllers/AdminController");

//Rotas de Setor
router.get("/setor", eAdmin, AdminController.setor);
router.get("/setor/add", eAdmin, AdminController.addSetor);
router.post("/setor/novo", eAdmin, AdminController.novoSetor);
router.get("/setor/deletar/:id", eAdmin, AdminController.deletar);

//Rotas de Usuário Suporte
router.get("/suporte", eAdmin, AdminController.userSuporte);
router.post("/cadastrarSup/add", eAdmin, AdminController.cadUserSuporte);
router.get("/suporte/all", eAdmin, AdminController.suporteAll);
router.get("/suporte/deletar/:id", eAdmin, AdminController.deletarSuporte);

//Rotas de Usuário Administrador
router.get("/novo", eAdmin, AdminController.userAdmin);
router.post("/cadastrarAdmin/add", eAdmin, AdminController.cadUserAdmin);
router.get("/all", eAdmin, AdminController.adminAll);
router.get("/deletar/:id", eAdmin, AdminController.deletarAdmin);

module.exports = router;
