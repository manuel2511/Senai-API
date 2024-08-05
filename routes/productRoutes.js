const express = require("express");
const router = express.Router();
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/productController.js');
// Importa os controladores de produto


router.post('/', createProduct); // Rota para criar um novo produto
router.get('/', getAllProducts); // Rota para obter todos os produtos
router.get('/:id', getProductById); // Rota para obter um produto pelo ID
router.put('/:id', updateProduct); // Rota para atualizar um produto pelo ID
router.delete('/:id', deleteProduct); // Rota para deletar um produto pelo ID

module.exports = router;
