const path = require('path');
const fs = require('fs');

exports.JohnsonAlgorithm = function(fileName, res) {
  var filePath = path.join(__dirname, "..", "uploaded_files", fileName + ".json")
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    var file = JSON.parse(data);
    var minM1Time = Infinity;
    var maxM2Time = 0;
    var minM3Time= Infinity;
    for(task of file) { //test case: are those time calculcated correctly
      if(task.M1Time < minM1Time) {
        minM1Time = task.M1Time;
      }
      if(task.M3Time < minM3Time) {
        minM3Time = task.M3Time;
      }
      if(task.M2Time > maxM2Time) {
        maxM2Time = task.M2Time;
      }
    }
    var isJohnsonApplicable = (minM1Time >= maxM2Time && minM3Time >= maxM2Time);
    if(isJohnsonApplicable) {
      res.send("Results");
    }
    else {
      res.send(null);
    }
  })
}
