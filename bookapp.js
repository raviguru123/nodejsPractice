var express=require("express"),
bodyParser=require("body-parser");


var app=express();

app.set('port',3300);

// app.configure(function(){
//   app.use(express.bodyParser());
//   app.use(app.router);
// });


app.use(bodyParser.urlencoded({
	extended: true
}));


// app.use(bodyParser.json());
// app.use(require('connect').bodyParser());
var routes=require("./bookRoute");
routes(app);

app.listen(app.get('port'),function(){
	console.log("server listen on the port",app.get('port'));
});