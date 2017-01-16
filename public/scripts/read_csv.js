function handleFiles(files) {
  var formData = new FormData();
  formData.append('files', files[0], files[0].name)
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){console.log('upload successful!');}
      });
}
