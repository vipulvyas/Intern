console.log('Started............');

var express = require('express');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var https = require('https');
var cors = require('cors');

var mongoose = require('mongoose');
var app = express();
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./images');
mongoose.Promise = global.Promise;
//app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/computercompair',{useNewUrlParser:true},(err)=>{

  if(err) { console.log('Can not connect to the database'+ err);}
  else{
    console.log('=========== connection established to the database==========');
  }
});


mongoose.set('useCreateIndex',true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});

app.use(function(req,res,next){
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS,PATCH');
   res.header('ACCESS_Control-Allow-Headers','*');
  

   next();
 });

 


 app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html");
   //return res.end();
  });
  var db = mongoose.connection; 

  
   
  app.get('/add', function(req, res) {
   
    res.sendFile('add.html', {root: __dirname })
});
app.post('/addphoto', function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.image.path;
    var newpath = './images/' + files.image.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
     // res.write('File uploaded and moved!');
      //res.end();
    });
});
  res.sendFile('add.html', {root: __dirname })
});

 console.log("\ninside app.js file\n");
 
  
  var Computerschema = mongoose.Schema({
    image: String,
    RAM:Number, 
    CPU_speed:Number, 
    harddisk:Number, 
    storage_size:Number, 
    no_Of_USB_ports:Number, 
    price:Number,
    screen_size:Number,
    computer_name:String,
    image_path: String,
  }); 

 app.post('/adddetail',function (req, res) {

        console.log("request body");
        console.log(req.body);
        
      var Computer = mongoose.model('Computer', Computerschema, 'computer_data');
     
      var Computer1 = new Computer({ 
        image:req.body.image,
        RAM:req.body.RAM, 
        CPU_speed:req.body.CPU_speed, 
        harddisk:req.body.harddisk, 
        storage_size:req.body.storage_size, 
        no_Of_USB_ports:req.body.no_Of_USB_ports, 
        price:req.body.price,
        screen_size:req.body.screen_size,
        image_path: "./images/"+req.body.computer_name, });

        Computer1.save(function (err, Computer) {
          if (err) return console.error(err);
          console.log(" saved to collection.");
          res.sendFile('complete.html', {root: __dirname });
           
          //return res.end();
        }); 
      
   

 });



