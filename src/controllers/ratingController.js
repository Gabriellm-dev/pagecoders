const prisma = require('../prismaClient');

// Registra uma nova classificação
const registerRating = async (req, res) => {
  const { fkLoanId, bookRating, userRating, comment } = req.body;

  try {
    const rating = await prisma.loanRating.create({
      data: {
        fkLoanId,
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

//Exclui avaliação
const deleteRating = async (req, res) => {
  const { ratingId } = req.params;

  try {
    await prisma.loanRating.delete({ where: { ratingId: parseInt(ratingId) } });
    res.json({ message: 'Classificação excluída com sucessoy' });
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
