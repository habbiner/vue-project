// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Dados de Sensores',
    version: '1.0.0',
    description: 'Documentação da API que gerencia dados de sensores (MongoDB)',
  },
  servers: [
    {
      url: 'http://localhost:8090/api',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Pega as anotações no dataRoutes.js
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
