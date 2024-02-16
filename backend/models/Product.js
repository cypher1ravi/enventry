const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    productType: String,
    productBrand: String,

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
