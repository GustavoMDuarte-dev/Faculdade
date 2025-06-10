const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./db.js');
const Produto = require('./models/Produto.js');
const Pedido = require('./models/Pedido.js');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rota para a página inicial (redireciona para o cadastro)
app.get('/', (req, res) => {
    res.redirect('/produtos/cadastrar');
});

// Rota para EXIBIR o formulário de cadastro
app.get('/produtos/cadastrar', (req, res) => {
    res.render('cadastrar-produto');
});

app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ raw: true });
        res.render('listar-produtos', { produtos: produtos });
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.send("Erro ao carregar a lista de produtos.");
    }
});

// Rota para RECEBER os dados do formulário e salvar
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

        // Após cadastrar, redireciona de volta para a pág de cadastro (ou para uma pág de sucesso)
        res.redirect('/produtos/cadastrar');
        
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        res.send("Ocorreu um erro ao cadastrar o produto.");
    }
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}).catch(err => console.log('Erro ao sincronizar com o banco de dados:', err));