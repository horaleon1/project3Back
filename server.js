const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();
//Init Middleware
app.use(express.json( { extended: false }));

app.get('/', (req,res) =>  res.json({ msg: 'Welcome to my world' }));

//Routes
app.use('/users', require('./routes/users'));
app.use('/wallets', require('./routes/wallets'));
app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));