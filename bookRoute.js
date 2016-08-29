var bookController=require("./bookController");

module.exports=function(app){
	app.get("/book/:isbn",function(req,res){
		bookController.getBookDetails(req.params,function(result){
			res.json(result);
		})
	});


	app.get("/book",function(req,res){
		bookController.getAllBooks(function(result){
			res.json(result);
		})
	});

	app.post("/book",function(req,res){
		console.log("book data",req.body);
		bookController.addnewBook(req.body,function(result){
			res.json(result);
		})
	});

	app.put("/book/:isbn",function(req,res){
		bookController.updateBookDetail(req.body,req.params.isbn,function(result){
			res.json(result);
		})
	});

	app.delete("/book/:isbn",function(req,res){
		bookController.deleteBook(req.params.isbn,function(result){
			res.json(result);
		})
	})
}
