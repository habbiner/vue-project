const express = require('express');
const router = express.Router();
const DadosSensor = require('../models/DadosSensor');

/**
 * @swagger
 * components:
 *   schemas:
 *     DadoSensor:
 *       type: object
 *       required:
 *         - temperature
 *         - humidity
 *         - datetime
 *         - local_name
 *       properties:
 *         _id:
 *           type: string
 *         temperature:
 *           type: number
 *           example: 23.5
 *         humidity:
 *           type: number
 *           example: 55.2
 *         datetime:
 *           type: string
 *           format: date-time
 *           example: "2025-06-13T09:00:00Z"
 *         local_name:
 *           type: string
 *           example: "Galpão A"
 */

/**
 * @swagger
 * /dados:
 *   get:
 *     summary: Retorna os dados dos sensores dos últimos 30 dias
 *     tags: [DadoSensor]
 *     responses:
 *       200:
 *         description: Lista de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DadoSensor'
 */
router.get('/dados', async (req, res) => {
  try {
    const agora = new Date();
    const trintaDiasAtras = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);

    const resultado = await DadosSensor.find({
      datetime: { $gte: trintaDiasAtras, $lte: agora }
    }).sort({ datetime: 1 });

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

/**
 * @swagger
 * /dados:
 *   post:
 *     summary: Cria um novo dado de sensor
 *     tags: [DadoSensor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DadoSensor'
 *     responses:
 *       201:
 *         description: Dado criado com sucesso
 */
router.post('/dados', async (req, res) => {
  try {
    const { temperature, humidity, datetime, local_name } = req.body;
    const novoDado = new DadosSensor({ temperature, humidity, datetime, local_name });
    await novoDado.save();
    res.status(201).json(novoDado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar dado do sensor' });
  }
});

/**
 * @swagger
 * /dados/{id}:
 *   get:
 *     summary: Retorna um dado específico por ID
 *     tags: [DadoSensor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do dado
 *     responses:
 *       200:
 *         description: Dado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DadoSensor'
 *       404:
 *         description: Dado não encontrado
 */
router.get('/dados/:id', async (req, res) => {
  try {
    const dado = await DadosSensor.findById(req.params.id);
    if (!dado) return res.status(404).json({ error: 'Dado não encontrado' });
    res.json(dado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dado do sensor' });
  }
});

/**
 * @swagger
 * /dados/{id}:
 *   put:
 *     summary: Atualiza completamente um dado
 *     tags: [DadoSensor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do dado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DadoSensor'
 *     responses:
 *       200:
 *         description: Dado atualizado
 *       404:
 *         description: Dado não encontrado
 */
router.put('/dados/:id', async (req, res) => {
  try {
    const { temperature, humidity, datetime, local_name } = req.body;
    const atualizado = await DadosSensor.findByIdAndUpdate(
      req.params.id,
      { temperature, humidity, datetime, local_name },
      { new: true }
    );
    if (!atualizado) return res.status(404).json({ error: 'Dado não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar dado do sensor' });
  }
});

/**
 * @swagger
 * /dados/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um dado
 *     tags: [DadoSensor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do dado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               temperature: 28.0
 *     responses:
 *       200:
 *         description: Dado atualizado parcialmente
 *       404:
 *         description: Dado não encontrado
 */
router.patch('/dados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;

    const dadoAtualizado = await DadosSensor.findByIdAndUpdate(id, atualizacoes, {
      new: true,
      runValidators: true,
    });

    if (!dadoAtualizado) {
      return res.status(404).json({ error: 'Dado não encontrado' });
    }

    res.json(dadoAtualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar parcialmente o dado' });
  }
});

/**
 * @swagger
 * /dados/{id}:
 *   delete:
 *     summary: Remove um dado por ID
 *     tags: [DadoSensor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do dado
 *     responses:
 *       200:
 *         description: Dado deletado com sucesso
 *       404:
 *         description: Dado não encontrado
 */
router.delete('/dados/:id', async (req, res) => {
  try {
    const deletado = await DadosSensor.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ error: 'Dado não encontrado' });
    res.json({ mensagem: 'Dado removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar dado do sensor' });
  }
});

module.exports = router;
