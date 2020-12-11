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

// this is for add image folder where ejs choose files
app.use(express.static('images'));
// View engine setup 
app.set('view engine', 'ejs'); 


mongoose.set('useCreateIndex',true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
const port = process.env.PORT || 3000;

//listen
const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});

app.use(function(req,res,next){
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS,PATCH');
   res.header('ACCESS_Control-Allow-Headers','*');
  

   next();
 });

 

 //Home

 app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html");
   //return res.end();
  });
  var db = mongoose.connection; 

  

  //add
   
  app.get('/add', function(req, res) {
   
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
    //computer_name: String,
  }); 

  var Computer = mongoose.model('Computer', Computerschema, 'computer_data');

  //add detail 
 app.post('/adddetail',function (req, res) {

        console.log("request body");
        
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          console.log(fields);
          console.log(files);
          var Computer = mongoose.model('Computer', Computerschema, 'computer_data');
     
      var Computer1 = new Computer({ 
        image:files.image.name,
        RAM:fields.RAM, 
        CPU_speed:fields.CPU_speed, 
        harddisk:fields.harddisk, 
        storage_size:fields.storage_size, 
        no_Of_USB_ports:fields.no_Of_USB_ports, 
        price:fields.price,
        screen_size:fields.screen_size,
        computer_name: fields.computer_name, });

        Computer1.save(function (err, Computer) {
          if (err) return console.error(err);
          console.log(" saved to collection.");
          res.sendFile('complete.html', {root: __dirname });
           
          //return res.end();
        }); 
          var oldpath = files.image.path;
          var newpath = './images/' + files.image.name;
          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
           
          });
          
      }); 
    });
    
      // compaire
        app.get("/compaire", (req, res) => {
          console.log('in compair route')

            
               var computerData=Computer.find({});
               computerData.exec(function(err, data){
                console.log(data);
                   if(err) throw err;
                   res.render('compaire',{comdata: data});
               })
         });
         