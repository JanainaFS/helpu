//Rotas de Colaborador
const express = require("express");
const router = express.Router();

//Controller Colab
const ColabController = require("../controllers/ColabController");

router.get("/indexC", ColabController.index);
router.post("/cadastrar/add", ColabController.cadastrarColab);
//rota de exibir chamada cadastrada
router.get("/chamada/add", ColabController.addChamada);

module.exports = router;
