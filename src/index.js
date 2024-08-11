const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());

app.use('/api/auth', routes.authRoutes);
app.use('/api', authMiddleware, routes.apiRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
