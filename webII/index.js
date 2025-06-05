const express = require('express');
const { engine } = require('express-handlebars');
const sequelize = require('./db.js');
const Produto = require('./models/Produto');
const Pedido = require('./models/Pedido');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/produtos/cadastrar', (req, res) => {
    res.render('cadastrar-produto');
});

app.post('/produtos/cadastrar', async (req, res) => {
    try {
        const { nome, descricao, quantidade_estoque, preco, categoria, capacidade_maxima, material } = req.body;

        await Produto.create({
            nome,
            descricao,
            quantidade_estoque,
            preco,
            categoria,
            capacidade_maxima,
            material
        });

        res.redirect('/');
        
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        res.send("Ocorreu um erro ao cadastrar o produto.");
    }
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando! Acesse /produtos/cadastrar para testar.');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}).catch(err => console.log('Erro ao sincronizar com o banco de dados:', err));