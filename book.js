var mongoose=require("mongoose");

var dbAddress="mongodb://127.0.0.1:27017/test";

mongoose.connect(dbAddress);
var db=mongoose.connection;

db.on("error",function(error,data){
	console.log("error occured during in database connect");
});

db.once("open",function(error,callback){
	console.log("database connection successfull");
});

var bookschema= mongoose.Schema({
	name:String,
	isbn:{type:String,index:true},
	author:String,
	pages:Number
})

var book=mongoose.model("book",bookschema,"book");

module.exports.findOne=function(isbn,callback){
	book.findOne({isbn:isbn},function(error,result){
		if(error)
			throw error;
		callback(result);
	});
}

module.exports.findAll=function(callback){
	book.find({},function(error,result){
		if(error)
			throw error;
		callback(result);
	});
}

module.exports.addNewBook=function(body,callback){

	var obj=new book({
		name:body.name,
		isbn:body.isbn,
		author:body.author,
		pages:body.pages
	});

	obj.save(function(error,result){
		if(error)
			throw error;
		
		callback({
			message:"book successfully add",
			book:result
		});
	})
}

module.exports.editBook=function(body,isbn,callback){
	book.findOne({isbn:isbn},function(error,result){
		if(error)
			throw error;
		if(!result){
			callback({
				message:"book with isbn"+isbn+" not found"
			});
		}
		result.name=body.name;
		result.isbn=body.isbn;
		result.author=body.author;
		result.pages=body.pages;

		result.save(function(error,result){
			if(error)
				throw error;
			callback({
				message:"successfully update result",
				result:result
			});
		})
	});
}

module.exports.deleteBook=function(isbn,callback){
	book.findOneAndRemove({isbn:isbn},function(error,result){
		if(error)
			throw error;
		callback({
			message:"Successfully delete the book",
			result:result
		});
	})
}