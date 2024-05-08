const express = require('express');
const app = express();
const port = 8000;
const bodyparser = require('body-parser');

const db = require('./config/database');
const passportJWT = require('./config/passport-jwt');

app.use(express.json());
app.use(bodyparser.json());
app.use('/uploads', express.static(__dirname+'/uploads'));


app.use('/', require('./routes'))
app.listen(port, (err)=>{
    if(err){
        console.log("server is not listening the port")
    }
    console.log("server is listen the port successfully", port);
})