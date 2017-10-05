var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function(req, res){ 
var body = "";
	
req.on('data', function(chunk) 
{
	body += chunk;    
});
	
req.on('end', function()    
 {        
	console.log('POSTED: ' + body);
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('{"status": 200, "content": "' + body +'"}');
	res.end();
 });
	
});

server.listen(8000);
