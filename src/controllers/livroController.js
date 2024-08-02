const prisma = require('../prismaClient');

const createLivro = async (req, res) => {
  const { nome, editora, dataPublicacao, numEdicao, autorEs, genero } = req.body;

  try {
    const livro = await prisma.livro.create({
      data: {
        fkUsuarioCpf: req.user.cpf,
        nome,
        editora,
        dataPublicacao: new Date(dataPublicacao),
        numEdicao,
        autorEs,
        genero,
      },
    });
    res.status(201).json(livro);
  } catch (error) {
    console.error('Livro creation failed:', error);
    res.status(400).json({ error: 'Livro creation failed' });
  }
};

const getLivros = async (req, res) => {
  try {
    const livros = await prisma.livro.findMany();
    res.json(livros);
  } catch (error) {
    console.error('Failed to fetch livros:', error);
    res.status(500).json({ error: 'Failed to fetch livros' });
  }
};

const updateLivro = async (req, res) => {
  const { codigo } = req.params;
  const { nome, editora, dataPublicacao, numEdicao, autorEs, genero, disponivel } = req.body;

  try {
    const livro = await prisma.livro.update({
      where: { codigo: parseInt(codigo) },
      data: { nome, editora, dataPublicacao: new Date(dataPublicacao), numEdicao, autorEs, genero, disponivel },
    });
    res.json(livro);
  } catch (error) {
    console.error('Livro update failed:', error);
    res.status(400).json({ error: 'Livro update failed' });
  }
};

const deleteLivro = async (req, res) => {
  const { codigo } = req.params;

  try {
    await prisma.livro.delete({
      where: { codigo: parseInt(codigo) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Livro deletion failed:', error);
    res.status(400).json({ error: 'Livro deletion failed' });
  }
};

module.exports = { createLivro, getLivros, updateLivro, deleteLivro };
