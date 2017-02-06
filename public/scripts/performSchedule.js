$(document).ready(function() {
  $("#JohnsonButton").click(function() {
    $.ajax({
      url: '/get_schedule/johnson',
      type: 'GET',
      success: function(response) {
        console.log(response)
      }
    });
  });

  $("#chooseFileButton").click(function() {
    $("#csvFileInput").click();
  });
});
