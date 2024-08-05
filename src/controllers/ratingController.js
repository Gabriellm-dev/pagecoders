const prisma = require('../prismaClient');

// Registra uma nova classificação
const registerRating = async (req, res) => {
  const { fkLoanId, bookRating, userRating, comment } = req.body;
  const { cpf } = req.user;

  try {
    // Verificar se o empréstimo existe
    const loan = await prisma.loan.findUnique({
      where: { loanId: parseInt(fkLoanId) },
      include: { user: true }
    });

    if (!loan) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    // Verificar se o usuário que realizou o empréstimo está tentando avaliar
    if (loan.userCpf !== cpf) {
      return res.status(403).json({ error: 'Somente o usuário que realizou o empréstimo pode avaliá-lo' });
    }

    // Verificar se o empréstimo foi finalizado (returnDate não é nulo)
    if (!loan.returnDate) {
      return res.status(400).json({ error: 'O empréstimo não foi finalizado' });
    }

    // Criar a avaliação do empréstimo
    const rating = await prisma.loanRating.create({
      data: {
        loan: { connect: { loanId: parseInt(fkLoanId) } }, // Associar ao empréstimo existente
        bookRating,
        userRating,
        comment
      },
    });

    res.status(201).json(rating);
  } catch (error) {
    console.error('Erro ao registrar a classificação:', error);
    res.status(400).json({ error: 'Falha ao registrar classificação' });
  }
};

// Atualizar classificação
const updateRating = async (req, res) => {
  const { ratingId } = req.params;
  const { bookRating, userRating, comment } = req.body;

  try {
    const updatedRating = await prisma.loanRating.update({
      where: { ratingId: parseInt(ratingId) },
      data: { bookRating, userRating, comment },
    });
    res.json(updatedRating);
  } catch (error) {
    console.error('Erro ao atualizar a classificação:', error);
    res.status(400).json({ error: 'Falha ao atualizar a classificação' });
  }
};

// Listar classificações
const listRatings = async (req, res) => {
  try {
    const ratings = await prisma.loanRating.findMany();
    res.json(ratings);
  } catch (error) {
    console.error('Erro ao listar classificações:', error);
    res.status(500).json({ error: 'Falha ao listar as classificações' });
  }
};

// Excluir avaliação
const deleteRating = async (req, res) => {
  const { ratingId } = req.params;

  try {
    await prisma.loanRating.delete({ where: { ratingId: parseInt(ratingId) } });
    res.json({ message: 'Classificação excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir a avaliação:', error);
    res.status(400).json({ error: 'Falha ao excluir classificação' });
  }
};

module.exports = {
  registerRating,
  updateRating,
  listRatings,
  deleteRating,
};
