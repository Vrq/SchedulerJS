$(document).ready(function() {
  const JohnsonButton = $("#JohnsonButton");
  const CDSButton = $("#CDSButton");
  const NEHButton = $("#NEHButton");

  $("#JohnsonButton").click(function() {
    $.ajax({
      url: '/get_schedule/johnson',
      type: 'GET',
      success: function(response) {
        if(typeof response == "undefined" || response == "") {
          $("#JohnsonButton").hide().fadeIn(200).text("Cannot use for this dataset");
        } else {
          var algorithmNameDiv = d3.select("#algorithmName").select("p").text("Johnson algorithm");
          JohnsonButton.css('background-color', '#0d47a1');
          CDSButton.css('background-color', '#473939');
          NEHButton.css('background-color', '#473939');
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
        JohnsonButton.css('background-color', '#473939');
        CDSButton.css('background-color', '#0d47a1');
        NEHButton.css('background-color', '#473939');
        showScheduleFrom(response);
      }
    });
  });

  $("#NEHButton").click(function() {
    $.ajax({
      url: '/get_schedule/neh',
      type: 'GET',
      success: function(response) {
        var algorithmNameDiv = d3.select("#algorithmName").select("p").text("Nawaz-Enscor-Ham algorithm");
        JohnsonButton.css('background-color', '#473939');
        CDSButton.css('background-color', '#473939');
        NEHButton.css('background-color', '#0d47a1');
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
  var hiddenScheduleDiv = $("#hiddenScheduleDiv");
  hiddenScheduleDiv.fadeIn("fast");
  localStorage.removeItem('scheduledDataSet');
  localStorage.setItem('scheduledDataSet', JSON.stringify(dataSet));
  displayGanttChart(dataSet) //d3chart.js
}
