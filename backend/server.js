const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const product = require('./routes/product')
const issuedProduct = require('./routes/issuedProduct')
const dashboard = require('./routes/dashboardApi')
const login = require('./routes/login')
const password = require('./routes/password')
const register = require('./routes/register');
const Purches = require('./routes/purches')
const verifyToken = require('./middleware/auth')
const PORT = process.env.PORT || 3000;
const uri = process.env.URI

app.use(cors());
require('dotenv').config();
app.use(express.json());

mongoose.connect(uri);
app.get('/', (req, res) => {
    res.send("Server is now working")
});
app.use('/login', login);
app.use('/register', register);
app.use('/products', verifyToken, product);
app.use('/purches', verifyToken, Purches);
app.use('/consumeProduct', verifyToken, issuedProduct);
app.use('/dashboard', verifyToken, dashboard);
app.use('/password', verifyToken, password);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
