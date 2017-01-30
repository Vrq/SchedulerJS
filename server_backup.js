const express = require('express');
const multer = require('multer');

const app = express();

//file upload config
const storage = multer.diskStorage({
    destination: './uploaded_files',
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
})
const uploadingConfig = multer({
  storage: storage,
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

app.listen(8080, function() {
   console.log("Listening, sir.");
});
