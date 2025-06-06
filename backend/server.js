const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', dataRoutes);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB conectado');
  const PORT = process.env.PORT || 8090;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
})
.catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));