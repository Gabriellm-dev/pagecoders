const express = require('express');
const router = express.Router();
const {
  solicitarEmprestimo,
  listarEmprestimos,
  autorizarEmprestimo,
  devolverLivro,
  avaliarEmprestimo
} = require('../controllers/emprestimoController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/solicitar', authenticateToken, solicitarEmprestimo);
router.get('/', authenticateToken, listarEmprestimos);
router.put('/autorizar/:idEmprestimo', authenticateToken, autorizarEmprestimo);
router.put('/devolver/:idEmprestimo', authenticateToken, devolverLivro);
router.post('/avaliar/:idEmprestimo', authenticateToken, avaliarEmprestimo);

module.exports = router;
