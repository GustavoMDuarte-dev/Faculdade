const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Pedido = sequelize.define('pedido', {
    cliente_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cliente_cpf_cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cliente_telefone: {
        type: DataTypes.STRING
    },
    lista_produtos: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipo_cesta: {
        type: DataTypes.STRING
    },
    total_pagar: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    destinatario_nome: {
        type: DataTypes.STRING
    },
    endereco_entrega: {
        type: DataTypes.TEXT
    },
    data_entrega: {
        type: DataTypes.DATE
    }
});

module.exports = Pedido;