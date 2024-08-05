const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const productRoutes  = require('./routes/productRoutes');


const app = express();
const port = 3000; // Define a porta do servidor

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secreta',
    resave: false,
    saveUninitialized: true
}));

// Rotas
app.use('/', authRoutes);
app.use('/api/products', productRoutes); // Define a rota base para produtos

app.listen(port, (error) => {
  if (error) {
    console.log("Ocorreu um erro ao rodar o servidor!");
  } else {
    console.log(`O servidor está rodando com sucesso na porta ${port}!`);
  }
});