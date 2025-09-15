// backend/src/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Fixed path: since app.js is in src/, and db.js is in src/DataBase/, use relative path
const connectDB = require('./DataBase/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Move cors before other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend is working and MongoDB is connected!',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/alphavantage', require('./routes/alphaVantageRoute'));
app.use('/api/finnhub', require('./routes/finnhubRoute'));
app.use('/api/nse', require('./routes/nseRoute'));
app.use('/api/apininjas', require('./routes/apiNinjasRoute'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl 
    });
});

module.exports = app;