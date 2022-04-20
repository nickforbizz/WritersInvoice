const Sequelize = require('sequelize');
const Sequelize_DB = require('../utils/db');




const OrderShema = Sequelize_DB.define('orders', {
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

    writer_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },

    account_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },

    order_number:{
        type: Sequelize.INTEGER,
        allowNull:false,
        unique: true
    },

    pages: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 1,
    },

    cpp: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        comment: "Pay Per Page" 
    },

    total_pay: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        comment: "cpp * pages" 
    },

    paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: "Has the payment been done" 
    },

    payment_date: {
        type: Sequelize.DATE,
        comment: "The date the payment was made for this order"
    },

    active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },

    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "1 On-progress, 2 Revision, 3 On-hold, 4 Escalated, 5 Cancelled, 6 Complete" 
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


// Exporting OrderShema, using this constant
// we can perform CRUD operations on
// 'Orders' table.
module.exports = OrderShema