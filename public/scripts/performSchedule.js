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
        }
      }
    });
  });

  $("#chooseFileButton").click(function() {
    $("#csvFileInput").click();
  });
});
