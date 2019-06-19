const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  eColab: {
    type: Boolean,
    default: false
  },
  eSup: {
    type: Boolean,
    default: false
  },
  eAdmin: {
    type: Boolean,
    default: false
  }
});

mongoose.model("usuarios", Usuario);
