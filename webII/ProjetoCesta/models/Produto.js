const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Produto = sequelize.define('produto', {
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
        type: DataTypes.DECIMAL(10, 2)
    },
    material: {
        type: DataTypes.STRING
    }
});

module.exports = Produto;