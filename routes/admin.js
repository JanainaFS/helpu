//Rotas de Administrador
const express = require("express");
const router = express.Router();

//Controller Admin
const AdminController = require("../controllers/AdminController");

router.get("/", AdminController.index);
router.get("/setor", AdminController.setor);
router.get("/setor/add", AdminController.addSetor);
router.post("/setor/novo", AdminController.novoSetor);
router.get("/setor/deletar/:id", AdminController.deletar);

module.exports = router;
