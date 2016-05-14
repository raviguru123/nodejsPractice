var http=require("http"),
url=require("url"),
fs=require("fs");

var messages=["testing"];
var client=[];
http.createServer(function(req,res){

	var urlParts=url.parse(req.url);
	console.log(urlParts.pathname);
	if(urlParts.pathname=='/')
	{
		fs.readFile("./index.html",function(err,data){
			res.end(data);
		});
	}
	else if(urlParts.pathname.substr(0,5)=="/poll")
	{
		var count = urlParts.pathname.replace(/[^0-9]*/, '');
		console.log(count);
		if(messages.length>count)
		{
			res.end(JSON.stringify({
				count:count+1,
				message:messages.slice(count).join("\n")
			}));

		}
		else
		{
			client.push(res);
		}

	}
	else if(urlParts.pathname.substr(0,5)=="/msg/")
	{

		var msg=unescape(urlParts.pathname.substr(5));
		messages.push(msg);
		while(client.length>0)
		{
			var clnt=client.pop();
			clnt.end(JSON.stringify({
				count:messages.length,
				message:msg
			}));
		}
	}
	

}).listen(8081);
   console.log("now server is running in port 8081");