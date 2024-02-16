const mongoose = require('mongoose');

const ConsumedProductSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    employeeName: String,
    employeeId: String,
    quantity: Number,
    date: String,
    engineerName: String,
});

const ConsumedProduct = mongoose.model('ConsumedProduct', ConsumedProductSchema);

module.exports = ConsumedProduct;