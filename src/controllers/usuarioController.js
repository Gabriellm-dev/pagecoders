const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

// Registrar novo usuário
const registerUser = async (req, res) => {
  const { cpf, email, senha, nome, rua, numero, bairro, cidade, estado, cep } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const user = await prisma.usuario.create({
      data: {
        cpf,
        email,
        senha: hashedPassword,
        nome,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ cpf: user.cpf }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
