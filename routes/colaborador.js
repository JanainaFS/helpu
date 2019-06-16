//Rotas de Colaborador
const express = require("express");
const router = express.Router();

//Controller Colab
const ColabController = require("../controllers/ColabController");

router.get("/indexC", ColabController.index);
router.post("/cadastrar/add", ColabController.cadastrarColab);
//rota de exibir chamada cadastrada
router.get("/chamada/add", ColabController.addChamada);
router.post("/chamada/nova", ColabController.novaChamada);
router.get("/chamada/deletar", ColabController.deletar);

module.exports = router;
