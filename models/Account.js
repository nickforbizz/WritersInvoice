const Sequelize = require('sequelize');
const Sequelize_DB = require('../utils/db');




const Account = Sequelize_DB.define('accounts', {
    id:{
  
        // Sequelize module has INTEGER Data_Type.
        type: Sequelize.INTEGER,
  
        // To increment id automatically.
        autoIncrement:true,
  
        // id can not be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
    },

    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },

    name: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },

    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1 
    },

    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    created_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

   


}, {
    timestamps: false,
    underscored: true
});


// Exporting Account, using this constant
// we can perform CRUD operations on
// 'Account' table.
module.exports = Account