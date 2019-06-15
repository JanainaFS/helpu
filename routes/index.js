//Rotas principais
const express = require("express");
const router = express.Router();

//Controller da Index
const IndexController = require("../controllers/IndexController");

//Rotas
router.get("/", IndexController.index);
router.get("/login", IndexController.login);

module.exports = router;
