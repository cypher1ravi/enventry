const express = require('express');
const router = express.Router();
const Purches = require('../models/Purches');
const Product = require('../models/Product');

const ITEMS_PER_PAGE = 10;
router.get('/', async (req, res) => {
    try {
        const totalItems = await Purches.countDocuments();
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        let page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const skip = (page - 1) * ITEMS_PER_PAGE;

        const purchesProducts = await Purches.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(ITEMS_PER_PAGE);

        // Extract consumed product IDs
        const purchesProductIds = purchesProducts.map(product => product.productId);

        const productsWithData = await Product.aggregate([
            {
                $match: {
                    _id: { $in: purchesProductIds }
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
        const purchesData = purchesProducts.map((purchesProduct, index) => ({
            ...purchesProduct.toObject(),
            productData: productsWithData[index]
        }));

        res.json({ totalPages, purchesData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/add', async (req, res) => {
    const { productId,
        quantity,
        dop,
        dow,
        vendorName,
        description } = req.body;

    const newPurches = new Purches({
        productId,
        quantity,
        dop,
        dow,
        vendorName,
        description

    });

    await newPurches.save();
    res.status(201).json(newPurches);
});
module.exports = router;