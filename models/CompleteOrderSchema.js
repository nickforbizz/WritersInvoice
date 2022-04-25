const Sequelize = require('sequelize');
const Sequelize_DB = require('../utils/db');




const CompleteOrderSchema = Sequelize_DB.define('complete_orders', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
    },

    order_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },

    complete_date: {
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


// Exporting CompleteOrderSchema, using this constant
// we can perform CRUD operations on
// 'CompleteOrders' table.
module.exports = CompleteOrderSchema