var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

//connect to mongoose
mongoose.connect("mongodb://127.0.0.1/bookstore");
var db=mongoose.connection;
var coll;

db.on('error',function(error){
	console.log("error occured during mongodb connection",error);
});

db.once('open',function(){
	console.log("successfull connect mongodb database bookstore");
	coll=db.collection('books');
	app.listen(3000);
	console.log("my server is running",coll);
	
});


app.get('/', function(req, res) { 
	debugger;
  coll.find({}, function(err, docs) {

    docs.each(function(err, doc) {
    	console.log("hello");
    	if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});

app.get('/api/genres',function(req,res){
	res.send("Hello this api section");
});
