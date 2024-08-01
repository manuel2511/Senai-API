import products from '../data/products.js'; // Importa o array de produtos

// Função para criar um novo produto
export const createProduct = (req, res) => {
  const { nome, preco } = req.body; // Desestrutura o nome e o preço do corpo da requisição
  const id = products.length + 1; // Gera um novo ID para o produto
  const newProduct = { id, nome, preco }; // Cria um novo objeto de produto
  products.push(newProduct); // Adiciona o novo produto ao array
  res.status(201).json(newProduct); // Retorna o novo produto com status 201
};

// Função para obter todos os produtos
export const getAllProducts = (req, res) => {
  res.status(200).json(products); // Retorna todos os produtos com status 200
};

// Função para obter um produto pelo ID
export const getProductById = (req, res) => {
  const { id } = req.params; // Obtém o ID dos parâmetros da URL
  const product = products.find(p => p.id == id); // Encontra o produto pelo ID
  if (!product) {
    return res.status(404).json({ message: 'Product not found' }); // Retorna 404 se o produto não for encontrado
  }
  res.status(200).json(product); // Retorna o produto encontrado com status 200
};

// Função para atualizar um produto pelo ID
export const updateProduct = (req, res) => {
  const { id } = req.params; // Obtém o ID dos parâmetros da URL
  const { nome, preco } = req.body; // Desestrutura o nome e o preço do corpo da requisição
  const product = products.find(p => p.id === id); // Encontra o produto pelo ID
  if (!product) {
    return res.status(404).json({ message: 'Product not found' }); // Retorna 404 se o produto não for encontrado
  }
  product.nome = nome; // Atualiza o nome do produto
  product.preco = preco; // Atualiza o preço do produto
  res.status(200).json(product); // Retorna o produto atualizado com status 200
};

// Função para deletar um produto pelo ID
export const deleteProduct = (req, res) => {
  const { id } = req.params; // Obtém o ID dos parâmetros da URL
  const productIndex = products.findIndex(p => p.id == id); // Encontra o índice do produto pelo ID
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' }); // Retorna 404 se o produto não for encontrado
  }
  products.splice(productIndex, 1); // Remove o produto do array
  res.status(200).json({ message: 'Product deleted' }); // Retorna uma mensagem de sucesso com status 200
};