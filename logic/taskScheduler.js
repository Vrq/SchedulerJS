const path = require('path');
const fs = require('fs');

exports.JohnsonAlgorithm = function(fileName, res) {
  var isJohnsonApplicable = false;
  var filePath = path.join(__dirname, "..", "uploaded_files", fileName + ".json")
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    var file = JSON.parse(data);
    var minM1Time = Infinity;
    var maxM2Time = 0;
    var minM3Time= Infinity;
    for(task of file) {
      // if(task.field2 < minM1Time) {
      //   minM1Time = task.field2;
      // }
      // if(task.field3 <)
      console.log("task: " + task.field1);
    }
  })
  if(isJohnsonApplicable) {
    res.send(null);
  }
  else {
    res.send("Results");
  }
}
