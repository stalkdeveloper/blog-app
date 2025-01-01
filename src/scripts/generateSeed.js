const fs = require('fs');
const path = require('path');

const generateSeedFile = (name, dbType) => {
  if (!name || !dbType) {
    console.error("Seed name and database type (sequelize/mongoose/pg/sqlite) are required.");
    process.exit(1);
  }

  const parts = name.split('/');
  const seedName = parts.pop();
  const folderPath = parts.join('/');

  const seedPath = path.join(__dirname, '..', 'db', 'seeds', folderPath, `${seedName}.js`);

  if (fs.existsSync(seedPath)) {
    console.log(`Seed file already exists at: ${seedPath}`);
    return;
  }

  const directoryPath = path.dirname(seedPath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  let content;

  if (dbType === 'sequelize' || dbType === 'pg' || dbType === 'postgresql' || dbType === 'sqlite') {
    content = `const { ${seedName} } = require('../../models'); // Adjust import path as needed

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await ${seedName}.bulkCreate([
        {
          // Example fields (adjust to your model's fields)
          name: 'Sample ${seedName} 1',
          description: 'Description for sample ${seedName} 1',
        },
        {
          name: 'Sample ${seedName} 2',
          description: 'Description for sample ${seedName} 2',
        }
      ]);
    },

    down: async (queryInterface, Sequelize) => {
      await ${seedName}.destroy({
        where: {},
        truncate: true, // This will remove all entries in the table
      });
    }
  };`;
  } else if (dbType === 'mongoose') {
    content = `const ${seedName} = require('../../models/${seedName}'); // Adjust import path as needed
    module.exports = {
      up: async () => {
        await ${seedName}.create([
          {
            // Example fields (adjust to your model's fields)
            name: 'Sample ${seedName} 1',
            description: 'Description for sample ${seedName} 1',
          },
          {
            name: 'Sample ${seedName} 2',
            description: 'Description for sample ${seedName} 2',
          }
        ]);
      },
      down: async () => {
        await ${seedName}.deleteMany({}); // Clear all records
      }
    };`;
  } else {
    console.error("Unsupported database type. Choose either 'sequelize', 'mongoose', 'pg', or 'sqlite'.");
    process.exit(1);
  }

  fs.writeFileSync(seedPath, content, 'utf8');
  console.log(`Seed file created at: ${seedPath}`);
};

const seedName = process.argv[2];
const dbType = process.argv[3];

generateSeedFile(seedName, dbType);
