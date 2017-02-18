$(document).ready(function() {
  $("#JohnsonButton").click(function() {
    $.ajax({
      url: '/get_schedule/johnson',
      type: 'GET',
      success: function(response) {
        if(typeof response == "undefined" || response == "") {
          $("#JohnsonButton").hide().fadeIn(200).text("Cannot use for this dataset");
        } else {
          var algorithmNameDiv = d3.select("#algorithmName").select("p").text("Johnson algorithm");
          showScheduleFrom(response);
        }
      }
    });
  });

  $("#CDSButton").click(function() {
    $.ajax({
      url: '/get_schedule/cds',
      type: 'GET',
      success: function(response) {
        var algorithmNameDiv = d3.select("#algorithmName").select("p").text("Campbell-Dudek-Smith algorithm");
        showScheduleFrom(response);
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

function showScheduleFrom(dataSet) {
  console.log("Algorithm run successful");
  var hiddenDiv = $("#hiddenDiv");
  hiddenDiv.fadeIn("fast");
  localStorage.removeItem('scheduledDataSet');
  localStorage.setItem('scheduledDataSet', JSON.stringify(dataSet));
  displayGanttChart(dataSet) //d3chart.js
}
