const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to database"));

db.once('open', ()=>{
    console.log("connected to data base:: mongodb")
});

module.exports = db;