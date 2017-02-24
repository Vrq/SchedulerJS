$(document).ready(function() {
  const importDataDiv = $("#importDataDiv");
  const getScheduleDiv = $("#getScheduleDiv");
  const shareFeedbackDiv = $("#shareFeedbackDiv");
  const menuImportButton = $("#menuImportButton");
  const menuScheduleButton = $("#menuScheduleButton");
  const menuFeedbackButton = $("#menuFeedbackButton");

  menuImportButton.click(function() {
    menuImportButton.css('background-color', '#0d47a1');
    menuScheduleButton.css('background-color', '#473939');
    menuFeedbackButton.css('background-color', '#473939');
    importDataDiv.show("fast");
    getScheduleDiv.hide("fast");
    shareFeedbackDiv.hide("fast");
//    importDataDiv.empty();
  });

  menuScheduleButton.click(function() {
    menuImportButton.css('background-color', '#473939');
    menuScheduleButton.css('background-color', '#0d47a1');
    menuFeedbackButton.css('background-color', '#473939');
    importDataDiv.hide("fast");
    getScheduleDiv.show("fast");
    shareFeedbackDiv.hide("fast");
//    importDataDiv.empty();
  });

  menuFeedbackButton.click(function() {
    menuImportButton.css('background-color', '#473939');
    menuScheduleButton.css('background-color', '#473939');
    menuFeedbackButton.css('background-color', '#0d47a1');
    importDataDiv.hide("fast");
    getScheduleDiv.hide("fast");
    shareFeedbackDiv.show("fast");
//    importDataDiv.empty();
  });

});
