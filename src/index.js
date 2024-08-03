const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use('/api', authMiddleware, routes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
