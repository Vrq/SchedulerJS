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
    for(var taskNumber in file) { //test case: are those time calculcated correctly
      task = file[taskNumber];
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
    if(isJohnsonApplicable) { //revert  this logical expression when its ready
      res.send(null);
    }
    else {
      var newTasksArray = [];
      for(var taskNumber in file) {
        task = file[taskNumber];
        newTasksArray.push({"Task": task.Task, "M1pTime": task.M1Time + task.M2Time, "M2pTime": task.M2Time + task.M3Time, "TaskNumber": taskNumber});
      }
      var m1TimeLowerArray = [];
      var m2TimeLowerOrEqualArray = [];
      for(task of newTasksArray) { //test case: are those arrays filled correctly
        if(task.M1pTime < task.M2pTime) {
          m1TimeLowerArray.push(task);
        } else {
          m2TimeLowerOrEqualArray.push(task);
        }
      }
      m1TimeLowerArray.sort( function(task1, task2) {
        return task1.M1pTime - task2.M1pTime;
      });
      m2TimeLowerOrEqualArray.sort( function(task1, task2) {
        return task2.M2pTime - task1.M2pTime;
      });
      res.setHeader('Content-Type', 'application/json');
      //w ktorym momencie mapujemy to na oryginalne taski? tutaj czy po stronie klienta?
      res.send(m1TimeLowerArray.concat(m2TimeLowerOrEqualArray));

    }
  })
}
