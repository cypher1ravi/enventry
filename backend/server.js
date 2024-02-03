const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const product = require('./routes/product')
const issuedProduct = require('./routes/issuedProduct')
const dashboard = require('./routes/dashboardApi')
const login = require('./routes/login')
const password = require('./routes/password')
const register = require('./routes/register')

const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inven', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//product api
app.use('/Products', product);
app.use('/consumeProduct', issuedProduct);
app.use('/dashboard', dashboard);
app.use('/dashboard', dashboard);
app.use('/login', login);
app.use('/register', register);
app.use('/password', password);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
