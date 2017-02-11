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
    console.log(response)
    for(resRow of response) { //loop through sorted task set and display each task
      var row = dataSet[resRow.TaskNumber];
      $("#uploadedFileTable").append("<tr><td>"+row.Task+"</td><td>"+row.M1Time+"</td><td>"+row.M2Time+"</td><td>"+row.M3Time+"</td></tr>");
    }
  }
}
