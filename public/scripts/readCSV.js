//Upload files to server
function handleFiles(files) {
  var formData = new FormData();
  var progressBar = document.getElementById("progress");
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
      localStorage.setItem('dataSet', JSON.stringify(response));
      console.log('upload successful!');
    }
  });
}
//Show uploaded files by downloading it again from the server:
$(document).ready(function() {
  $("#showDatasetButton").click(function() {
    $.ajax({
      url: '/uploaded_file',
      type: 'GET',
      success: function(response) {
        $("#hiddenDiv").slideToggle("fast");
        if($("#hiddenDiv").children().length == 0) {
          $("#hiddenDiv").append('<table id="uploadedFileTable"></table>');
          $("#uploadedFileTable").append("<tr><td>Task</td><td>Time on M1</td><td>Time on M2</td><td>Time on M3</td></tr>");
          for(var rowNumber in response) {
            row = response[rowNumber];
            $("#uploadedFileTable").append("<tr><td>"+row.Task+"</td><td>"+row.M1Time+"</td><td>"+row.M2Time+"</td><td>"+row.M3Time+"</td></tr>");
          }
        }
      }
    });
  });

  $("#chooseFileButton").click(function() {
    $("#csvFileInput").click();
  });
});
