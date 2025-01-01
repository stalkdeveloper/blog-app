/* const mongoose = require('mongoose');
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

module.exports = connect; */

const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const config = require('../src/config/db'); 

async function connectMongo() {
  try {
    await mongoose.connect(dbConfig.url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function connectSequelize() {
  let sequelize;

  if (dbConfig.dialect === 'mysql' || dbConfig.dialect === 'postgres') {
    sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
    });
  } else if (dbConfig.dialect === 'sqlite') {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbConfig.storage,
    });
  }

  try {
    await sequelize.authenticate();
    console.log(`Connected to ${dbConfig.dialect === 'sqlite' ? 'SQLite' : dbConfig.dialect}`);
  } catch (error) {
    console.error(`Unable to connect to ${dbConfig.dialect}:`, error);
    process.exit(1);
  }
}

async function connect() {
  if (dbConfig.url) {
    await connectMongo();
  } else if (dbConfig.dialect) {
    await connectSequelize();
  } else {
    console.error('Unsupported database type or missing configuration');
    process.exit(1);
  }
}

module.exports = connect;