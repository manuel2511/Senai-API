import express from 'express'; // Usando import em vez de require
import productRoutes from './src/routes/productRoutes.js'; // Certifique-se de usar a extensão .js

const app = express();
const port = 3000; // Define a porta do servidor

app.use(express.json()); // Middleware para parsear JSON

app.use('/api/products', productRoutes); // Define a rota base para produtos

// Inicia o servidor na porta especificada
app.listen(port, (error) => {
  if (error) {
    console.log("Ocorreu um erro ao rodar o servidor!");
  } else {
    console.log(`O servidor está rodando com sucesso na porta ${port}!`);
  }
});
