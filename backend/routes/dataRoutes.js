const express = require('express');
const router = express.Router();

const DadosSensor = require('../models/DadosSensor');

router.get('/dados', async (req, res) => {
  try {
    const agora = new Date();
    const trintaDiasAtras = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Busca todos os dados dos últimos 30 dias, sem agrupar
    const resultado = await DadosSensor.find({
      datetime: { $gte: trintaDiasAtras, $lte: agora }
    }).sort({ datetime: 1 });

    // Arredonda temperatura e umidade para 2 casas decimais
    const resultadoArredondado = resultado.map(item => ({
      ...item.toObject(),
      temperature: item.temperature !== undefined ? Number(item.temperature.toFixed(2)) : null,
      humidity: item.humidity !== undefined ? Number(item.humidity.toFixed(2)) : null
    }));

    res.json(resultadoArredondado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados do sensor' });
  }
});


module.exports = router;
