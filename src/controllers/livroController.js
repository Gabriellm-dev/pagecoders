const prisma = require('../prismaClient');

const createLivro = async (req, res) => {
  const { nome, editora, data_publicacao, num_edicao, autor_es, genero } = req.body;

  try {
    const livro = await prisma.livro.create({
      data: {
        fk_usuario_cpf: req.user.cpf,
        nome,
        editora,
        data_publicacao: new Date(data_publicacao),
        num_edicao,
        autor_es,
        genero,
      },
    });
    res.status(201).json(livro);
  } catch (error) {
    res.status(400).json({ error: 'Livro creation failed' });
  }
};

const getLivros = async (req, res) => {
  const livros = await prisma.livro.findMany();
  res.json(livros);
};

const updateLivro = async (req, res) => {
  const { codigo } = req.params;
  const { nome, editora, data_publicacao, num_edicao, autor_es, genero, disponivel } = req.body;

  try {
    const livro = await prisma.livro.update({
      where: { codigo: parseInt(codigo) },
      data: { nome, editora, data_publicacao: new Date(data_publicacao), num_edicao, autor_es, genero, disponivel },
    });
    res.json(livro);
  } catch (error) {
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
    res.status(400).json({ error: 'Livro deletion failed' });
  }
};

module.exports = { createLivro, getLivros, updateLivro, deleteLivro };
