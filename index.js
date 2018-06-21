require('dotenv').config();

const app = require('./app');

const port = process.env.SERVER_PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on Port ${port}`);
});
