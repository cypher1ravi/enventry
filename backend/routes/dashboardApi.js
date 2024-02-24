const express = require('express');
const router = express.Router();
const PRODUCT = require('../models/Product');
const Purches = require('../models/Purches');
const CONSUMEDPRODUCT = require('../models/ConsumedProduct');

async function getProductName(productId) {
    try {
        const products = await PRODUCT.findById(productId);
        return products.productName
    } catch (error) {
        console.error('Error getting products', error);
        throw error;
    }
}
async function getProductType(productId) {
    try {
        const products = await PRODUCT.findById(productId);
        return products.productType
    } catch (error) {
        console.error('Error getting products', error);
        throw error;
    }
}
async function getProductBrand(productId) {
    try {
        const products = await PRODUCT.findById(productId);
        return products.productBrand
    } catch (error) {
        console.error('Error getting products', error);
        throw error;
    }
}
async function getAllProductIds() {
    try {
        const products = await PRODUCT.find({}, { _id: 1 });
        return products.map(product => product._id);
    } catch (error) {
        console.error('Error getting product IDs:', error);
        throw error;
    }
}
async function calculateTotalQuantity(productId) {
    try {
        const result = await Purches.aggregate([
            {
                $match: {
                    productId: productId
                }
            },
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$quantity" }
                }
            }
        ]);
        if (result.length > 0) {
            return result[0].totalQuantity;
        } else {
            return 0; // If no purchases found for the product
        }
    } catch (error) {
        console.error('Error calculating total quantity:', error);
        throw error;
    }
}

// Function to calculate consumed quantity of a product from the consumed product collection
async function calculateConsumedQuantity(productId) {
    try {
        const result = await CONSUMEDPRODUCT.aggregate([
            {
                $match: {
                    productId: productId
                }
            },
            {
                $group: {
                    _id: null,
                    consumedQuantity: { $sum: "$quantity" }
                }
            }
        ]);
        if (result.length > 0) {
            return result[0].consumedQuantity;
        } else {
            return 0; // If no consumption found for the product
        }
    } catch (error) {
        console.error('Error calculating consumed quantity:', error);
        throw error;
    }
}
router.get('/', async (req, res) => {
    try {

        // Get all product IDs
        const productIds = await getAllProductIds();

        // Initialize an array to store results for each product
        const results = [];

        // Iterate over each product ID and calculate quantities
        for (const productId of productIds) {
            const totalQuantity = await calculateTotalQuantity(productId);
            const consumedQuantity = await calculateConsumedQuantity(productId);

            // Push the results to the array
            results.push({
                productId: productId,
                totalQuantity: totalQuantity,
                consumedQuantity: consumedQuantity,
                remainingQuantity: totalQuantity - consumedQuantity
            });
        }
        res.json(results);
    } catch (error) {
        console.error('Error calculating quantities:', error);
        res.status(500).json({ error: 'An error occurred while calculating quantities' });
    }
});
router.get('/report', async (req, res) => {
    try {
        // Get all product IDs
        const productIds = await getAllProductIds();

        // Initialize an array to store results for each product
        const results = [];

        // Iterate over each product ID and gather details
        for (const productId of productIds) {
            const totalQuantity = await calculateTotalQuantity(productId);
            const consumedQuantity = await calculateConsumedQuantity(productId);

            // Fetch additional product details
            const productName = await getProductName(productId);
            const productType = await getProductType(productId);
            const productBrand = await getProductBrand(productId);

            // Push the results to the array
            results.push({
                productId: productId,
                productName: productName,
                productType: productType,
                productBrand: productBrand,
                totalQuantity: totalQuantity,
                consumedQuantity: consumedQuantity,
                remainingQuantity: totalQuantity - consumedQuantity
            });
        }
        res.json(results);
    } catch (error) {
        console.error('Error retrieving product details:', error);
        res.status(500).json({ error: 'An error occurred while retrieving product details' });
    }
});


module.exports = router;


