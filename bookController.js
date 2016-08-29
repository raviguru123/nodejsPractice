var book=require("./book");

module.exports.getBookDetails=function(params,callback){
	console.log("find one book function call from controller");
	book.findOne(params.isbn,callback);
}

module.exports.getAllBooks=function(callback){
	console.log("get all book function call from controller");
	book.findAll(callback);
}

module.exports.addnewBook=function(body,callback){
	console.log("add new book function called from controller");
	book.addNewBook(body,callback);
}

module.exports.updateBookDetail=function(body,isbn,callback){
	console.log("update book function call from controller");
	book.editBook(body,isbn,callback);
}

module.exports.deleteBook=function(isbn,callback){
	console.log("delete function call from controller");
	book.deleteBook(isbn,callback);
}