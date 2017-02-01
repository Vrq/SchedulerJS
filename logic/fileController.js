const fs = require('fs');
const path = require('path');
const csvParser = require('csvtojson');

exports.crazyClown = function() {
  console.log("Why so serious?!")
}

exports.parseFile = function(fileName) {
  var filePath = path.join(__dirname, "..", "uploaded_files", fileName)
  csvParser({noheader:true, delimiter: [";",","]})
    .fromFile(filePath)
    .on('json', (jsonObj) => {
      console.log(jsonObj);
    })
    .on('done', (error) => {
      console.log('Parsing to json done');
    });
}
