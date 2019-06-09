//Rotas de Administrador
const express = require("express");
const router = express.Router();

//Controller Admin
const AdminController = require("../controllers/AdminController");

router.get("/", AdminController.setor);
router.get("/add", AdminController.addSetor);
router.post("/novo", AdminController.novoSetor);
router.get("/deletar/:id", AdminController.deletar);

module.exports = router;
