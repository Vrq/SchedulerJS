const path = require('path');
const fs = require('fs');
const _ = require('lodash'); //using cloneDeep in order to assign values not references

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
      task = _.cloneDeep(file[taskNumber]);
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
    var isJohnsonApplicable = (minM1Time >= maxM2Time || minM3Time >= maxM2Time); //rule for using Johnsons algorithm for 3 machines
    if(!isJohnsonApplicable) {
      res.send(null);
    }
    else { //create helper tasks (2-machine problem)
      var newTasksArray = [];
      for(var taskNumber in file) {
        task = _.cloneDeep(file[taskNumber]);
        newTasksArray.push({"Task": task.Task, "M1pTime": task.M1Time + task.M2Time, "M2pTime": task.M2Time + task.M3Time, "TaskNumber": taskNumber});
      }
      var taskSchedule = getCalculatedTimeSchedule(file, Johnson2Machines(newTasksArray))
      res.setHeader('Content-Type', 'application/json');
      res.send(taskSchedule);
    }
  })
}

exports.CDSAlgorithm = function(fileName, res) {
  var filePath = path.join(__dirname, "..", "uploaded_files", fileName + ".json")
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    var file = JSON.parse(data);
    var firstTasksArray = [];
    //1 - create helper problems, for 3 machines that will be 2 problems(m-1)
    for(var taskNumber in file) {
      task = _.cloneDeep(file[taskNumber]);
      firstTasksArray.push({"Task": task.Task, "M1pTime": task.M1Time, "M2pTime": task.M3Time, "TaskNumber": taskNumber});
    }
    var secondTasksArray = [];
    for(var taskNumber in file) {
      task = _.cloneDeep(file[taskNumber]);
      secondTasksArray.push({"Task": task.Task, "M1pTime": task.M1Time + task.M2Time, "M2pTime": task.M2Time + task.M3Time, "TaskNumber": taskNumber});
    }
    var firstTaskSchedule = getCalculatedTimeSchedule(file, Johnson2Machines(firstTasksArray))
    var secondTaskSchedule = getCalculatedTimeSchedule(file, Johnson2Machines(secondTasksArray))
    var firstScheduleEndTime = firstTaskSchedule[firstTaskSchedule.length-1].M3Stop;
    var secondScheduleEndTime = secondTaskSchedule[secondTaskSchedule.length-1].M3Stop;
    var bestSchedule = firstScheduleEndTime < secondScheduleEndTime ? firstTaskSchedule : secondTaskSchedule;
    res.setHeader('Content-Type', 'application/json');
    res.send(bestSchedule);
  });
}

exports.NEHAlgorithm = function(fileName, res) {
  var filePath = path.join(__dirname, "..", "uploaded_files", fileName + ".json")
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    var file = JSON.parse(data);
    var taskArray = [];
    for(var taskNumber in file) {
      task = _.cloneDeep(file[taskNumber]);
      task.TaskNumber = taskNumber;
      taskArray.push(task);
    }
    //1 - for each task calculate total execution time
    for(var task of taskArray) {
      task.TotalExecutionTime = task.M1Time + task.M2Time + task.M3Time;
    }
    //2 - sort task list by the longest TET
    taskArray.sort( function(task1, task2) {
      return task2.TotalExecutionTime - task1.TotalExecutionTime;
    });
    //3 - start with 1st task, take next one and place it in the place where the sequence will be optimum
    var checkerArray = [];
    for(var taskNumber in taskArray) {
      var calculatedSchedulesArray = [];
      for(var index = 0; index<=taskNumber; index++) {
        checkerArray.splice(index, 0, taskArray[taskNumber]);
        testedScheduleArray = getCalculatedTimeSchedule(file, checkerArray);
        calculatedSchedulesArray.push(testedScheduleArray[testedScheduleArray.length-1].M3Stop);//Cmax
        checkerArray.splice(index, 1);
      }
    var bestIndex = calculatedSchedulesArray.indexOf(Math.min.apply(null,calculatedSchedulesArray));
    checkerArray.splice(bestIndex, 0, taskArray[taskNumber]);
    }
    //4 - after placing all tasks return the sequence
    var taskSchedule = getCalculatedTimeSchedule(file, checkerArray);
    res.setHeader('Content-Type', 'application/json');
    res.send(taskSchedule);
  });
}

function Johnson2Machines(taskArray) {
  var m1TimeLowerArray = [];
  var m2TimeLowerOrEqualArray = [];
  //1 - divide tasks into 2 sets: 1st - m1 time lover than m2, 2nd - the rest
  for(var task of taskArray) { //test case: are those arrays filled correctly
    if(task.M1pTime < task.M2pTime) {
      m1TimeLowerArray.push(_.cloneDeep(task));
    } else {
      m2TimeLowerOrEqualArray.push(_.cloneDeep(task));
    }
  }
  //2 - sort first set by ascending m1 time, sort second by descending m2 time
  m1TimeLowerArray.sort( function(task1, task2) {
    return task1.M1pTime - task2.M1pTime;
  });
  m2TimeLowerOrEqualArray.sort( function(task1, task2) {
    return task2.M2pTime - task1.M2pTime;
  });
  //3 - concat 1st set + 2nd set
  return m1TimeLowerArray.concat(m2TimeLowerOrEqualArray);
}

function getCalculatedTimeSchedule(taskGroupObject, scheduledTaskArray) {
  var scheduledDataSet = [];
  for(var schedRow of scheduledTaskArray) { //loop through sorted task array
    var row = _.cloneDeep(taskGroupObject[schedRow.TaskNumber]);
    scheduledDataSet.push(row);
  }
  var M1FreeAt = 0
  var M2FreeAt = 0
  var M3FreeAt = 0;
  for(var task of scheduledDataSet) {
    task.M1Start = M1FreeAt;
    task.M1Stop = task.M1Start + task.M1Time;
    M1FreeAt = task.M1Stop;

    task.M2Start = M2FreeAt > task.M1Stop ? M2FreeAt : task.M1Stop;
    task.M2Stop = task.M2Start + task.M2Time;
    M2FreeAt = task.M2Stop;

    task.M3Start = M3FreeAt > task.M2Stop ? M3FreeAt : task.M2Stop;
    task.M3Stop = task.M3Start + task.M3Time;
    M3FreeAt = task.M3Stop;
  }
  return scheduledDataSet;
}
