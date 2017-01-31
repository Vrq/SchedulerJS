exports.crazyClown = function() {
  console.log("Why so serious?!")
}

exports.parseFile = function(fileName) {
  var uploadedFile = __dirname + '/uploaded_files/' + fileName
  console.log(uploadedFile);
}
