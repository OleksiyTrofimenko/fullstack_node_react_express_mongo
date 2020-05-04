const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// process.env.PORT used for production version
// locally process.env.PORT is undefined
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Listening:', PORT);
});

// http://localhost:5000
