const express = require('express');
const multer = require('multer');
const fileController = require('./logic/fileController');
const taskScheduler = require('./logic/taskScheduler');
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

var lastUploadedFileName = "exampleDataSet";

app.use(express.static('public'));

//REST:
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
 });

app.get('/example_dataset', function(req, res) {
  lastUploadedFileName = "exampleDataSet";
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, "sample", lastUploadedFileName + ".json"));
});

app.get('/get_schedule/johnson', function(req, res) {
  taskScheduler.JohnsonAlgorithm(lastUploadedFileName, res);
});

app.get('/get_schedule/cds', function(req, res) {
  taskScheduler.CDSAlgorithm(lastUploadedFileName, res);
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
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, "uploaded_files", lastUploadedFileName + ".json"));
  });
});

port = (process.env.PORT || '3000')
app.listen(port, function() {
   console.log("Listening, sir.");
});
