const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    // Login route logic
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            res.status(401).send('Invalid username');
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.json({
                status: 200,
                success: true,
                user: user.username,
                message: `Welcome, ${user.username}!`,
            });
        } else {
            res.status(401).send('Invalid  password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
