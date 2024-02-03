const express = require('express');
const router = express.Router();
const CONSUMEDPRODUCT = require('../models/ConsumedProduct');

const ITEMS_PER_PAGE = 1; // Set the number of items per page

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

        res.json({ totalPages, consumedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const {
            employeeName,
            employeeId,
            productName,
            productType,
            productBrand,
            quantity,
            date,
            engineerName,
        } = req.body;

        const newProduct = new CONSUMEDPRODUCT({
            employeeName,
            employeeId,
            productName,
            productType,
            productBrand,
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
