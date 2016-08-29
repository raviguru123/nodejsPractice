var express=require("express");
var mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fbdata");
var https=require("https");
var db=mongoose.connection;

db.on("error",function(error,data){
  console.log("error occured during connection established");
});

db.once("open",function(error,callback){
  console.log("success connection");
});

var schema=mongoose.Schema({
  name:String,
  id:String
});

var band=mongoose.model("band",schema);

// var data=new dj({
//   userid:1234563456
// });
var access_taken="EAARt75qbg9wBALGiZAvPO2FCZCl0ZBituxGQvaIWTFZAqZC336ruwZBsOZCxk0Km0AUhZBYYWJCYGrE6yhDvmVLMw0Dsf5cYIsAgothGa2YW0lm7rzuXThxrvEjQUcxOLsZAROi21vwP2DLehgMtmySZAQRfOrf6SZA10ZAo4ThUgt2LVQZDZD"

var baseUrl="https://graph.facebook.com";


function filterbandData(str){

  var array=str.data;
  for(var i=0;i<array.length;i++){
    if(array[i].name.toLowerCase().indexOf("banda")>=0)
      continue;
    var data=new band(array[i]);
    data.save(function(error,result){
      if(error){
        console.log("error occured during data save");
      }
    })
  }
  if(str.paging.next!=undefined){
   getData(str.paging.next);
 }
}
firehttpCall("a");

function firehttpCall(query){

  var array=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  //var array=["a"];
  for(var i=0;i<array.length;i++){
    var data=getData(baseUrl+"/search?q="+array[i]+"&type=page&access_token="+access_taken,dataReceive);
  }


}

function dataReceive(data){
   //console.log("data returned from",data);

   for(var i=0;i<data.data.length;i++){
    getData(baseUrl+"/"+data.data[i].id+"?fields=category&access_token="+access_taken,categorySave);
  }
//console.log("data paging next link=",data.paging.next);
if(data.paging.next!=undefined){
 getData(data.paging.next,dataReceive);
}
}



var categorySchema=mongoose.Schema({
  id:{type:String,unique:true},
  category:{type:String,unique:true},
});

var category=mongoose.model("category",categorySchema);
function categorySave(data){
  //console.log("category function=",data);
var categData=new category(data);
  categData.save(function(error,result){
    if(error){
      console.log("error occured during data save",error);
    }
  });
}


function getData(url,callback){
  //console.log("url=",url);
  https.get(url,function(response){
    var str="";
    response.on("data",function(chunk){
      str+=chunk;
    });
    response.on("end",function(){


     str=JSON.parse(str);
    // console.log("str.next=",str);
    //filterbandData(str);
    // var data=new dj(str.data[0]);
    // data.save(function(error,result){
    //   if(error){
    //     console.log("error occured during data save in dj table");
    //   }
    //   else{
    //     console.log("data has been saved");
    //   }
    // })
    // console.log("paging=",str.paging);
    // console.log("next link=",str.paging.next);
    callback(str);
  })
  });

}