const express = require('express');
const router = express.Router();
const { createLivro, getLivros, updateLivro, deleteLivro } = require('../controllers/livroController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, createLivro);
router.get('/', getLivros);
router.put('/:codigo', authenticateToken, updateLivro);
router.delete('/:codigo', authenticateToken, deleteLivro);

module.exports = router;
