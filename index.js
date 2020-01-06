const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer(function(req,res){

let filePath = path.join(__dirname,'public',req.url === '/' ? 'index.html' : req.url);

// Extensions
let extname = path.extname(filePath);

let contentType = 'text/html';

switch(extname)
{
case '.js':
contentType = 'text/javascript';
break;

case '.css':
contentType = 'text/css';
break;

case '.json':
contentType = 'application/json';
break;

case '.jpg':
contentType = 'image/jpg';
break;

case '.png':
contentType = 'image/png';
break;
}


fs.readFile(filePath, function(err,content){

if(err)
{
if(err.code == 'ENOENT')
{
fs.readFile(path.join(__dirname,'public','404.html'),function(err,content){

  if(err){throw err;}
res.writeHead(200,{'Content-Type':'text/html'});

res.end(content,'utf8');
})
}

else
{
  res.writeHead(500);
  res.end(`Server Error: ${err.code}`);
}

}

// No error = success
else
{
  res.writeHead(200,{'Content-Type': contentType });

  res.end(content,'utf8');
}
});

});

const PORT = process.env.PORT || 5000;
server.listen(PORT,function(){
console.log(`server running on ${PORT}`);

});




// ====================================================================

// if(req.url === '/') // index
// {

// fs.readFile(path.join(__dirname,'public','index.html'),function(err,content){
// if(err) throw err;

// res.writeHead(200,{'Content-Type' : 'text/html'});

// res.end(content);
// // content = data

// });
// }

// if(req.url === '/about')
// {
// fs.readFile(path.join(__dirname,'public','about.html'),function(err,content){
// if(err) throw err;

// res.writeHead(200,{'Content-Type:' : 'text/html'});

// res.end(content);
// });
// }

// if(req.url === '/api/users')
// {
//   const users = [
//     {name : 'John Doe', age:56},
//     {name: 'Scofield', age:30}
//   ];

//   res.writeHead(200,{'Content-Type': 'application/json'});

//   res.end(JSON.stringify(users));
// }