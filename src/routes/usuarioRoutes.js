const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/usuarioController');

// Registro de novo usuário
router.post('/register', registerUser);

// Login de usuário
router.post('/login', loginUser);

module.exports = router;
