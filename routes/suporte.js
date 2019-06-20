//Rotas de Suporte
const express = require("express");
const router = express.Router();

//Controller Suporte
const SuporteController = require("../controllers/SuporteController");

//Rotas de Chamadas / Suporte
router.get("/chamadas", SuporteController.chamadas);
router.get("/chamadas/:id", SuporteController.verChamada);
router.post("/chamadas/finalizar/:id", SuporteController.finalizar);
//router.post("/chamadas/editar/:id", SuporteController.editarChamada);

module.exports = router;
