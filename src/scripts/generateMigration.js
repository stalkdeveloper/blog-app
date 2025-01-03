// const fs = require('fs');
// const path = require('path');

// const generateMigrationFile = (name) => {
//   if (!name) {
//     console.error("Migration name is required.");
//     process.exit(1);
//   }

//   const timestamp = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14);
//   const filename = `${timestamp}-${name}.js`;
//   const filePath = path.join(__dirname, '..', 'db', 'migrations', filename);

//   const content = `
// module.exports = {
//   up: async (client) => {
//     // Write your migration code for "up" here
//   },

//   down: async (client) => {
//     // Write your migration code for "down" here
//   }
// };
//   `;

//   fs.writeFileSync(filePath, content, 'utf8');
//   console.log(`Migration file created at: ${filePath}`);
// };

// const migrationName = process.argv[2];
// generateMigrationFile(migrationName);

const fs = require('fs');
const path = require('path');

const generateMigrationFile = (name) => {
  if (!name) {
    console.error("Migration name is required.");
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14);
  
  const [action, tableName] = name.split('-');
  if (!tableName) {
    console.error("Please provide a valid migration name in the format: action-table_name");
    process.exit(1);
  }

  const filename = `${timestamp}_${action}-${tableName}.js`;
  const filePath = path.join(__dirname, '..', 'db', 'migrations', filename);

  if (fs.existsSync(filePath)) {
    console.log(`Migration file already exists at: ${filePath}`);
    return;
  }

  let content = '';

  // Generate migration content based on action (create, add, modify, remove)
  if (action === 'create') {
    content = `
      module.exports = {
        up: async (client) => {
          await client.schema.createTableIfNotExists('${tableName}', (table) => {
            table.increments('id').primary();
            // Add more columns
            table.timestamp('created_at').defaultTo(client.fn.now());
            table.timestamp('updated_at').defaultTo(client.fn.now()).onUpdate(client.fn.now());
            table.timestamp('deleted_at').nullable();
          });
        },

        down: async (client) => {
          await client.schema.dropTableIfExists('${tableName}');
        }
      };
    `;
  } else if (action === 'add') {
    content = `
      module.exports = {
        up: async (client) => {
          await client.schema.table('${tableName}', (table) => {
            table.string('new_column', 255).nullable(); // Example of adding a column
          });
        },

        down: async (client) => {
          await client.schema.table('${tableName}', (table) => {
            table.dropColumn('new_column');
          });
        }
      };
    `;
  } else if (action === 'modify') {
    content = `
      module.exports = {
        up: async (client) => {
          await client.schema.table('${tableName}', (table) => {
            table.string('name', 100).notNullable().alter(); // Example of modifying column
          });
        },

        down: async (client) => {
          await client.schema.table('${tableName}', (table) => {
            table.string('name', 60).notNullable().alter(); // Rollback to original column definition
          });
        }
      };
    `;
  } else if (action === 'remove') {
    content = `
      module.exports = {
        up: async (client) => {
          await client.schema.table('${tableName}', (table) => {
            table.dropColumn('column_to_remove');
          });
        },

        down: async (client) => {
          await client.schema.table('${tableName}', (table) => {
            table.string('column_to_remove', 255).nullable();
          });
        }
      };
    `;
  } else {
    console.error("Invalid migration action. Use 'create', 'add', 'modify', or 'remove'.");
    process.exit(1);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Migration file created at: ${filePath}`);
};

const migrationName = process.argv[2];
generateMigrationFile(migrationName);

/* 
  npm run make:migration create-users
  npm run make:migration add-users
  npm run make:migration modify-users
  npm run make:migration remove-users 
*/