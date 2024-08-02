const prisma = require('../prismaClient');

// Solicitar empréstimo de livro
const solicitarEmprestimo = async (req, res) => {
  const { fkLivroCodigo, dataPrevistaDevolucao } = req.body;
  const { cpf } = req.user;

  console.log('Dados recebidos:', req.body);
  console.log('Usuário autenticado:', req.user);

  if (typeof fkLivroCodigo !== 'number' || isNaN(fkLivroCodigo)) {
    console.error('Código do livro inválido:', fkLivroCodigo);
    return res.status(400).json({ error: 'Código do livro inválido' });
  }

  try {
    const livro = await prisma.livro.findUnique({
      where: { codigo: fkLivroCodigo }
    });

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    if (!livro.disponivel) {
      return res.status(400).json({ error: 'Livro não disponível para empréstimo' });
    }

    const emprestimo = await prisma.emprestimo.create({
      data: {
        fkUsuarioCpf: cpf,
        fkLivroCodigo: fkLivroCodigo,
        dataPrevistaDevolucao: new Date(dataPrevistaDevolucao),
        emprestimoAutorizado: false, // Inicialmente não autorizado
      },
    });

    res.status(201).json(emprestimo);
  } catch (error) {
    console.error('Erro ao solicitar empréstimo:', error);
    res.status(500).json({ error: 'Falha ao solicitar empréstimo' });
  }
};

// Listar empréstimos com detalhes
const listarEmprestimos = async (req, res) => {
  try {
    const emprestimos = await prisma.emprestimo.findMany({
      include: {
        livro: true,
        usuario: true
      }
    });
    res.json(emprestimos);
  } catch (error) {
    console.error('Erro ao listar empréstimos:', error);
    res.status(500).json({ error: 'Falha ao listar empréstimos' });
  }
};

// Autorizar um empréstimo
const autorizarEmprestimo = async (req, res) => {
  const { idEmprestimo } = req.params;

  try {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { idEmprestimo: parseInt(idEmprestimo) },
      include: { livro: true }
    });

    if (!emprestimo) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    if (emprestimo.livro.fkUsuarioCpf !== req.user.cpf) {
      return res.status(403).json({ error: 'Apenas o dono do livro pode autorizar o empréstimo' });
    }

    const emprestimoAutorizado = await prisma.emprestimo.update({
      where: { idEmprestimo: parseInt(idEmprestimo) },
      data: { emprestimoAutorizado: true }
    });

    res.json(emprestimoAutorizado);
  } catch (error) {
    console.error('Erro ao autorizar empréstimo:', error);
    res.status(500).json({ error: 'Falha ao autorizar empréstimo' });
  }
};

// Confirmar devolução de um livro
const devolverLivro = async (req, res) => {
  const { idEmprestimo } = req.params;

  try {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { idEmprestimo: parseInt(idEmprestimo) },
      include: { livro: true }
    });

    if (!emprestimo) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    if (emprestimo.livro.fkUsuarioCpf !== req.user.cpf) {
      return res.status(403).json({ error: 'Apenas o dono do livro pode confirmar a devolução' });
    }

    if (!emprestimo.emprestimoAutorizado) {
      return res.status(400).json({ error: 'O empréstimo não foi autorizado' });
    }

    const emprestimoDevolvido = await prisma.emprestimo.update({
      where: { idEmprestimo: parseInt(idEmprestimo) },
      data: {
        dataDevolucao: new Date(),
        emprestimoSolicitado: false
      }
    });

    await prisma.livro.update({
      where: { codigo: emprestimo.fkLivroCodigo },
      data: { disponivel: true }
    });

    res.json(emprestimoDevolvido);
  } catch (error) {
    console.error('Erro ao devolver livro:', error);
    res.status(500).json({ error: 'Falha ao devolver livro' });
  }
};

// Avaliar um empréstimo
const avaliarEmprestimo = async (req, res) => {
  const { idEmprestimo } = req.params;
  const { classifLivro, classifUsuario, comentario } = req.body;

  try {
    const avaliacao = await prisma.avaliacaoEmprestimo.create({
      data: {
        fkEmprestimoId: parseInt(idEmprestimo),
        classifLivro,
        classifUsuario,
        comentario
      },
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    console.error('Erro ao avaliar empréstimo:', error);
    res.status(500).json({ error: 'Falha ao avaliar empréstimo' });
  }
};

module.exports = {
  solicitarEmprestimo,
  listarEmprestimos,
  autorizarEmprestimo,
  devolverLivro,
  avaliarEmprestimo,
};
