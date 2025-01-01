const fs = require('fs');
const path = require('path');

const generateControllerFile = (name, isFullTemplate) => {
  if (!name) {
    console.error("Controller name is required.");
    process.exit(1);
  }

  const parts = name.split('/');
  const controllerName = parts.pop();
  const folderPath = parts.join('/');

  const controllerPath = path.join(__dirname, '..', 'controllers', folderPath, `${controllerName}.js`);

  if (fs.existsSync(controllerPath)) {
    console.log(`Controller file already exists at: ${controllerPath}`);
    return; 
  }

  const directoryPath = path.dirname(controllerPath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  let content;

  if (isFullTemplate) {
    content = `class ${controllerName} {
      /* GET all items */
      async index(req, res) {
        res.send('List all ${controllerName.toLowerCase()}s');
      }

      /* GET one item */
      async show(req, res) {
        res.send('Show a single ${controllerName.toLowerCase()}');
      }

      /* Create a new item */
      async create(req, res) {
        res.send('Create a new ${controllerName.toLowerCase()}');
      }

      /* Update an item */
      async update(req, res) {
        res.send('Update a ${controllerName.toLowerCase()}');
      }

      /* Delete an item */
      async destroy(req, res) {
        res.send('Delete a ${controllerName.toLowerCase()}');
      }
    }
      
    module.exports = ${controllerName};`;
  } else {
    content = `class ${controllerName} {
    }
    module.exports = ${controllerName};`;
  }

  // Write the new controller file
  fs.writeFileSync(controllerPath, content, 'utf8');
  console.log(`Controller file created at: ${controllerPath}`);
};

const controllerName = process.argv[2];
const isFullTemplate = process.argv.includes('-r');

generateControllerFile(controllerName, isFullTemplate);
