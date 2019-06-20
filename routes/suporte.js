//Rotas de Suporte
const express = require("express");
const router = express.Router();
const { eSup } = require("../helpers/eSup");

//Controller Suporte
const SuporteController = require("../controllers/SuporteController");

//Rotas de filtro
router.get("/chamadas/resolvidas", eSup, SuporteController.resolvidas);
router.get("/chamadas/pendentes", eSup, SuporteController.pendentes);
router.get(
  "/chamadas/filtroChamada/:id",
  eSup,
  SuporteController.filtroChamada
);

//Rotas de Chamadas / Suporte
router.get("/chamadas", eSup, SuporteController.chamadas);
router.get("/chamadas/:id", eSup, SuporteController.verChamada);
router.post("/chamadas/finalizar/:id", eSup, SuporteController.finalizar);

module.exports = router;
