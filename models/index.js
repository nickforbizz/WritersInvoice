// Import our DB connection
const Sequelize_DB = require('../utils/db');


const Models = {};
// Import our Models
Models.User = require('./UserSchema');
Models.Account = require('./AccountSchema');
Models.Order = require('./OrderSchema');
Models.InProgressOrder = require('./InProgressOrderSchema');
Models.RevisedOrder = require('./RevisedOrderSchema');
Models.CancelledOrder = require('./CancelledOrderSchema');
Models.CompleteOrder = require('./CompleteOrderSchema');




// Sync all models that are not 
// already in the database 
Sequelize_DB.sync()

// Make changes to match the Model
Sequelize_DB.sync({ alter: true });

// Drop the table, then Recreate it 
// Sequelize_DB.sync({ force: true });


module.exports = Models;