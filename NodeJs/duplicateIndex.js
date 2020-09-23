const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const cors = require('cors');

var app = express();  

const api = require('../NodeJs/Database/Controllers/api');
// Middleware
app.use(bodyParser.json());
//app.unsubscribe(cors());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(cors({origin:"http://localhost:5000"}));

// Mongo URI
const mongoURI = 'mongodb://localhost:27017/fileUI';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
if(!conn){
    console.log("unable to connect to mongodb");
}
else{
    console.log("connected to mongodb");
}

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        console.log("file is:",file);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});
app.listen(3000, (err) => {
    if(err){
        console.log("error while starting server");
    }
    else{
        console.log("server started at 3000");
    }
});


const upload = multer({ storage });

app.get("/api",(req, res) => {
    console.log("inside get");
    res.send("i dont know why i am not working");
});

app.post("/api/products",upload.single('file'),(req, res) => {
    console.log("inside post of index");
    //const file = req.file();
    //console.log("file name is:",file.filename);
});