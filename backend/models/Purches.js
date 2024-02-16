const mongoose = require('mongoose')

const purchesSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    vendorName: String,
    dop: String,
    dow: String,
});

const Purches = mongoose.model('Purches', purchesSchema);

module.exports = Purches;
