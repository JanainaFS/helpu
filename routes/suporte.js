//Rotas de Suporte
const express = require("express");
const router = express.Router();

//Controller Suporte
const SuporteController = require("../controllers/SuporteController");

//Rotas de Chamadas / Suporte
//rota de listar todas as chamadas
router.get("/chamadas", SuporteController.chamadas);
//rota de exibir 1 chamada
router.post("/chamadas/finalizar/:id", SuporteController.finalizar);
router.get("/chamadas/:id", SuporteController.verChamada);

//Resolver chamada

//Editar Chamada _ Solução
//router.post("/chamadas/editar/:id", SuporteController.editarChamada);

module.exports = router;
