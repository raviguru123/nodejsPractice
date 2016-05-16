function async(arg,callback){
	console.log("function called for="+arg);
	setTimeout(function(){callback(arg*2)},1000);
};

var param=[1,2,3,4,5];
var final=[];

function finalFunction(){
	console.log("final array =",final);
}

function parallel(){

	param.forEach(function(item){
		async(item,function(arg){
			final.push(arg);
			if(final.length==param.length)
			{
				finalFunction();
			}
		});
	});

};
parallel();