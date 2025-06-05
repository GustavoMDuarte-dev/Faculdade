const { Sequelize } = require('sequelize');

// CONFIGURE AQUI COM SEUS DADOS
const sequelize = new Sequelize('loja_cestas_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;