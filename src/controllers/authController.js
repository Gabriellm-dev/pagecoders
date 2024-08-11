const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { cpf, email, password, name, street, number, neighborhood, city, state, zip } = req.body;

  if (!cpf || !email || !password || !name) {
    return res.status(400).json({ error: 'CPF, email, senha e nome são obrigatórios' });
  }

  try {
    const parsedNumber = number ? parseInt(number, 10) : null;
    const hashedPassword = await bcrypt.hash(password, 10);
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

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

module.exports = { register, loginUser };
