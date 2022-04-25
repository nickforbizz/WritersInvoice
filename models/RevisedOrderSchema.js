const Sequelize = require('sequelize');
const Sequelize_DB = require('../utils/db');




const RevisedOrderSchema = Sequelize_DB.define('revised_orders', {
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

    revision_causes: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    revision_date: {
        type: Sequelize.DATE,
        comment: "The date the payment was made for this order"
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


// Exporting RevisedOrderSchema, using this constant
// we can perform CRUD operations on
// 'RevisedOrders' table.
module.exports = RevisedOrderSchema