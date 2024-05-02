const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Token = db.define('Token',{
    token:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false

    },
    isValid:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    timestamps: true
});

module.exports = Token;