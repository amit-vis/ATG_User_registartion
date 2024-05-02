const {Sequelize} = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('user_app', 'root', '',{
    host: process.env.HOST,
    dialect: 'mysql'
});

async function connection(){
    try {
        await sequelize.authenticate();
        console.log("Connection stablished successfully!!")
    } catch (error) {
        console.log("Enable to connect the databse", error)
    }
}

connection();
module.exports = sequelize;