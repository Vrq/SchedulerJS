const fs = require('fs');
const path = require('path');
const csvParser = require('csvtojson');

exports.parseAndSave = function(fileName, callback) {
  var filePath = path.join(__dirname, "..", "uploaded_files", fileName + ".csv")
  var fileJSON = [];
  csvParser({noheader:true, delimiter: [";",","]})
    .fromFile(filePath)
    .on('json', (jsonObj) => {
      fileJSON.push(jsonObj);
    })
    .on('done', (error) => {
      console.log('Parsing to json done');
      fs.writeFile(path.join(__dirname, "..", "uploaded_files", fileName + ".json"), JSON.stringify(fileJSON), callback);
    });
}
