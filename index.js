const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/database');

app.use(express.json());

app.use('/', require('./routes'))
app.listen(port, (err)=>{
    if(err){
        console.log("server is not listening the port")
    }
    console.log("server is listen the port successfully", port);
})