const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { mongoose } = require("./db.js");
const api = require('./Database/Controllers/api');
//const user = require('./Database/Controllers/UserController');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:4200"}));

app.listen(4000, (err) => {
    if(err){
        console.log("error while starting server");
    }
    else{
        console.log("server started at 3000");
    }
});
app.use("/api", api);
//app.use("/register", user);