const mongoose = require('mongoose');

const ConsumedProductSchema = new mongoose.Schema({
    employeeName: String,
    employeeId: String,
    productName: String,
    productType: String,
    productBrand: String,
    quantity: Number,
    date: String,
    engineerName: String,
});

const ConsumedProduct = mongoose.model('ConsumedProduct', ConsumedProductSchema);

module.exports = ConsumedProduct;