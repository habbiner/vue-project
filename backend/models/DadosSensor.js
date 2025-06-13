const mongoose = require('mongoose');

const DadosSensorSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  datetime: { type: Date, required: true },
  local_name: { type: String, required: true }
});

module.exports = mongoose.model('DadosSensor', DadosSensorSchema, 'teste_reais2');
