const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, secretKey);
        // Check if token has expired
        if (decoded.exp <= Date.now() / 1000) {
            // If token has expired, redirect to login page
            return res.redirect('/');
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        // If token is invalid for any other reason
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;
