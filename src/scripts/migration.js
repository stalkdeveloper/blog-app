// src/scripts/migration.js

const fs = require('fs');
const path = require('path');
const client = require('../db/db');

const checkIfMigrationApplied = async (migrationName) => {
  const res = await client.query('SELECT 1 FROM migrations WHERE name = $1', [migrationName]);
  return res.rowCount > 0;
};

const markMigrationAsApplied = async (migrationName) => {
  await client.query('INSERT INTO migrations (name) VALUES ($1)', [migrationName]);
};

const removeMigrationRecord = async (migrationName) => {
  await client.query('DELETE FROM migrations WHERE name = $1', [migrationName]);
};

const runMigrations = async (direction = 'up', migrationName = null) => {
  try {
    const migrationFiles = migrationName
      ? [migrationName]
      : fs.readdirSync(path.join(__dirname, '..', 'db', 'migrations')).filter(file => file.endsWith('.js'));

    for (const file of migrationFiles) {
      const migrationPath = path.join(__dirname, '..', 'db', 'migrations', file);
      const migration = require(migrationPath);
      const migrationFileName = file.split('.')[0];

      if (direction === 'up' && !(await checkIfMigrationApplied(migrationFileName))) {
        console.log(`Running migration: ${file}`);
        await migration.up(client);
        await markMigrationAsApplied(migrationFileName);
      } else if (direction === 'down' && await checkIfMigrationApplied(migrationFileName)) {
        console.log(`Rolling back migration: ${file}`);
        await migration.down(client);
        await removeMigrationRecord(migrationFileName);
      }
    }

    console.log(`Migrations ${direction} successfully!`);
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await client.end();
  }
};

const args = process.argv.slice(2);
const direction = args[0] || 'up';

if (direction === 'down' && args[1]) {
  runMigrations('down', args[1]);
} else {
  runMigrations(direction);
}