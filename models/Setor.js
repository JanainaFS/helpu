const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Setor = new Schema({
  nome: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("setores", Setor);
