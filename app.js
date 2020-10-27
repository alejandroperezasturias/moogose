const express = require('express');
const app = express();
app.listen(4001);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
	console.log('connected to DB!');
});

// Import Routes
const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/recipes', recipesRoute);
app.use('/auth', authRoute);
