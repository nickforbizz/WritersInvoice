// Import our DB connection
const Sequelize_DB = require('../utils/db');


const Models = {};
// Import our Models
Models.Account = require('./AccountSchema');
Models.User = require('./UserSchema');




// Sync all models that are not 
// already in the database 
// Sequelize_DB.sync()

// Make changes to match the Model
Sequelize_DB.sync({ alter: true });

// Drop the table, then Recreate it 
// Sequelize_DB.sync({ force: true });


module.exports = Models;