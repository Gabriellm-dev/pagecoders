const express = require('express');
const router = express.Router();

// Controladores
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const loanController = require('../controllers/loanController');
const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.loginUser);

// Rotas de usuário
router.post('/users', userController.registerUser);
router.put('/users/:cpf', userController.updateUser);
router.get('/users', userController.listUsers);
router.delete('/users/:cpf', userController.deleteUser);

// Rotas de livro
router.post('/books', bookController.registerBook);
router.put('/books/:code', bookController.updateBook);
router.delete('/books/:code', bookController.deleteBook);
router.get('/books', bookController.listBooks);

// Rotas de empréstimo
router.post('/loans', loanController.requestLoan);
router.get('/loans', loanController.listLoans);
router.put('/loans/authorize/:loanId', loanController.authorizeLoan);
router.put('/loans/return/:loanId', loanController.returnBook);
router.post('/loans/rate/:loanId', loanController.rateLoan);

// Rotas de classificação
router.post('/ratings', ratingController.registerRating);
router.put('/ratings/:ratingId', ratingController.updateRating);
router.delete('/ratings/:ratingId', ratingController.deleteRating);
router.get('/ratings', ratingController.listRatings);

module.exports = router;
