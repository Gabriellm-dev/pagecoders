const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Controladores
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const loanController = require('../controllers/loanController');
const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');

// Rotas de autenticação
const authRoutes = express.Router();
authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.loginUser);

// Rotas protegidas
const apiRoutes = express.Router();
apiRoutes.use(authMiddleware);

// Rotas de usuário
apiRoutes.post('/users', userController.registerUser);
apiRoutes.put('/users/:cpf', userController.updateUser);
apiRoutes.get('/users', userController.listUsers);
apiRoutes.delete('/users/:cpf', userController.deleteUser);

// Rotas de livro
apiRoutes.post('/books', bookController.registerBook);
apiRoutes.put('/books/:code', bookController.updateBook);
apiRoutes.delete('/books/:code', bookController.deleteBook);
apiRoutes.get('/books', bookController.listBooks);
apiRoutes.get('/books/available', bookController.listAvailableBooks);

// Rotas de empréstimo
apiRoutes.post('/loans', loanController.requestLoan);
apiRoutes.get('/loans', loanController.listLoans);
apiRoutes.put('/loans/authorize/:loanId', loanController.authorizeLoan);
apiRoutes.put('/loans/return/:loanId', loanController.returnBook);

// Rotas de classificação
apiRoutes.post('/ratings', ratingController.registerRating);
apiRoutes.put('/ratings/:ratingId', ratingController.updateRating);
apiRoutes.delete('/ratings/:ratingId', ratingController.deleteRating);
apiRoutes.get('/ratings', ratingController.listRatings);

module.exports = { authRoutes, apiRoutes };
