/* Módulos */

/* Framework para Node.js. MVC, Rotas */
const express = require("express");
const app = express();
/* Renderização de Páginas */
const handlebars = require("express-handlebars");
/* Manipular os dados da requisição */
const bodyParser = require("body-parser");
/* Biblioteca do Node.js baseada em esquemas para modelar os dados da sua aplicação. */
const mongoose = require("mongoose");
/* Módulo do Node.js para trabalhar com caminhos de arquivos e diretórios. */
const path = require("path");

/* Middleware */
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/auth")(passport);

//Config;

//Sessão
app.use(
  session({
    secret: "curiosidade",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/helpu")
  .then(() => {
    console.log("Conectado ao mongo");
  })
  .catch(err => {
    console.log("Erro ao se conectar: " + err);
  });

//Public
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  next();
});

//Rotas
app.use("/", require("./routes/index"));
app.use("/admin", require("./routes/admin"));
app.use("/colab", require("./routes/colaborador"));
app.use("/suporte", require("./routes/suporte"));

const PORT = 8082;
app.listen(PORT, () => {
  console.log("Conectado ao servidor.");
});
