const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chamada = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  setor: {
    type: String,
    required: true
  },
  situacao: {
    type: Boolean,
    default: false
  },
  resolvida: {
    type: Boolean,
    default: false
  },
  pendente: {
    type: Boolean,
    default: false
  },
  comentario: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("chamadas", Chamada);
