//Upload files to server
function handleFiles(files) {
  var formData = new FormData();
  var progressBar = document.getElementById("progress");
  progressBar.value = 0;
  formData.append('files', files[0], files[0].name);
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    xhr: function() { //custom XMLHttpRequest for progress bar
      var myXhr = new window.XMLHttpRequest();
      myXhr.upload.onprogress = function(e) {
        if(e.lengthComputable) {
          progressBar.max = e.total;
          progressBar.value = e.loaded;
        }
      }
      return myXhr;
    },
    success: function(response) {
      localStorage.removeItem('dataSet');
      localStorage.setItem('dataSet', JSON.stringify(response));
      $("#exampleDataSetButton").css('background-color', '#534343');
      $("#exampleDataSetButton").text("Use example dataset");
      var hiddenDiv = $("#hiddenDiv");
      hiddenDiv.fadeOut("fast");
      console.log('upload successful!');
    }
  });
}

$(document).ready(function() {

  $("#showDatasetButton").click(function() {
    var response = JSON.parse(localStorage.getItem('dataSet'));
    var hiddenDiv = $("#hiddenDiv");
    hiddenDiv.slideToggle("fast");
    hiddenDiv.empty();
    if(hiddenDiv.children().length == 0) {
      hiddenDiv.append('<table id="uploadedFileTable" class="dataSetTable"></table>');
      $("#uploadedFileTable").append("<tbody><tr><td>Task</td><td>Time on M1</td><td>Time on M2</td><td>Time on M3</td></tr></tbody>");
      for(var rowNumber in response) {
        row = response[rowNumber];
        $("#uploadedFileTable").append("<tr><td>"+row.Task+"</td><td>"+row.M1Time+"</td><td>"+row.M2Time+"</td><td>"+row.M3Time+"</td></tr>");
      }
    }
  });

  $("#chooseFileButton").click(function() {
    $("#csvFileInput").click();
  });

  $("#exampleDataSetButton").click(function() {
    $.ajax({
      url: '/example_dataset',
      type: 'GET',
      success: function(response) {
        localStorage.setItem('dataSet', JSON.stringify(response));
        document.getElementById("progress").value = 0;
        $("#exampleDataSetButton").css('background-color', '#2a9d8f');
        $("#exampleDataSetButton").hide().fadeIn(200).text("Example data loaded");
        var hiddenDiv = $("#hiddenDiv");
        hiddenDiv.fadeOut("fast");
        console.log('example dataset loaded');

      }
    });
  });

});
