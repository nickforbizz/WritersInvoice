const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Sequelize_DB = require('../utils/db');




const UserSchema = Sequelize_DB.define('users', {
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

    // uuid: {
    //     type: Sequelize.UUID(5),
    //     defaultValue: Sequelize.UUIDV4,
    //     unique: true,
    // },
    
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return undefined;
        }
    },

    fname: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    lname: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail : true
        }
    },

    mobile: {
        type: Sequelize.STRING,
    },   

    is_Manager: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    is_third_party_access: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    third_party_name: {
        type: Sequelize.STRING,
    },

    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },

        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        
        // instanceMethods: {
        //     validPassword: (password) => {
        //         return bcrypt.compareSync(password, this.password);
        //     }
        // }
    }
});


UserSchema.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
}


// Exporting UserSchema, using this constant
// we can perform CRUD operations on
// 'User' table.
module.exports = UserSchema