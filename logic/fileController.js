const fs = require('fs');
const path = require('path');
const csvParser = require('csvtojson');

exports.crazyClown = function() {
  console.log("Why so serious?!")
}

exports.parseSendFile = function(fileName, res) {
  var filePath = path.join(__dirname, "..", "uploaded_files", fileName)
  var fileJSON = [];
  csvParser({noheader:true, delimiter: [";",","]})
    .fromFile(filePath)
    .on('json', (jsonObj) => {
      fileJSON.push(jsonObj);
    })
    .on('done', (error) => {
      console.log('Parsing to json done');
      res.send(fileJSON);
    });
}
