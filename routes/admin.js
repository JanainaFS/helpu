//Rotas de Administrador
const express = require("express");
const router = express.Router();

//Controller Admin
const AdminController = require("../controllers/AdminController");

router.get("/setor", AdminController.setor);
router.get("/setor/add", AdminController.addSetor);
router.post("/setor/novo", AdminController.novoSetor);

module.exports = router;
