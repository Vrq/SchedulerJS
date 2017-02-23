$(document).ready(function() {
  const importDataDiv = $("#importDataDiv");
  const getScheduleDiv = $("#getScheduleDiv");
  const shareFeedbackDiv = $("#shareFeedbackDiv");

  $("#menuImportButton").click(function() {
    importDataDiv.show("fast");
    getScheduleDiv.hide("fast");
    shareFeedbackDiv.hide("fast");
//    importDataDiv.empty();
  });

  $("#menuScheduleButton").click(function() {
    importDataDiv.hide("fast");
    getScheduleDiv.show("fast");
    shareFeedbackDiv.hide("fast");
//    importDataDiv.empty();
  });

  $("#menuFeedbackButton").click(function() {
    importDataDiv.hide("fast");
    getScheduleDiv.hide("fast");
    shareFeedbackDiv.show("fast");
//    importDataDiv.empty();
  });

});
