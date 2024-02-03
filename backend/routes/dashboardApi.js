const express = require('express');
const router = express.Router();
const PRODUCT = require('../models/Product');
const CONSUMEDPRODUCT = require('../models/ConsumedProduct');
router.get('/card', async (req, res) => {
    try {
        const productQuantities = await PRODUCT.aggregate([
            { $group: { _id: "$productName", totalQuantity: { $sum: "$quantity" } } }
        ]);

        const consumedQuantities = await CONSUMEDPRODUCT.aggregate([
            { $group: { _id: "$productName", totalConsumedQuantity: { $sum: "$quantity" } } }
        ]);

        const result = productQuantities.map(productItem => {
            const consumedItem = consumedQuantities.find(consumedItem => consumedItem._id === productItem._id) || { totalConsumedQuantity: 0 };

            return {
                productName: productItem._id,
                totalQuantity: productItem.totalQuantity,
                totalConsumedQuantity: consumedItem.totalConsumedQuantity,
                remainingQuantity: (productItem.totalQuantity) - (consumedItem.totalConsumedQuantity)
            };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
