//Rotas de Colaborador
const express = require("express");
const router = express.Router();

//Controller Colab
const AdminController = require("../controllers/ColabController");

router.get("/indexC", AdminController.index);
router.post("/cadastrar/add", AdminController.cadastrarColab);

module.exports = router;
