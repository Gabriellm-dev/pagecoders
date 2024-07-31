const express = require('express');
const dotenv = require('dotenv');
const prisma = require('./prismaClient');
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

dotenv.config();

const app = express();

app.use(express.json());

// Middleware
app.use('/auth', authRoutes);
app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
