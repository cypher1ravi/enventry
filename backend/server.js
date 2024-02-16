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
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uri = process.env.URI
app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

//product api
app.get('/', (req, res) => {
    res.send("Server is now working")
});
app.use('/products', product);
app.use('/purches', Purches);
app.use('/consumeProduct', issuedProduct);
app.use('/dashboard', dashboard);
app.use('/login', login);
app.use('/register', register);
app.use('/password', password);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
