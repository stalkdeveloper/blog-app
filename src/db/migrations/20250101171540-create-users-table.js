module.exports = {
  up: async (client) => {
    await client.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) DEFAULT NULL, 
        date_of_birth DATE,
        password VARCHAR(255) DEFAULT NULL,
        country_code VARCHAR(10),
        mobile_number VARCHAR(20),
        status SMALLINT DEFAULT 1 CHECK (status IN (0, 1)),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL,
      );
    `);
  },

  down: async (client) => {
    await client.query('DROP TABLE IF EXISTS Users;');
  }
};