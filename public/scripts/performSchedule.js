$(document).ready(function() {
  $("#JohnsonButton").click(function() {
    $.ajax({
      url: '/get_schedule/johnson',
      type: 'GET',
      success: function(response) {
        if(typeof response == "undefined" || response == "") {
          $("#JohnsonButton").hide().fadeIn(200).text("Cannot use for this dataset");
        } else {
          console.log("We've got the answer")
          displayResult(response);
          console.log(localStorage.getItem('mojazmienna'));
        }
      }
    });
  });
});

function displayResult(response) {
  var dataSet = JSON.parse(localStorage.getItem('dataSet'));
  $("#hiddenDiv").slideToggle("fast");
  if($("#hiddenDiv").children().length == 0) {
    $("#hiddenDiv").append('<table id="uploadedFileTable"></table>');
    $("#uploadedFileTable").append("<tr><td>Task</td><td>Time on M1</td><td>Time on M2</td><td>Time on M3</td></tr>");
    var scheduledDataSet = [];
    for(resRow of response) { //loop through sorted task set and display each task
      var row = dataSet[resRow.TaskNumber];
      scheduledDataSet.push(row);
      $("#uploadedFileTable").append("<tr><td>"+row.Task+"</td><td>"+row.M1Time+"</td><td>"+row.M2Time+"</td><td>"+row.M3Time+"</td></tr>");
    }
    drawGanttChart(scheduledDataSet);
  }
}

function drawGanttChart(scheduledDataSet) {
  var M1FreeAt = 0
  var M2FreeAt = 0
  var M3FreeAt = 0;
  for(task of scheduledDataSet) {
    task.M1Start = M1FreeAt;
    task.M1Stop = task.M1Start + task.M1Time;
    M1FreeAt += task.M1Time;

    task.M2Start = M2FreeAt > task.M1Stop ? M2FreeAt : task.M1Stop;
    task.M2Stop = task.M2Start + task.M2Time;
    M2FreeAt += task.M2Time;

    task.M3Start = M3FreeAt > task.M2Stop ? M3FreeAt : task.M2Stop;
    task.M3Stop = task.M3Start + task.M3Time;
    M3FreeAt += task.M3Time;
  }
  console.log(scheduledDataSet);
  // console.log(scheduledDataSet);
}
