const fs = require('fs');
const path = require('path');

const generateModelFile = async (name, dbType) => {
    if (!name || !dbType) {
        console.error("Model name and database type (sequelize/mongoose/pg/sqlite) are required.");
        process.exit(1);
    }

    const parts = name.split('/');
    const modelName = parts.pop();
    const folderPath = parts.join('/');

    const modelPath = path.join(__dirname, '..', 'models', folderPath, `${modelName}.js`);
    const directoryPath = path.dirname(modelPath);

    if (fs.existsSync(modelPath)) {
        console.log(`Model file already exists at: ${modelPath}`);
        return;
    }

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    let content;

    if (dbType === 'sequelize' || dbType === 'pg' || dbType === 'postgresql' || dbType === 'sqlite') {
        content = `const { DataTypes } = require('sequelize');
            const sequelize = require('../config/db');

            const ${modelName} = sequelize.define('${modelName}', {
                // Define model attributes here
            }, {
                tableName: '${modelName.toLowerCase()}s',
                timestamps: true,
            });

            module.exports = ${modelName};
        `;
    } else if (dbType === 'mongoose') {
        content = `const mongoose = require('mongoose');
            const ${modelName}Schema = new mongoose.Schema({
                // Define model schema here
            });

            const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);
            module.exports = ${modelName};
        `;
    } else {
        console.error("Unsupported database type. Choose either 'sequelize', 'mongoose', 'pg', or 'sqlite'.");
        process.exit(1);
    }

    fs.writeFileSync(modelPath, content, 'utf8');
    console.log(`Model file created at: ${modelPath}`);
};

const modelName = process.argv[2];
const dbType = process.argv[3];

generateModelFile(modelName, dbType);
