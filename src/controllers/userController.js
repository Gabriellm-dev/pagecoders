const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

// Cadastra um novo usuário
const registerUser = async (req, res) => {
  const { cpf, email, password, name, street, number, neighborhood, city, state, zip } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        cpf,
        email,
        password: hashedPassword,
        name,
        street,
        number,
        neighborhood,
        city,
        state,
        zip,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Falha no registro do usuário:', error);
    res.status(400).json({ error: 'Falha no registro do usuário' });
  }
};

// Atualiza usuário
const updateUser = async (req, res) => {
  const { cpf } = req.params;
  const { email, name, street, number, neighborhood, city, state, zip } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { cpf },
      data: { email, name, street, number, neighborhood, city, state, zip },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Falha na atualização do usuário:', error);
    res.status(400).json({ error: 'Falha na atualização do usuário' });
  }
};

// Lista os usuários
const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Falha ao listar usuários' });
  }
};

// Deletar usuário
const deleteUser = async (req, res) => {
  const { cpf } = req.params;

  try {
    await prisma.user.delete({ where: { cpf } });
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Falha na exclusão do usuário:', error);
    res.status(400).json({ error: 'Falha na exclusão do usuário' });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ cpf: user.cpf }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Falha no login:', error);
    res.status(500).json({ error: 'Falha no login' });
  }
};

module.exports = {
  registerUser,
  updateUser,
  listUsers,
  deleteUser,
  loginUser,
};
