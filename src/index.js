const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const livroRoutes = require('./routes/livroRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

app.use('/auth', usuarioRoutes);
app.use('/livros', livroRoutes);
app.use('/emprestimos', emprestimoRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
