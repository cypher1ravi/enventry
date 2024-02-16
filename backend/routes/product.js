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
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Find distinct product types for the given product name
        const product = await PRODUCT.findById(id)
        if (!product) {
            return res.status(404).json({ error: 'Product types not found for the given name' });
        } else {
            res.json(product);
        }
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
        const Brands = await PRODUCT.find({ productName, productType }, { _id: 1, productBrand: 1 });
        if (Brands.length > 0) {
            res.json(Brands);
        } else {
            res.status(404).json({ error: 'Product brands not found for the given name and type' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addProduct', async (req, res) => {
    const { productName, productType, productBrand } = req.body;


    const existingProduct = await PRODUCT.findOne({
        productName: productName,
        productType: productType,
        productBrand: productBrand
    });

    if (existingProduct) {

        return res.status(400).json({ error: "Product with same name, type, and brand already exists." });
    }

    // Create a new product if it doesn't exist
    const newProduct = new PRODUCT({
        productName,
        productType,
        productBrand,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
});
router.put('/update/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = req.body;

        // Find the product by ID and update its data
        const updatedProduct = await PRODUCT.findByIdAndUpdate(productId, updatedProductData, { new: true });

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'An error occurred while updating the product.' });
    }
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