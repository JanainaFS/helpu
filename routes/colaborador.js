//Rotas de Colaborador
const express = require("express");
const router = express.Router();

//Controller Colab
const ColabController = require("../controllers/ColabController");

//Rota de Index do Usuário Colaborador
router.get("/indexC", ColabController.index);

//Rotas de Colaborador
router.post("/cadastrar/add", ColabController.cadastrarColab);
router.get("/logout/", ColabController.logout);

//Rotas de Chamadas
router.get("/chamada/add", ColabController.addChamada);
router.get("/chamada/:id", ColabController.verChamada);
router.post("/chamada/nova", ColabController.novaChamada);
router.get("/chamada/deletar/:id", ColabController.deletar);

//Rota de deletar usuário para teste
router.get("/deletarUser/:id", ColabController.deletarUser);

module.exports = router;
