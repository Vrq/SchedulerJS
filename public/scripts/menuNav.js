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
    importDataDiv.slideDown(300);
    getScheduleDiv.hide();
    shareFeedbackDiv.hide();
//    importDataDiv.empty();
  });

  menuScheduleButton.click(function() {
    menuImportButton.css('background-color', '#473939');
    menuScheduleButton.css('background-color', '#0d47a1');
    menuFeedbackButton.css('background-color', '#473939');
    importDataDiv.hide();
    getScheduleDiv.slideDown(300);
    shareFeedbackDiv.hide();
//    importDataDiv.empty();
  });

  menuFeedbackButton.click(function() {
    menuImportButton.css('background-color', '#473939');
    menuScheduleButton.css('background-color', '#473939');
    menuFeedbackButton.css('background-color', '#0d47a1');
    importDataDiv.hide();
    getScheduleDiv.hide();
    shareFeedbackDiv.slideDown(300);
//    importDataDiv.empty();
  });

});
