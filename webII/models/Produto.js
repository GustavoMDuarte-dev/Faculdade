// models/Produto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js'); // Importa a conexão com o banco

const Produto = sequelize.define('produto', {
    // O Sequelize já cria o 'id' automaticamente
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    quantidade_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidade_maxima: {
        type: DataTypes.DECIMAL(10, 2) // Campo para cestas
    },
    material: {
        type: DataTypes.STRING // Campo para cestas
    }
});

module.exports = Produto;