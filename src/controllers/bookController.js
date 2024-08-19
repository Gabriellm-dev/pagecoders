const prisma = require('../prismaClient');

// Registrando um novo Livro
const registerBook = async (req, res) => {
  const { fkUserCpf, name, publisher, publicationDate, editionNumber, authors, genre } = req.body;

  try {
    const book = await prisma.book.create({
      data: {
        userCpf: fkUserCpf,
        title: name,
        publisher,
        publicationDate: new Date(publicationDate),
        editionNumber,
        authors,
        genre,
        available: true,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('Falha no registro do livro:', error);
    res.status(400).json({ error: 'Falha no registro do livro' });
  }
};

// Atualizando um livro
const updateBook = async (req, res) => {
  const { code } = req.params;
  const { name, publisher, publicationDate, editionNumber, authors, genre, available } = req.body;

  try {
    const updatedBook = await prisma.book.update({
      where: { code: parseInt(code) },
      data: { title: name, publisher, publicationDate: new Date(publicationDate), editionNumber, authors, genre, available },
    });
    res.json(updatedBook);
  } catch (error) {
    console.error('Falha na atualização do livro:', error);
    res.status(400).json({ error: 'Falha na atualização do livro' });
  }
};

// Listando Livros
const listBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Formatar os dados para incluir o nome do usuário
    const booksWithOwner = books.map(book => ({
      ...book,
      ownerName: book.user.name,
    }));

    res.json(booksWithOwner);
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    res.status(500).json({ error: 'Falha ao listar livros' });
  }
};

// Deletando Livros
const deleteBook = async (req, res) => {
  const { code } = req.params;

  try {
    await prisma.book.delete({ where: { code: parseInt(code) } });
    res.json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    console.error('Falha na exclusão do livro:', error);
    res.status(400).json({ error: 'Falha na exclusão do livro' });
  }
};

const listAvailableBooks = async (req, res) => {
  try {
    const availableBooks = await prisma.book.findMany({
      where: { available: true }
    });
    res.json(availableBooks);
  } catch (error) {
    console.error('Erro ao listar livros disponíveis:', error);
    res.status(500).json({ error: 'Falha ao listar livros disponíveis' });
  }
};

module.exports = {
  registerBook,
  updateBook,
  listBooks,
  deleteBook,
  listAvailableBooks,
};
