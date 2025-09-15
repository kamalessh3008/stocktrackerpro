// backend/src/DataBase/db.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Get MongoDB URL from environment variables
        const MONGOURL = process.env.MONGODB_URI || process.env.MONGO_URL || process.env.DATABASE_URL;
        
        if (!MONGOURL) {
            throw new Error('MongoDB connection string not found in environment variables. Please set MONGODB_URI in your .env file');
        }

        console.log(' Connecting to MongoDB Atlas...');
        
        // Connect to MongoDB Atlas with recommended options
        await mongoose.connect(MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(' MongoDB Atlas connected successfully');
        console.log(` Connected to database: ${mongoose.connection.name}`);
        
    } catch (err) {
        console.error(' MongoDB connection error:', err.message);
        
        // Helpful error messages based on common issues
        if (err.message.includes('authentication failed')) {
            console.log(' Solution: Check your username and password in the connection string');
            console.log('   Make sure you replaced <db_password> with your actual password');
        }
        if (err.message.includes('IP address') || err.message.includes('not allowed')) {
            console.log(' Solution: Add your IP address to MongoDB Atlas Network Access');
            console.log('   Go to Atlas → Network Access → Add IP Address');
        }
        if (err.message.includes('ENOTFOUND')) {
            console.log('Solution: Check your cluster URL in the connection string');
        }
        if (err.message.includes('connection string not found')) {
            console.log(' Solution: Create a .env file in your backend folder with:');
            console.log('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
        }
        
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log(' MongoDB Atlas connection established');
});

mongoose.connection.on('disconnected', () => {
    console.log(' MongoDB Atlas disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB Atlas error:', err);
});

mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB Atlas reconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n Shutting down gracefully...');
    await mongoose.connection.close();
    console.log(' MongoDB connection closed due to application termination');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n SIGTERM received, shutting down gracefully...');
    await mongoose.connection.close();
    console.log('🔒 MongoDB connection closed');
    process.exit(0);
});

module.exports = connectDB