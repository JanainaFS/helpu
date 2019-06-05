//Módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
//const flash = require("connect-flash");

//Config
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  next();
});

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = 8082;
app.listen(PORT, () => {
  console.log("Conectado ao servidor.");
});
