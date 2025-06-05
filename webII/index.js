const express = require('express');
const app = express();
const PORT = 3000;
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('loja_cestas_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});
module.exports = sequelize;

async function testarDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o DB bem-sucedida.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}
testarDB();


// Rota principal para testar
app.get('/', (req, res) => {
    res.send('Servidor principal está no ar!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});