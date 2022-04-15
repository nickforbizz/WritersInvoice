// Include Sequelize module
const Sequelize = require('sequelize')
  
// Creating new Object of Sequelize
console.log("process.env.DB_NAME");
console.log(process.env.DB_NAME);
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_PASSWORD, 
    {  
        // Explicitly specifying 
        // mysql database
        dialect: 'mysql',
  
        // By default host is 'localhost'           
        host: process.env.DB_HOST,

        operatorsAliases: false,

        pool: {
            max: process.env.DB_POOL_MAX,
            min: process.env.DB_POOL_MIN,
            acquire: process.env.DB_POOL_ACQUIRE,
            idle: process.env.DB_POOL_IDLE,
          },
    }
);
  
// Exporting the sequelize object. 
// We can use it in another file
// for creating models
module.exports = sequelize