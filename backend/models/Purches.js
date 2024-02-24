const mongoose = require('mongoose')
const Product = require('./Product')

const purchesSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    quantity: Number,
    vendorName: String,
    dop: String,
    dow: String,
});

const Purches = mongoose.model('Purches', purchesSchema);

module.exports = Purches;
