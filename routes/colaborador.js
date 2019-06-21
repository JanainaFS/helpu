//Rotas de Colaborador
const express = require("express");
const router = express.Router();
const { eColab } = require("../helpers/eColab");

//Controller Colab
const ColabController = require("../controllers/ColabController");

//Rota de Index do Usuário Colaborador
router.get("/indexC", eColab, ColabController.index);

//Rotas de Colaborador
router.post("/cadastrar/add", ColabController.cadastrarColab);

//Rotas de Chamadas
router.get("/chamada/add", eColab, ColabController.addChamada);
router.get("/chamada/:id", eColab, ColabController.verChamada);
router.post("/chamada/nova", eColab, ColabController.novaChamada);
router.get("/chamada/deletar/:id", eColab, ColabController.deletar);

//Rota de deletar usuário para teste
router.get("/deletarUser/:id", eColab, ColabController.deletarUser);

module.exports = router;
