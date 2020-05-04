const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./services/passport'); // if nothing to assign but functionality required
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

authRoutes(app);
// or cool trick without const
// require('./routes/authRoutes')(app);

// process.env.PORT used for production version
// locally process.env.PORT is undefined
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Listening:', PORT);
});

// http://localhost:5000
