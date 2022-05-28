const Sequelize = require('sequelize');
const Sequelize_DB = require('../utils/db');




const CancelledOrderSchema = Sequelize_DB.define('cancelled_orders', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },


    order_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },

    cancelled_causes: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    cancelled_date: {
        type: Sequelize.DATE,
        comment: "The date the order was cancelled"
    },

    active: {
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


// Exporting CancelledOrderSchema, using this constant
// we can perform CRUD operations on
// 'CancelledOrders' table.
module.exports = CancelledOrderSchema