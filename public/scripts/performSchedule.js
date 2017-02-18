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
          localStorage.removeItem('scheduledDataSet');
          localStorage.setItem('scheduledDataSet', JSON.stringify(response));
          displayGanttChart(response) //d3chart.js
        }
      }
    });
  });

  $("#CDSButton").click(function() {
    $.ajax({
      url: '/get_schedule/cds',
      type: 'GET',
      success: function(response) {
        console.log("CDS successful");
        var hiddenDiv = $("#hiddenDiv");
        hiddenDiv.slideToggle("fast");
        localStorage.removeItem('scheduledDataSet');
        localStorage.setItem('scheduledDataSet', JSON.stringify(response));
        displayGanttChart(response) //d3chart.js
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
