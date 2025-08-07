const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node server!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
