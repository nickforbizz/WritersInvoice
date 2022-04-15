// Import our DB connection
const Sequelize_DB = require('../utils/db');


const Models = {};
// Import our Models
Models.Account = require('./Account');




// Sync all models that are not 
// already in the database 
Sequelize_DB.sync()  


module.exports = Models;