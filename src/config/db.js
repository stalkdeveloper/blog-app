const dbConfig = {
  mongodb: {
    url: 'mongodb://localhost:27017/post-app'
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'post-app'
  },
  postgresql: {
    host: 'localhost',
    user: 'postgres',
    password: 'your-password',
    database: 'post-app',
    dialect: 'postgres'
  },
  sqlite: {
    storage: './database.sqlite',
    dialect: 'sqlite'
  },
  sequelize: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'post-app',
    dialect: 'mysql'
  }
};


const currentDb = process.env.DB_TYPE || 'mongodb';

if (!dbConfig[currentDb]) {
  console.error(`Unsupported database type: ${currentDb}. Please set DB_TYPE to one of the following: mongodb, mysql, postgresql, sqlite, sequelize.`);
  process.exit(1);
}

module.exports = dbConfig[currentDb];
