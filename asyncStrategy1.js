function async(arg,callback){
	console.log("settimeout function call for",arg);
	setTimeout(function(){callback(arg*2)},1000);
}

function final(){
	console.log("funal function is called"+results);
}

var items=[1,2,3,4,5];
var results=[];

function test(item){
	console.log("item call=",item);
	if(item){
		async(item,function(result){
			results.push(result);
			return test(items.shift());
		});
	}
	else
	{
		return final();
	}

}

test(items.shift());