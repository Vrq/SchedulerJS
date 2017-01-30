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
    success: function(data) {console.log('upload successful!');}
  });
}
//Show uploaded files by downloading it again from the server:
$(document).ready(function() {
  $("#showDataButton").click(function() {
    $("#hiddenDiv").slideToggle("fast");
    $.ajax({
      url: '/uploaded_file',
      type: 'GET',
      success: function(response) {
        //dodac wypisywanie danych w tabeli
        console.log(response)
      }
    });
  });
});
