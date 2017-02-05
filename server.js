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
global.lastUploadedFileName = null;
app.use(express.static('public'));


//REST:
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
 });

 app.get('/uploaded_file', function(req, res) {
   console.log(lastUploadedFileName)
   if(lastUploadedFileName != null) {
     res.setHeader('Content-Type', 'application/json');
     console.log("nowy");
     res.sendFile(path.join(__dirname, "uploaded_files", "file.json"));
     //fileController.parseSendFile(lastUploadedFileName, res);
   } else {
     res.status(200).send(null);
   }
 });

app.post('/upload', uploadingConfig, function(req, res) {
  lastUploadedFileName = req.files[0].originalname;
  res.status(200).send("OK")
//nie ustawia się zmienna lastUploadedFileName przy poniższym kodzie - znalezc inne rozwiazanie na przechowywanie nazwy aktualnego datasetu

  // fileController.parseOnlyFile(req.files[0].originalname, function(err) {
  //   if(err) {
  //     res.status(400).send("File not saved");
  //     return;
  //   }
  // res.send("File saved on server as json");
  // });
});

port = (process.env.PORT || '3000')
app.listen(port, function() {
   console.log("Listening, sir.");
});
