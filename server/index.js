const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport'); // if nothing to assign but functionality required
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(keys.mongoURI);

const app = express();

// Cookie session
// set and encrypt cookie key for security https://cl.ly/7a8d0f9a6f04
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// Express session https://cl.ly/e9b1b8b468bf


// Application Middleware https://cl.ly/3280a6e7a3ea
app.use(passport.initialize());
app.use(passport.session());

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
