/*var http=require('http');
var server=http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello, World');
});
server.listen(3291);
console.log("server running..........3291");*/

/*var express=require('express'),cons=require('consolidate'),mongodb=require('mongodb');*/
var mongoClient=require('mongodb').MongoClient,
	assert=require('assert'),
	express= require('express');
	app=express(),
	engines=require('consolidate'),
	bodyParser=require('body-parser');
app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname,'/views');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//app.use(app.router);
app.get('/',function(req,res){		
		res.render('index',{'name':'Vamshi Kampalli'});
});
app.post('/movieList',function(req,res,next){
	mongoClient.connect('mongodb://Sri:password@ds059284.mongolab.com:59284/srinivasdb',function(err,db){/*mongodb://localhost:27017/myFavorites*/
		assert.equal(null,err);
		console.log('connected to DB');
		db.collection('kharchapani').insert({'name':req.body.name,'amount':parseFloat(req.body.amount),'comments':req.body.comments},function(err,result){
			assert.equal(null,err);
			console.log(result);
			db.collection('kharchapani').find({}).toArray(function(err,docs){
				//console.log('Docs '+JSON.stringify(docs));
				res.render('firstHtmlPage',{'listOfExp':docs,'name':'Vamshi Kampalli'});
				db.close();
			});			
		});
	})
});
app.use(function(req,res){
	res.sendStatus(404);
});
var server=app.listen(8000,function(){
		var port=server.address().port;
		console.log('Express listening port'+port);
});
/*mongoClient.connect('mongodb://localhost:27017/video',function(err,db){
	assert.equal(null,err);
	console.log('sucessfully connected to DB');
	app.get('/',function(req,res){
		db.collection('movies').find({}).toArray(function(err,docs){
		res.render('firstHtmlPage',{'movies':docs,'name':'Vamshi Kampalli'});
		});
	});
	app.use(function(req,res){
	res.sendStatus(404);
	});

	var server=app.listen(3291,function(){
		var port=server.address().port;
		console.log('Express listening port'+port);
	});

});*/



