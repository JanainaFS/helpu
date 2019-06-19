//Rotas de Colaborador
const express = require("express");
const router = express.Router();

//Controller Colab
const ColabController = require("../controllers/ColabController");

router.get("/indexC", ColabController.index);
router.post("/cadastrar/add", ColabController.cadastrarColab);
router.get("/chamada/add", ColabController.addChamada);
router.get("/chamada/:id", ColabController.verChamada);
router.post("/chamada/nova", ColabController.novaChamada);
router.get("/chamada/deletar/:id", ColabController.deletar);

module.exports = router;
