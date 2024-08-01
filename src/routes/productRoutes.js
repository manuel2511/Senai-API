import express from 'express'; // Importa o Express
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
// Importa os controladores de produto

const router = express.Router(); // Cria um roteador do Express

router.post('/', createProduct); // Rota para criar um novo produto
router.get('/', getAllProducts); // Rota para obter todos os produtos
router.get('/:id', getProductById); // Rota para obter um produto pelo ID
router.put('/:id', updateProduct); // Rota para atualizar um produto pelo ID
router.delete('/:id', deleteProduct); // Rota para deletar um produto pelo ID

export default router; // Exporta o roteador
