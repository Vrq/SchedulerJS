const express = require('express');
const http = require('http');
const app = express();

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
 });
port = (process.env.PORT || '3000')
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
