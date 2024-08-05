const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;