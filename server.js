const express = require('express');
const http = require('http');
const app = express();

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
 });
app.set('port', 8080);

var server = http.createServer(app);
server.listen(8080);
