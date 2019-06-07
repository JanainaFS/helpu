const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Setor = new Schema({
  nome: {
    type: String,
    required: true
  }
});

mongoose.model("setores", Setor);
