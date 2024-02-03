const express = require('express');
const router = express.Router();
const PRODUCT = require('../models/Product');


router.get('/', async (req, res) => {
    const products = await PRODUCT.find();
    res.json(products);
});

router.get('/productName', async (req, res) => {
    try {
        // Use MongoDB aggregation to get unique product types
        const productName = await PRODUCT.distinct('productName');
        res.json(productName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/productTypes/:productName', async (req, res) => {
    const productName = req.params.productName;

    try {
        // Find distinct product types for the given product name
        const productTypes = await PRODUCT.distinct('productType', { productName });

        if (productTypes.length > 0) {
            res.json({ productName, productTypes });
        } else {
            res.status(404).json({ error: 'Product types not found for the given name' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/productBrand/:productName/:productType', async (req, res) => {
    const productName = req.params.productName;
    const productType = req.params.productType;

    try {
        // Find distinct product brands for the given name and type
        const productBrands = await PRODUCT.distinct('productBrand', { productName, productType });

        if (productBrands.length > 0) {
            res.json({ productName, productType, productBrands });
        } else {
            res.status(404).json({ error: 'Product brands not found for the given name and type' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addProduct', async (req, res) => {
    const { productName,
        productType,
        productBrand,
        quantity,
        date,
        vendorName,
        description } = req.body;

    const newProduct = new PRODUCT({
        productName,
        productType,
        productBrand,
        quantity,
        date,
        vendorName,
        description
    });
    await newProduct.save();
    res.json(newProduct);
    res.status(201)
});
router.delete('/delete/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await PRODUCT.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;