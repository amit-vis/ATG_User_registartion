const {DataTypes} = require('sequelize');
const db = require('../config/database');

const User = db.define('User',{
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isAlphanumeric: true,
            isCombination(value){
                if(!/[a-zA-Z]/.test(value) || !/\d/.test(value)){
                    throw new Error('Username must contain both letters and numbers.');
                }
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: true
})

module.exports = User;