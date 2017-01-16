const express = require('express');
const multer = require('multer');

const app = express();
const uploadingConfig = multer({
  dest: './uploads',
  limits: {filesize: 10000000}
}).array('files')

app.use(express.static('public'));


//Routes:
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
 });
app.post('/upload', uploadingConfig, function(req, res) {
  console.log('Z serwera 3');
  console.log(req.files[0])
  res.status(200).send('OK');
});
// to do: parsowanie pliku ze ściezki na serwerze

app.listen(3000, function() {
   console.log("Listening, sir.");
});
