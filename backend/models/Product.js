const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    productType: String,
    productBrand: String,
    quantity: Number,
    date: String,
    vendorName: String,
    description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
