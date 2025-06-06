const express = require('express');
const router = express.Router();

const DadosSensor = require('../models/DadosSensor');

router.get('/dados', async (req, res) => {
  try {
    const agora = new Date();
    const trintaDiasAtras = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Calcula o número de intervalos de 30 minutos em 30 dias
    const numBuckets = 30 * 24 * 2; // 1440

    const resultado = await DadosSensor.aggregate([
      {
        $match: {
          datetime: { $gte: trintaDiasAtras, $lte: agora }
        }
      },
      {
        $bucketAuto: {
          groupBy: "$datetime",
          buckets: numBuckets,
          output: {
            temperature: { $avg: "$temperature" },
            humidity: { $avg: "$humidity" },
            datetime: { $first: "$datetime" },
            local_name: { $first: "$local_name" }
          }
        }
      },
      { $sort: { datetime: 1 } }
    ]);

    // Arredonda temperatura e umidade para 2 casas decimais
    const resultadoArredondado = resultado.map(item => ({
      ...item,
      temperature: item.temperature !== undefined ? Number(item.temperature.toFixed(2)) : null,
      humidity: item.humidity !== undefined ? Number(item.humidity.toFixed(2)) : null
    }));

    res.json(resultadoArredondado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados do sensor' });
  }
});


module.exports = router;
