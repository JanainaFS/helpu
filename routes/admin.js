//Rotas de Administrador
const express = require("express");
const router = express.Router();

//Controller Admin
const AdminController = require("../controllers/AdminController");

router.get("/setor", eAdmin, AdminController.setor);
