const Sequelize = require('sequelize');
const Sequelize_DB = require('../utils/db');




const AccountSchema = Sequelize_DB.define('accounts', {
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

    cpp: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        comment: "Pay Per Page" 
    },

    managed_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "User Id" 
    },

    no_of_writers: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "Total Users" 
    },

    uses_vpn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    vpn_name: {
        type: Sequelize.STRING,
    },

    vpn_cost: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0.00,
    },
    
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },

    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "1 Normal, 2 Silver, 3 Platinum, 4 Gold" 
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


// Exporting AccountSchema, using this constant
// we can perform CRUD operations on
// 'Account' table.
module.exports = AccountSchema