const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.SECRET_KEY
router.post('/', async (req, res) => {
    // Login route logic
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            res.status(401).send('Invalid Login Credentials');
            return;
        }

        const PasswordValid = await bcrypt.compare(password, user.password);

        if (!PasswordValid) {
            res.status(401).send('Invalid Login Credentials');
            return;
        }
        const data = {
            id: user.id,
            user: user.username,
        }
        const authToken = jwt.sign(data, secretKey, { expiresIn: '1h' })
        // res.json({
        //     status: 200,
        //     success: true,
        //     message: `Welcome, ${user.username}!`,
        // });
        res.send({ authToken })
        // console.log(authToken);


    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
