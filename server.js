const express = require('express');
const multer = require('multer');
const fileController = require('./logic/fileController');
const path = require('path');
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

//send last uploaded file to client as json object
app.get('/uploaded_file', function(req, res) {
   if(lastUploadedFileName != null) {
     res.setHeader('Content-Type', 'application/json');
     res.sendFile(path.join(__dirname, "uploaded_files", lastUploadedFileName + ".json"));
   } else {
     res.status(404).send("File not found");
   }
});

//parse uploaded file to json and save on server
app.post('/upload', uploadingConfig, function(req, res) {
  lastUploadedFileName = req.files[0].originalname;
  lastUploadedFileName = lastUploadedFileName.substring(0, lastUploadedFileName.indexOf('.'));
  fileController.parseAndSave(lastUploadedFileName, function(err) {
    if(err) {
      res.status(404).send("File not saved");
      return;
    }
  res.send("File saved on server as json");
  });
});

port = (process.env.PORT || '3000')
app.listen(port, function() {
   console.log("Listening, sir.");
});
