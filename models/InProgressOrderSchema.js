const Sequelize = require('sequelize');
const Sequelize_DB = require('../utils/db');




const InProgressOrderSchema = Sequelize_DB.define('inprogress_orders', {
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


    deadline_date: {
        type: Sequelize.DATE,
        comment: "The date the order should be sumitted"
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


// Exporting InProgressOrderSchema, using this constant
// we can perform CRUD operations on
// 'CancelledOrders' table.
module.exports = InProgressOrderSchema