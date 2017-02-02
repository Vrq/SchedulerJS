const express = require('express');
const multer = require('multer');
const fileController = require('./logic/fileController');
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
var lastUploadedFileName = null;
app.use(express.static('public'));


//REST:
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
 });

app.get('/uploaded_file', function(req, res) {
  if(lastUploadedFileName != null) {
    res.setHeader('Content-Type', 'application/json');
    fileController.parseFile(lastUploadedFileName, res);
  } else {
    res.status(200).send(null);
  }
});

app.post('/upload', uploadingConfig, function(req, res) {
  lastUploadedFileName = req.files[0].originalname;
  res.status(200).send('OK');
});

port = (process.env.PORT || '3000')
app.listen(port, function() {
   console.log("Listening, sir.");
});
