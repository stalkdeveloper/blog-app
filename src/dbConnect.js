const mongoose = require('mongoose');
const config = require('../src/config/db');

async function connect() {
    try {
        await mongoose.connect(config.url);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}

module.exports = connect;