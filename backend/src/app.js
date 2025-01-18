// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// console.log('JWT_SECRET:', process.env.JWT_SECRET);

// const loginRoute = require('./api/auth/login');
// const signupRoute = require('./api/auth/signup');
// const bookSeatsRoute = require('./api/seats/book');
// const resetSeatsRoute = require('./api/seats/reset');
// const fetchSeatsRoute = require('./api/seats/fetch');

// const app = express();
// app.use(express.json()); // Parses incoming JSON requests


// app.use(cors());

// app.post('/api/auth/login', loginRoute);
// app.post('/api/auth/signup', signupRoute);
// app.post('/api/seats/book', bookSeatsRoute);
// app.post('/api/seats/reset', resetSeatsRoute);
// app.get('/api/seats', fetchSeatsRoute);

// module.exports = app;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const loginRoute = require('./api/auth/login');
const signupRoute = require('./api/auth/signup');
const bookSeatsRoute = require('./api/seats/book');
const resetSeatsRoute = require('./api/seats/reset');
const fetchSeatsRoute = require('./api/seats/fetch');

const app = express();
app.use(express.json()); // Parses incoming JSON requests

// Updated CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Routes
app.post('/api/auth/login', loginRoute);
app.post('/api/auth/signup', signupRoute);
app.post('/api/seats/book', bookSeatsRoute);
app.post('/api/seats/reset', resetSeatsRoute);
app.get('/api/seats', fetchSeatsRoute);

module.exports = app;
