const express = require('express');
const router = express.Router();
const CONSUMEDPRODUCT = require('../models/ConsumedProduct');
const Product = require('../models/Product');

const ITEMS_PER_PAGE = 10; // Set the number of items per page

router.get('/', async (req, res) => {
    try {
        const totalItems = await CONSUMEDPRODUCT.countDocuments();
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        let page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const skip = (page - 1) * ITEMS_PER_PAGE;

        const consumedProducts = await CONSUMEDPRODUCT.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(ITEMS_PER_PAGE);

        // Extract consumed product IDs
        const consumedProductIds = consumedProducts.map(product => product.productId);

        const productsWithData = await Product.aggregate([
            {
                $match: {
                    _id: { $in: consumedProductIds }
                }
            },
            {
                $project: {
                    _id: 0,
                    productName: 1,
                    productType: 1,
                    productBrand: 1,
                }
            }
        ]);

        // Merge consumed products and matched product data into one array
        const consumedData = consumedProducts.map((consumedProduct, index) => ({
            ...consumedProduct.toObject(),
            productData: productsWithData[index]
        }));

        res.json({ totalPages, consumedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.post('/add', async (req, res) => {
    try {
        const {
            productId,
            employeeName,
            employeeId,
            quantity,
            date,
            engineerName,
        } = req.body;

        const newProduct = new CONSUMEDPRODUCT({
            productId,
            employeeName,
            employeeId,
            quantity,
            date,
            engineerName,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
