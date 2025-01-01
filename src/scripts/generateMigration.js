const fs = require('fs');
const path = require('path');

const generateMigrationFile = (name) => {
  if (!name) {
    console.error("Migration name is required.");
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14);
  const filename = `${timestamp}-${name}.js`;
  const filePath = path.join(__dirname, '..', 'db', 'migrations', filename);

  const content = `
module.exports = {
  up: async (client) => {
    // Write your migration code for "up" here
  },

  down: async (client) => {
    // Write your migration code for "down" here
  }
};
  `;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Migration file created at: ${filePath}`);
};

const migrationName = process.argv[2];
generateMigrationFile(migrationName);
