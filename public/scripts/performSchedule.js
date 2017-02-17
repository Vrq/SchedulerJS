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
          var hiddenDiv = $("#hiddenDiv");
          hiddenDiv.slideToggle("fast");
          drawGanttChart(response);
        }
      }
    });
  });

  $("#exportScheduleButton").click(function() {
    var dataSet = JSON.parse(localStorage.getItem('scheduledDataSet'));
    var dataSetJSON = Object.values(dataSet)
    var csv = Papa.unparse(dataSetJSON);
    var a = document.createElement('a');
    a.href = 'data:attachment/csv,' + encodeURIComponent(csv);
    a.target = '_blank';
    a.download = 'schedule.csv';
    document.body.appendChild(a);
    a.click();
  })
});

function drawGanttChart(response) {
  var dataSet = JSON.parse(localStorage.getItem('dataSet'));
  var scheduledDataSet = [];
  for(resRow of response) { //loop through sorted task set and display each task
    var row = dataSet[resRow.TaskNumber];
    scheduledDataSet.push(row);
  }
  var M1FreeAt = 0
  var M2FreeAt = 0
  var M3FreeAt = 0;
  for(task of scheduledDataSet) {
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
  localStorage.removeItem('scheduledDataSet');
  localStorage.setItem('scheduledDataSet', JSON.stringify(scheduledDataSet));
  displayGanttChart(scheduledDataSet) //d3chart.js
}
