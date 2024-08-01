import chai from 'chai'; // Importa o Chai
import chaiHttp from 'chai-http'; // Importa o Chai HTTP
import app from '../src/app.js'; // Importa o aplicativo Express
import products from '../src/data/products.js'; // Importa o array de produtos

chai.use(chaiHttp); // Configura o Chai para usar HTTP
const { expect } = chai; // Desestrutura o expect do Chai

describe('Products API', () => {
  beforeEach(() => {
    products.length = 0; // Limpa o array de produtos antes de cada teste
  });

  describe('POST /api/products', () => {
    it('should create a new product', (done) => {
      const product = { nome: 'Produto 1', preco: 10.0 }; // Produto de teste
      chai.request(app)
        .post('/api/products')
        .send(product)
        .end((err, res) => {
          expect(res).to.have.status(201); // Verifica se o status é 201
          expect(res.body).to.have.property('id'); // Verifica se o corpo tem a propriedade 'id'
          expect(res.body).to.have.property('nome', 'Produto 1'); // Verifica se o corpo tem a propriedade 'nome'
          expect(res.body).to.have.property('preco', 10.0); // Verifica se o corpo tem a propriedade 'preco'
          done(); // Finaliza o teste
        });
    });
  });

  describe('GET /api/products', () => {
    it('should get all products', (done) => {
      chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          expect(res).to.have.status(200); // Verifica se o status é 200
          expect(res.body).to.be.an('array'); // Verifica se o corpo é um array
          expect(res.body.length).to.equal(0); // Verifica se o array está vazio
          done(); // Finaliza o teste
        });
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get a product by id', (done) => {
      const product = { id: 1, nome: 'Produto 1', preco: 10.0 }; // Produto de teste
      products.push(product); // Adiciona o produto ao array
      chai.request(app)
        .get(`/api/products/${product.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200); // Verifica se o status é 200
          expect(res.body).to.have.property('id', 1); // Verifica se o corpo tem a propriedade 'id'
          expect(res.body).to.have.property('nome', 'Produto 1'); // Verifica se o corpo tem a propriedade 'nome'
          expect(res.body).to.have.property('preco', 10.0); // Verifica se o corpo tem a propriedade 'preco'
          done(); // Finaliza o teste
        });
    });

    it('should return 404 if the product is not found', (done) => {
      chai.request(app)
        .get('/api/products/999')
        .end((err, res) => {
          expect(res).to.have.status(404); // Verifica se o status é 404
          expect(res.body).to.have.property('message', 'Product not found'); // Verifica se o corpo tem a mensagem 'Product not found'
          done(); // Finaliza o teste
        });
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update a product by id', (done) => {
      const product = { id: 1, nome: 'Produto 1', preco: 10.0 }; // Produto de teste
      products.push(product); // Adiciona o produto ao array
      const updatedProduct = { nome: 'Produto 1 Atualizado', preco: 15.0 }; // Produto atualizado de teste
      chai.request(app)
        .put(`/api/products/${product.id}`)
        .send(updatedProduct)
        .end((err, res) => {
          expect(res).to.have.status(200); // Verifica se o status é 200
          expect(res.body).to.have.property('id', 1); // Verifica se o corpo tem a propriedade 'id'
          expect(res.body).to.have.property('nome', 'Produto 1 Atualizado'); // Verifica se o corpo tem a propriedade 'nome'
          expect(res.body).to.have.property('preco', 15.0); // Verifica se o corpo tem a propriedade 'preco'
          done(); // Finaliza o teste
        });
    });

    it('should return 404 if the product is not found', (done) => {
      const updatedProduct = { nome: 'Produto 1 Atualizado', preco: 15.0 }; // Produto atualizado de teste
      chai.request(app)
        .put('/api/products/999')
        .send(updatedProduct)
        .end((err, res) => {
          expect(res).to.have.status(404); // Verifica se o status é 404
          expect(res.body).to.have.property('message', 'Product not found'); // Verifica se o corpo tem a mensagem 'Product not found'
          done(); // Finaliza o teste
        });
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product by id', (done) => {
      const product = { id: 1, nome: 'Produto 1', preco: 10.0 }; // Produto de teste
      products.push(product); // Adiciona o produto ao array
      chai.request(app)
        .delete(`/api/products/${product.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200); // Verifica se o status é 200
          expect(res.body).to.have.property('message', 'Product deleted'); // Verifica se o corpo tem a mensagem 'Product deleted'
          done(); // Finaliza o teste
        });
    });

    it('should return 404 if the product is not found', (done) => {
      chai.request(app)
        .delete('/api/products/999')
        .end((err, res) => {
          expect(res).to.have.status(404); // Verifica se o status é 404
          expect(res.body).to.have.property('message', 'Product not found'); // Verifica se o corpo tem a mensagem 'Product not found'
          done(); // Finaliza o teste
        });
    });
  });
});
