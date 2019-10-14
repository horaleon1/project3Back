const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
// const path = require('path');

const app = express();

//Connect Database
connectDB();

// middlewares
app.use(cors());

//Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) =>  res.json({ msg: 'Bienvenido a Mundo Blockchain' }));

//Routes
app.use('/users', require('./routes/users'));
app.use('/wallets', require('./routes/wallets'));
app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));