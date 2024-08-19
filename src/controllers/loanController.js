const prisma = require('../prismaClient');

// Solicita um empréstimo de livro
const requestLoan = async (req, res) => {
  let { bookCode: fkBookCode, expectedReturnDate } = req.body;
  const { cpf } = req.user;

  fkBookCode = Number(fkBookCode);
  expectedReturnDate = new Date(expectedReturnDate);

  if (isNaN(fkBookCode)) {
    return res.status(400).json({ error: 'Código do livro inválido' });
  }

  if (isNaN(expectedReturnDate.getTime())) {
    return res.status(400).json({ error: 'Data de devolução inválida' });
  }

  try {
    const book = await prisma.book.findUnique({
      where: { code: fkBookCode }
    });

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    if (!book.available) {
      return res.status(400).json({ error: 'Livro não disponível para empréstimo' });
    }

    const loan = await prisma.loan.create({
      data: {
        userCpf: cpf,
        bookCode: fkBookCode,
        expectedReturnDate,
        loanAuthorized: false,
        loanRequested: true
      },
    });

    res.status(201).json(loan);
  } catch (error) {
    console.error('Erro ao solicitar empréstimo:', error);
    res.status(500).json({ error: 'Falha ao solicitar empréstimo' });
  }
};

// Lista os empréstimos com detalhes
const listLoans = async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        book: true,
        user: true
      }
    });
    res.json(loans);
  } catch (error) {
    console.error('Erro ao listar empréstimos:', error);
    res.status(500).json({ error: 'Falha ao listar empréstimos' });
  }
};

// Autoriza um empréstimo
const authorizeLoan = async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await prisma.loan.findUnique({
      where: { loanId: parseInt(loanId) },
      include: { book: true }
    });

    if (!loan) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    if (loan.book.userCpf !== req.user.cpf) {
      return res.status(403).json({ error: 'Somente o dono do livro pode autorizar o empréstimo' });
    }

    const authorizedLoan = await prisma.loan.update({
      where: { loanId: parseInt(loanId) },
      data: { loanAuthorized: true }
    });

    res.json(authorizedLoan);
  } catch (error) {
    console.error('Erro ao autorizar empréstimo:', error);
    res.status(500).json({ error: 'Falha ao autorizar empréstimo' });
  }
};

// Devolver um livro para o seu dono
const returnBook = async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await prisma.loan.findUnique({
      where: { loanId: parseInt(loanId) },
      include: { book: true }
    });

    if (!loan) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    if (loan.userCpf !== req.user.cpf) {
      return res.status(403).json({ error: 'Somente quem pegou o livro emprestado pode devolvê-lo' });
    }

    if (!loan.loanAuthorized) {
      return res.status(400).json({ error: 'O empréstimo não foi autorizado' });
    }

    const returnedLoan = await prisma.loan.update({
      where: { loanId: parseInt(loanId) },
      data: {
        returnDate: new Date(),
        loanRequested: false
      }
    });

    await prisma.book.update({
      where: { code: loan.bookCode },
      data: { available: true }
    });

    res.json(returnedLoan);
  } catch (error) {
    console.error('Erro ao devolver o livro:', error);
    res.status(500).json({ error: 'Falha ao devolver o livro' });
  }
};

module.exports = {
  requestLoan,
  listLoans,
  authorizeLoan,
  returnBook,
};
